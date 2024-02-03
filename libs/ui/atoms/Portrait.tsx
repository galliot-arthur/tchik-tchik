import { ComponentProps } from "@/libs/domain/type/ui";
import Image from "next/image";
import Typography from "./Typography";

export default function Portrait({
  imgsrc,
  name,
  subTitle,
}: ComponentProps<{ name: string; subTitle?: string; imgsrc: string }>) {
  return (
    <div className="flex flex-row">
      <div className="relative overflow-hidden aspect-square w-full rounded-full md:w-1/2">
        <Image
          src={imgsrc}
          alt={`${name} - ${subTitle ?? ""}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="text-end">
        <Typography className="font-bold text-large leading-none my-[0.30rem]">
          {name}
        </Typography>
        {subTitle && (
          <Typography variant="tiny-bold" color="black">
            {subTitle}
          </Typography>
        )}
      </div>
    </div>
  );
}
