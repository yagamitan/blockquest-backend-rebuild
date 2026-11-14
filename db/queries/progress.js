import db from "#db/client";

export async function saveLessonProgress({ userId, lessonId, completed }) {
  const sql = `
    INSERT INTO user_progress (user_id, lesson_id, completed)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, lesson_id)
    DO UPDATE SET
      completed = EXCLUDED.completed,
      updated_at = NOW()
    RETURNING *;
  `;

  const {
    rows: [progress],
  } = await db.query(sql, [userId, lessonId, completed]);

  return progress;
}

export async function getProgressByUserId(userId) {
  const sql = `
    SELECT lesson_id, completed, updated_at
    FROM user_progress
    WHERE user_id = $1
    ORDER BY lesson_id;
  `;

  const { rows: progress } = await db.query(sql, [userId]);
  return progress;
}