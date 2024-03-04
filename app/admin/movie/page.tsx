import Typography from "@/libs/ui/atoms/Typography";
import AdminTitleContainer from "@/libs/ui/molecule/AdminTitleContainer";
import MovieForm from "@/libs/ui/template/admin/MovieForm";

export const metadata = {
  title: "créer un film",
  description: "créer un film",
  robots: {
    index: false,
  },
};

export default async function EditMovie() {
  return (
    <div className="relative top-16 mb-8">
      <AdminTitleContainer>
        <Typography variant="h1">{"Create"}</Typography>
        <Typography variant="h3">{"Renseigner un nouveau film"}</Typography>
      </AdminTitleContainer>
      <MovieForm />
    </div>
  );
}
