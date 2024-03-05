import prisma from "@/libs/database/prisma";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import Typography from "@/libs/ui/atoms/Typography";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import NewsletterForm from "@/libs/ui/template/admin/NewsletterForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const newsLetters: NewsletterType[] | undefined =
    await prisma.newsLetter.findMany();
  if (!newsLetters) {
    return notFound();
  }
  return newsLetters.map((newsLetter) => newsLetter.id);
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const newsLetter: NewsletterType | undefined =
    await prisma.newsLetter.findUnique({
      where: { id },
    });

  if (!newsLetter) {
    return notFound();
  }

  return {
    title: newsLetter.title,
    description: newsLetter.content,
    robots: {
      index: false,
    },
  };
}

export default async function EditMovie({ params: { id } }: Props) {
  const newsLetter: NewsletterType | undefined =
    await prisma.newsLetter.findUnique({
      where: { id },
    });

  if (!newsLetter) {
    return notFound();
  }

  return (
    <div className="relative top-16 mb-8">
      <AdminTitleContainer>
        <Typography variant="h1">{"Edit"}</Typography>
        <Typography variant="h2">{newsLetter.title}</Typography>
      </AdminTitleContainer>
      <NewsletterForm defaultValues={newsLetter} />
    </div>
  );
}
