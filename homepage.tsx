/**
 * v0 by Vercel.
 * @see https://v0.dev/t/efbI7aAdP7a
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Component() {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Tchik Tchik Productions</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link className="text-lg font-semibold hover:underline" href="#">
                Accueil
              </Link>
            </li>
            <li>
              <Link className="text-lg font-semibold hover:underline" href="#">
                Catalogue
              </Link>
            </li>
            <li>
              <Link className="text-lg font-semibold hover:underline" href="#">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="grid grid-cols-3 gap-8">
        <section className="col-span-2 space-y-6">
          <article>
            <h2 className="text-2xl font-semibold mb-4">Qui sommes nous?</h2>
            <p>
              Fondée par Adèle Galliot et Florian Séjourné, deux anciens élèves
              de la CinéFabrique de Lyon, Tchik Tchik Productions est une
              société de production de cinéma basée en Nouvelle Aquitaine. Nous
              accompagnons des films de fictions et documentaires de jeunes
              auteures.
            </p>
          </article>
          <article>
            <h3 className="text-xl font-semibold mb-4">
              Les dernières nouvelles:
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4 items-start">
                <img
                  alt="Prochainement, Dom Juan disponible sur Arte.fr"
                  className="aspect-square overflow-hidden rounded-lg"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div>
                  <h4 className="text-lg font-medium">
                    Prochainement, Dom Juan disponible sur Arte.fr
                  </h4>
                  <p className="text-sm mb-2">10/03/2024</p>
                  <p>
                    Dom Juan de Hekuran Isufi sera diffusé dans l'émission
                    Court-circuit sur Arte le 23 mars 2024. Il sera ensuite
                    disponible en ligne, sur Arte.fr pendant 3 mois!
                  </p>
                </div>
              </div>
              <div className="flex space-x-4 items-start">
                <img
                  alt="Quitter Chouchou sur Tënk!"
                  className="aspect-square overflow-hidden rounded-lg"
                  height="200"
                  src="/placeholder.svg"
                  width="200"
                />
                <div>
                  <h4 className="text-lg font-medium">
                    Quitter Chouchou sur Tënk!
                  </h4>
                  <p className="text-sm mb-2">04/03/2024</p>
                  <p>
                    Une belle nouvelle pour Quitter Chouchou! à partir du 22
                    mars 2024, le court-métrage documentaire de Lucie Demange
                    sera accessible sur la plateforme Tënk pour 2 mois en SVOD!
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
        <aside className="space-y-6">
          <section className="bg-gray-100 p-4">
            <h2 className="text-xl font-semibold mb-4">À la une!</h2>
            <img
              alt="Tout ce que ces arbres ont vu"
              className="mb-4"
              height="200"
              src="/placeholder.svg"
              style={{
                aspectRatio: "200/200",
                objectFit: "cover",
              }}
              width="200"
            />
            <h3 className="text-lg font-medium">
              Tout ce que ces arbres ont vu
            </h3>
            <p className="text-sm">2023</p>
            <p className="text-sm">Documentaire</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4">Nos films</h2>
            <ul className="space-y-2">
              <li>Au delà des murs</li>
              <li>Au dodo !</li>
              <li>Bedigas</li>
              <li>Dom Juan</li>
              <li>Le Mariage Forcé</li>
              <li>Quitter Chouchou</li>
              <li>Sahin</li>
              <li>Soleil</li>
              <li>Tout ce que ces arbres ont vu</li>
              <li>Vache à lait</li>
            </ul>
          </section>
        </aside>
      </main>
      <footer className="text-center mt-10">
        <p>Tchik Tchik Productions © 2023 - 2024</p>
      </footer>
    </div>
  );
}
