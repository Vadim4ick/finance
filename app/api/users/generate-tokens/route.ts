import { NextApiError, generateTokens } from "@/shared/utils/api.utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { user as userSchema } from "@/app/db/schema";
import db from "@/app/db/drizzle";

export async function POST() {
  const token = cookies().get("token")?.value;

  if (!token) {
    cookies().delete({
      name: "token",
    });

    return NextApiError({
      error: "Refresh token not passed",
      status: 401,
    });
  }

  let result;

  try {
    result = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    ) as { email: string };
  } catch (error) {
    cookies().delete({
      name: "token",
    });

    return NextResponse.json(
      {
        warningMessage: "Invalid refresh token",
        redirect: "/",
      },
      {
        status: 401,
      },
    );
  }

  const [user] = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, result.email));

  if (!user) {
    return NextApiError({
      error: "User not found",
      status: 404,
    });
  }

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
      ...user,
    },
  });
}
