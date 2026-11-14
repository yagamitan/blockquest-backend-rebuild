import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const {
    rows: [lesson],
  } = await db.query(
    `
    INSERT INTO lessons (category, title, summary, content, lesson_order)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
    `,
    [
      "Getting Started",
      "What Is Cryptocurrency?",
      "Learn what crypto is and how it differs from regular money.",
      `## Step 1: Money we use every day
Most money you use is managed through organizations such as banks and payment companies. When you send money, those organizations update their records and help both sides agree on the result.

## Step 2: A digital asset on a network
Cryptocurrency is a kind of digital asset that can be transferred on a computer network. Bitcoin is one example. Instead of relying on one bank to keep the only record, a crypto network follows shared rules to record and check transfers.

## Step 3: Crypto and blockchain are related, but different
A cryptocurrency is an asset. A blockchain is one kind of shared record system that some crypto networks use. The two words are connected, but they do not mean the same thing. Some blockchains also run programs, while others focus mainly on transferring value.

## Step 4: A simple example
Imagine Maya wants to send a digital asset to Leo. The network needs a way to check that the asset has not already been spent and that the transfer follows its rules. The network records an accepted transfer so participants can refer to the same history.

**Pause and think:** If a cryptocurrency is an asset, what job does a blockchain do?

**Key idea:** Crypto describes digital assets and networks; blockchain describes a way some networks keep a shared record.

Further reading: [Binance Academy: What is cryptocurrency?](https://academy.binance.com/en/articles/what-is-a-cryptocurrency) and [Bitcoin.org: How does Bitcoin work?](https://bitcoin.org/en/how-it-works).`,
      1,
    ],
  );

  console.log("Created lesson:", lesson.id);

  await db.query(
    `
    INSERT INTO quiz_questions (
      lesson_id, prompt, option_a, option_b, option_c,
      correct_option, explanation, question_order
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      lesson.id,
      "Which statement best describes cryptocurrency?",
      "A digital asset that can be transferred on a network",
      "A bank account stored on one person's phone",
      "A type of computer cable",
      "A",
      "Cryptocurrency is a digital asset used on a network that follows shared rules.",
      1,
    ],
  );

  await db.query(
    `
    INSERT INTO quiz_questions (
      lesson_id, prompt, option_a, option_b, option_c,
      correct_option, explanation, question_order
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      lesson.id,
      "What is a blockchain?",
      "Another word for every cryptocurrency",
      "A shared record system used by some networks",
      "A company that approves every payment",
      "B",
      "A blockchain is a way to keep a shared record; it is related to crypto but is not the same thing as a cryptocurrency.",
      2,
    ],
  );

  await db.query(
    `
    INSERT INTO quiz_questions (
      lesson_id, prompt, option_a, option_b, option_c,
      correct_option, explanation, question_order
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      lesson.id,
      "What is one difference from a typical bank transfer?",
      "Crypto networks use shared rules and records instead of one bank keeping the only record",
      "Crypto transfers never need checking",
      "Every cryptocurrency is run by a bank",
      "A",
      "Many crypto networks use a shared record checked according to network rules rather than relying on one bank's ledger.",
      3,
    ],
  );

  await db.query(
    `
    INSERT INTO quiz_questions (
      lesson_id, prompt, option_a, option_b, option_c,
      correct_option, explanation, question_order
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
    [
      lesson.id,
      "Do all blockchain networks have exactly the same purpose?",
      "Yes, every network does the same thing",
      "No, networks can be designed for different uses",
      "Yes, they are all operated by one company",
      "B",
      "Different networks have different designs and uses; later lessons will compare some of them.",
      4,
    ],
  );
}
