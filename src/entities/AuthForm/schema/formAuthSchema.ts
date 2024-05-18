import { z } from "zod";

export const formAuthSchema = z.object({
  email: z.string().email("Несуществующий email."),
  username: z
    .string()
    .min(4, "Имя должно быть не менее 4 символов.")
    .optional(),
  password: z.string().min(8, "Пароль минимум 8 символов."),
});

export type FormAuthSchema = z.infer<typeof formAuthSchema>;
