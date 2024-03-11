import { badRequestError, notFoundError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import { ressources } from "@/libs/domain/type/ressources";
import { unlink, readFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  return withAutentification(async () => {
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
  }, ressources.files);
}
