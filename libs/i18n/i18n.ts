import { EnvelopeAt, Geo, InfoCircle } from "react-bootstrap-icons";

export const i18n = {
  website: "Tchik Tchik Productions",
  bio: {
    label: "Qui sommes nous ?",
    bio: " Fondée par Adèle Galliot et Florian Séjourné, deux ancien.ne.s élèves de la CinéFabrique de Lyon, **Tchik Tchik Production** est une société de productions de cinéma basée en Nouvelle Aquitaine. Nous accompagnons des **films de fiction et documentaires de jeunes auteurices**.",
  },
  footer: {
    base: "On verra plus tard mais en gros là, un bas de page.",
  },
  menu: {
    homepage: { label: "Accueil", url: "/" },
    catalog: { label: "Catalogue", url: "/catalogue" },
    contact: { label: "Contact", url: "/contact" },
    admin: { label: "Admin", url: "/app-admin" },
  },
  homepage: {
    films: "Nos films",
    newsletters: "Les dernières nouvelles :",
    important: "À la une !",
  },
  movies: {
    bio: "Synopsis :",
    coproduced: (coproduced?: string | null) =>
      coproduced ? `Une coproduction ${coproduced}` : undefined,
    diffusion: "Diffusion",
    press: "Presse",
    festivals: "Participation à des festivals :",
    photogram: (plurial: boolean) => `Photogramme${plurial ? "s" : ""} :`,
    writtenBy: (author?: string | null) =>
      author ? `Écrit par : ${author}` : undefined,
    spoiler: "Bande d'Annonce :",
  },
  contact: {
    logo: {
      title: "Besoin de notre logo ?",
      url: "/tchik_tchik_logo.png",
      tooltip: "Ouvrir dans une autre fenêtre",
    },
    portrait: {
      title:
        "Fondée par Adèle Galliot et Florian Séjourné, deux ancien.ne.s élèves de la CinéFabrique de Lyon, Tchik Tchik Production est une société de productions de cinéma basée en Nouvelle Aquitaine",
    },
    links: {
      title: "Liens",
      instagram: {
        label: "Instagram",
        url: "http://www.google.com",
      },
    },
    address: [
      {
        title: "Adresse",
        icon: Geo,
        content: [
          "Tchik Tchik Productions",
          "51 grand rue, Couhé 86700 Valence en Poitou",
        ],
      },
      {
        title: "Nous contacter",
        icon: EnvelopeAt,
        content: ["tchiktchikproductions@gmail.com"],
      },
      {
        title: "Raisons sociales",
        icon: InfoCircle,
        content: [
          "Tchik Tchik Productions",
          "51 Grand rue, Couhé 86700 Valence en Poitou",
          "SARL au capital de 4 000€ - R.C.S POITIERS - APE 5911A- SIRET 948 408 802 00015",
          "N°TVA INTRA FR 11948408802",
        ],
      },
    ],
  },
  admin: {
    homePage: {
      welcome: (name: string) => `Bienvenue ${name}`,
      logout: "Déconnexion",
    },
  },
  notFound: {
    title: "404",
    content:
      "Oups, mince, flûte, ou que sais-je. La page que vous venez de demande n'existe pas.",
    goBack: "Cliquez ici pour retourner à l'accueil",
  },
};
