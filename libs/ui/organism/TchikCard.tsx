import { ComponentProps } from "@/libs/domain/type/ui";
import Link from "next/link";
import TchikCardHeader from "../molecule/TchikCardHeader";
import Image from "next/image";
import classNames from "classnames";

export default function TchikCard({
  title,
  subtitle,
  subtitle2,
  caption,
  caption2,

  img,
  href,
}: ComponentProps<{
  title: string;
  subtitle: string;
  subtitle2?: string;
  caption?: string;
  caption2?: string;
  hoverText?: string;
  img?: { src: string; alt: string };
  href: string;
}>) {
  return (
    <Link
      href={href}
      className={classNames(
        "block w-full relative z-20 ",
        "hover:scale-[101%] hover:opacity-90",
        "transition ease-in-out duration-300"
      )}
    >
      {img && (
        <div className="relative w-full h-full aspect-[480/679] tchik-shadow">
          <Image fill alt={img.alt} className="object-cover" src={img.src} />
        </div>
      )}
      <TchikCardHeader
        title={title}
        subtitle={subtitle}
        subtitle2={subtitle2}
        caption={caption}
        caption2={caption2}
      />
    </Link>
  );
}
