import db from "#db/client";

export async function getLessons() {
  const sql = `
    SELECT id, category, title, summary, lesson_order
    FROM lessons
    ORDER BY lesson_order;
    `;

  const { rows: lessons } = await db.query(sql);
  return lessons;
}

export async function getLessonById(id) {
  const lessonSql = `
    SELECT id, category, title, summary, content, lesson_order
    FROM lessons
    WHERE id = $1;
  `;
  const {
    rows: [lesson],
  } = await db.query(lessonSql, [id]);

  if (!lesson) {
    return undefined;
  }
  const questionSql = `
    SELECT id, prompt, option_a, option_b, option_c, question_order
    FROM quiz_questions
    WHERE lesson_id = $1
    ORDER BY question_order;
  `;

  const { rows: questions } = await db.query(questionSql, [id]);

  return { ...lesson, questions };
}

export async function getQuizAnswersByLessonId(lessonId) {
  const sql = `
    SELECT id, correct_option, explanation
    FROM quiz_questions
    WHERE lesson_id = $1
    ORDER BY question_order;
    `;

  const { rows: answers } = await db.query(sql, [lessonId]);
  return answers;
}
