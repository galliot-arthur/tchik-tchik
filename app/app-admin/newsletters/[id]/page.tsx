import { fetchData } from "@/libs/api/fetch";
import { NewsletterType } from "@/libs/domain/type/newsletter";
import { ressources } from "@/libs/domain/type/ressources";
import Typography from "@/libs/ui/atoms/Typography";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import NewsletterForm from "@/libs/ui/template/admin/NewsletterForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const newsLetters = await fetchData<NewsletterType[]>(ressources.newsletters);

  if (!newsLetters || "message" in newsLetters) {
    notFound();
  }

  return newsLetters.map((newsLetter) => newsLetter.id);
}

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const newsLetter = await fetchData<NewsletterType>(
    ressources.newsletters,
    id
  );

  if (!newsLetter || "message" in newsLetter) {
    notFound();
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
  const newsLetter = await fetchData<NewsletterType>(
    ressources.newsletters,
    id
  );

  if (!newsLetter || "message" in newsLetter) {
    notFound();
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
