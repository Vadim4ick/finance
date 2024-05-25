import { relations } from "drizzle-orm";
import { text, pgTable, integer, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(accounts),
  categories: many(categories),
}));

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
});

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(user, {
    fields: [accounts.userId],
    references: [user.id],
  }),
}));

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
});

export const categoriesRelations = relations(categories, ({ one }) => ({
  user: one(user, {
    fields: [categories.userId],
    references: [user.id],
  }),
}));

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),

  accountId: text("account_id")
    .references(() => accounts.id, {
      onDelete: "cascade",
    })
    .notNull(),

  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),

  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),

  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
