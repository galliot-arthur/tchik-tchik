import {
  badRequestError,
  forbiddenError,
  notFoundError,
} from "@/libs/api/error";

import { ressources } from "@/libs/domain/type/ressources";

import { getSession, Session } from "@auth0/nextjs-auth0";
import { unlink, readFileSync } from "fs";

import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getSession();

  if (!(session instanceof Session) || !("user" in session)) {
    return forbiddenError(ressources.files);
  }

  try {
    const maybeFile = readFileSync(`public/pictures/${id}`);

    if (maybeFile === undefined) {
      return notFoundError(ressources.files);
    }

    unlink(`public/pictures/${id}`, (error) => {
      if (error) {
        return badRequestError(ressources.files);
      }
    });

    return NextResponse.json(
      { message: `${id} succefully deleted` },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return badRequestError(ressources.files);
  }
}
