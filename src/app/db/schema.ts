import { relations } from "drizzle-orm";
import { text, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(user, {
    fields: [accounts.userId],
    references: [user.id],
  }),
}));

// categories: many(categories),
// export const categories = pgTable("categories", {
//   id: text("id").primaryKey(),
//   categoryId: text("category_id"),
//   name: text("name").notNull(),
//   userId: text("user_id").notNull(),
// });

// ====
// export const users = pgTable("users", {
//   id: text("id").primaryKey(),
//   username: text("name").notNull(),
//   email: text("email").notNull(),
//   password: text("password").notNull(),
// });
// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));
// export const accounts = pgTable("accounts", {
//   id: text("id").primaryKey(),
//   name: text("name").notNull(),
//   userId: text("user_id").notNull(),
// });
// export const accountsRelations = relations(accounts, ({ one }) => ({
//   author: one(users, {
//     fields: [accounts.userId],
//     references: [users.id],
//   }),
// }));
