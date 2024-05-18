import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  NextApiError,
  generateErrors,
  generateTokens,
  getDbAndReqBody,
} from "@/shared/utils/api.utils";
import { AuthForm, formAuthSchema } from "@/entities/AuthForm";
import { user as userSchema } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { reqBody, db } = await getDbAndReqBody<{ body: AuthForm }>(req);

    const required = formAuthSchema.safeParse(reqBody!.body);

    if (!required.success) {
      const errMessage = generateErrors(required.error?.errors);

      return NextApiError({
        error: errMessage,
        status: 400,
      });
    }

    if (!reqBody?.body) {
      return NextApiError({
        error: "Ошибка внутренняя",
        status: 404,
      });
    }
    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, reqBody.body.email));

    if (!user) {
      return NextApiError({
        error: "Пользователя не существует",
        status: 404,
      });
    }

    if (!bcrypt.compareSync(reqBody.body.password, user.password)) {
      return NextApiError({
        error: "Неправильный логин или пароль",
        status: 401,
      });
    }
    const { password, ...bodyUser } = reqBody.body;

    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    cookies().set({
      name: "token",
      value: refreshToken,
      maxAge: 30 * 24 * 60 * 60,
      httpOnly: true,
      path: "/",
      secure: true,
    });

    return NextResponse.json({
      accessToken,
      user: {
        ...bodyUser,
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
