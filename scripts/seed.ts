import { accounts, categories, transactions } from "@/app/db/schema";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env.local" });

const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);

const SEED_USER_ID = "vv9gfzouzvt3pr2f664wbwsj";

const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidId: null },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID, plaidId: null },
  { id: "category_3", name: "Utilites", userId: SEED_USER_ID, plaidId: null },
  { id: "category_7", name: "Clothing", userId: SEED_USER_ID, plaidId: null },
];

const SEED_ACCOUNTS = [
  { id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidId: null },
  { id: "account_2", name: "Saving", userId: SEED_USER_ID, plaidId: null },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 30);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Rent":
      return Math.random() * 400 + 90;
    case "Food":
      return Math.random() * 30 + 10;
    case "Utilites":
      return Math.random() * 200 + 50;
    case "Clothing":
      return Math.random() * 50 + 15;

    default:
      return Math.random() * 50 + 10;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];

    const isExpense = Math.random() > 0.6;

    const amount = generateRandomAmount(category);

    let formattedAmount = amount;

    if (isExpense) {
      formattedAmount = -amount;
    }

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: Math.round(formattedAmount * 1000),
      payee: `Merchant`,
      notes: `Random transaction`,
      userId: SEED_USER_ID,
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.log("Err seed", error);
    process.exit(1);
  }
};

main();
