import Typography from "@/libs/ui/atoms/Typography";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import NewsletterForm from "@/libs/ui/template/admin/NewsletterForm";

export const metadata = {
  title: "Newsletter",
  description: "Renseigner une nouvelle newsletter",
  robots: {
    index: false,
  },
};

export default async function EditMovie() {
  return (
    <div className="relative top-16 mb-8">
      <AdminTitleContainer>
        <Typography variant="h1">{"Create"}</Typography>
        <Typography variant="h3">
          {"Renseigner une nouvelle newsletter"}
        </Typography>
      </AdminTitleContainer>
      <NewsletterForm />
    </div>
  );
}
