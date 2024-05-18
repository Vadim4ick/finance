import { NextResponse } from "next/server";
import { user as userSchema } from "@/app/db/schema";
import {
  NextApiError,
  generateErrors,
  generateTokens,
  getDbAndReqBody,
} from "@/shared/utils/api.utils";
import { RegisterForm, formAuthSchema } from "@/entities/AuthForm";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { createId } from "@paralleldrive/cuid2";

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody<{ body: RegisterForm }>(req);

    const required = formAuthSchema.safeParse(reqBody!.body);

    if (!required.success) {
      const errMessage = generateErrors(required.error?.errors);

      return NextApiError({
        error: errMessage,
        status: 400,
      });
    }

    if (!reqBody?.body) {
      return NextApiError({ error: "Ошибка внутренняя", status: 400 });
    }

    const salt = bcrypt.genSalt(10);
    const hashPassword = bcrypt.hashSync(reqBody.body.password, await salt);

    const [user] = await db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, reqBody.body.email));

    if (user) {
      return NextApiError({
        error: "Пользователь уже существует",
        status: 409,
      });
    }

    const { password, ...bodyUser } = reqBody.body;

    const [createUser] = await db
      .insert(userSchema)
      .values({ id: createId(), ...bodyUser, password: hashPassword })
      .returning();

    const { accessToken, refreshToken } = generateTokens(
      createUser.id,
      createUser.email,
    );

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
