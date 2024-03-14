import { i18n } from "@/libs/i18n/i18n";
import Typography from "@/libs/ui/atoms/Typography";
import LeftSection from "@/libs/ui/molecule/LeftSection";
import MainContainer from "@/libs/ui/molecule/MainContainer";
import classNames from "classnames";
import Link from "next/link";
import { ArrowLeftCircle } from "react-bootstrap-icons";

export default function NotFound() {
  return (
    <MainContainer>
      <LeftSection>
        <Typography variant="h1" className="mb-3">
          {i18n.notFound.title}
        </Typography>

        <Typography>{i18n.notFound.content}</Typography>

        <div className="mt-4">
          <Link
            className={classNames(
              "inline-flex flex-row items-center gap-1.5 px-3 py-2 text-sm",
              "rounded-full tchik-shadow bg-gradient",
              "transition hover:scale-[101%] hover:opacity-50"
            )}
            href={i18n.menu.homepage.url}
          >
            <ArrowLeftCircle />
            {i18n.notFound.goBack}
          </Link>
        </div>
      </LeftSection>
    </MainContainer>
  );
}
