import express from "express";
import {
  getLessonById,
  getLessons,
  getQuizAnswersByLessonId,
} from "#db/queries/lessons";
import {
  getProgressByUserId,
  saveLessonProgress,
} from "#db/queries/progress";
import requireUser from "#middleware/requireUser";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const lessons = await getLessons();
    res.send(lessons);
  } catch (error) {
    next(error);
  }
});

router.get("/progress", requireUser, async (req, res, next) => {
  try {
    const progress = await getProgressByUserId(req.user.id);
    res.send(progress);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const lesson = await getLessonById(req.params.id);

    if (!lesson) {
      return res.status(404).send("Lesson not found.");
    }

    res.send(lesson);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/quiz", requireUser, async (req, res, next) => {
  try {
    const lesson = await getLessonById(req.params.id);

    if (!lesson) {
      return res.status(404).send("Lesson not found.");
    }

    const { answers } = req.body ?? {};
    const correctAnswers = await getQuizAnswersByLessonId(lesson.id);

    if (!Array.isArray(answers) || answers.length !== correctAnswers.length) {
      return res.status(400).send("Submit one answer for each question.");
    }

    const validQuestionIds = new Set(
      correctAnswers.map((question) => question.id),
    );
    const submittedAnswers = new Map();

    for (const answer of answers) {
      if (
        !answer ||
        !validQuestionIds.has(answer.questionId) ||
        !["A", "B", "C"].includes(answer.selectedOption) ||
        submittedAnswers.has(answer.questionId)
      ) {
        return res.status(400).send("Answers are invalid.");
      }

      submittedAnswers.set(answer.questionId, answer.selectedOption);
    }

    const results = correctAnswers.map((question) => ({
      questionId: question.id,
      correct: submittedAnswers.get(question.id) === question.correct_option,
      correctOption: question.correct_option,
      explanation: question.explanation,
    }));

    const score = results.filter((result) => result.correct).length;
    const completed = score === correctAnswers.length;

    await saveLessonProgress({
      userId: req.user.id,
      lessonId: lesson.id,
      completed,
    });

    res.send({
      score,
      total: correctAnswers.length,
      completed,
      results,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
