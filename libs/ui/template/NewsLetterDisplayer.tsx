import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import Typography from "../atoms/Typography";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import classNames from "classnames";
import { getPicture } from "@/libs/domain/type/file";
import { Chip } from "@nextui-org/react";

export default function NewsLetterDisplayer({
  newsletters,
}: {
  newsletters: NewsletterType[];
}) {
  return (
    <div className="max-w-full relative flex flex-col gap-4 mt-2">
      {newsletters.map((item) => (
        <div className="relative w-full pt-2 border-t-2" key={item.id}>
          <div>
            <div className="flex justify-between">
              <Typography variant="h4" className="!text-sm mb-0">
                {item.title}
              </Typography>
              <Chip size="sm" className="bg-gradient">
                {new Date(item.createdAt).toLocaleDateString("fr-FR")}
              </Chip>
            </div>
            <div className="flex flex-row mt-1">
              <div
                className={classNames(
                  item.coverId ? "w-1/2" : "w-full",
                  "mdstyle text-sm"
                )}
              >
                <MDXRemote source={item.content} />
              </div>
              {item.coverId && (
                <div className={classNames("w-1/2 ml-4")}>
                  <div className="relative aspect-[16/9] ">
                    <Image
                      src={getPicture(item.coverId)}
                      fill
                      className={"object-cover"}
                      alt="tap"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-end">
              <Typography className="text-xs mt-2" color="gray-500">
                L&apos;équipe Tchik Tchik
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
