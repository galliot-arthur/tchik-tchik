import { badRequestError } from "@/libs/api/error";
import withAutentification from "@/libs/api/withAutentification";
import { isFile } from "@/libs/domain/type/file";
import { ressources } from "@/libs/domain/type/ressources";
import { writeFileSync } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return withAutentification(async () => {
    try {
      let formData = await request.formData();
      const fileData = formData.get("file");

      if (!isFile(fileData)) {
        return badRequestError(ressources.files);
      }

      const fileName = crypto.randomUUID() + fileData.name;
      const buffer = Buffer.from(await fileData.arrayBuffer());
      const filePath = path.join(process.cwd(), `public/pictures/${fileName}`);

      writeFileSync(filePath, buffer);

      return NextResponse.json(
        { fileName },
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error(error);
      return badRequestError(
        JSON.stringify(error) +
          "\n" +
          path.join(process.cwd(), `public/pictures/`)
      );
    }
  }, ressources.files);
}
// {"errno":-2,"syscall":"open","code":"ENOENT","path":"public/pictures/03527678-cc82-4cf6-9eb6-2d7ac6f31517vatna-glacier-qu-3840x2400.jpg"}
