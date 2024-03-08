import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import Typography from "../atoms/Typography";
import { MDXRemote } from "next-mdx-remote/rsc";

export default function NewsLetterDisplayer({
  newsletters,
}: {
  newsletters: NewsletterType[];
}) {
  return (
    <div className="max-w-full relative flex flex-col gap-4 mt-2">
      {newsletters.concat(newsletters).map((item) => (
        <div className="relative w-full" key={item.id}>
          <div className="flex justify-between">
            <Typography variant="h4">{item.title}</Typography>
            <Typography variant="span" className="text-default-500">
              <small>
                {new Date(item.createdAt).toLocaleDateString("fr-FR")}
              </small>
            </Typography>
          </div>
          <div className="mdstyle">
            <MDXRemote source={item.content} />
          </div>
        </div>
      ))}
    </div>
  );
}
