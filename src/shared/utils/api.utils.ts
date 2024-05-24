/* eslint-disable fsd-vf/layer-imports */
import db from "@/app/db/drizzle";
import { NextResponse } from "next/server";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const getDbAndReqBody = async <T>(req?: Request) => {
  if (req) {
    const reqBody = (await req.json()) as T;

    return { db, reqBody };
  }

  return { db };
};

export const getAuthRouteData = async <T>(req: Request, withReqBody = true) => {
  const { reqBody, db } = await getDbAndReqBody<T>(
    withReqBody ? req : undefined,
  );

  const token = req.headers.get("authorization")?.split(" ")[1];

  const validatedTokenResult = await isValidAccessToken(token);

  return { db, reqBody, validatedTokenResult, token };
};

export const NextApiError = ({
  error,
  status,
}: {
  error: string;
  status?: number;
}) => {
  if (status) {
    return NextResponse.json(
      {
        warningMessage: error,
      },
      {
        status: status,
      },
    );
  }

  return NextResponse.json({
    warningMessage: error,
  });
};

export const generateTokens = (id: string, email: string) => {
  const accessToken = jwt.sign(
    { id, email },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: "5min",
    },
  );

  const refreshToken = jwt.sign(
    { email },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    {
      expiresIn: "30d",
    },
  );

  return { accessToken, refreshToken };
};

export const generateErrors = (errors: any[]) => {
  let errMessage = "";

  errors.forEach((err) => {
    errMessage += `${err.message} <br />`;
  });

  return errMessage;
};

export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: "Unauthorized",
    status: 401,
  };

  let jwtError = null;

  if (!token) {
    return {
      ...baseError,
      error: {
        message: "jwt must be provided",
      },
    };
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err;
      }
    },
  );

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    };
  }

  return { status: 200 };
};

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
