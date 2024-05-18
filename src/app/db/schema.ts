import { text, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});
