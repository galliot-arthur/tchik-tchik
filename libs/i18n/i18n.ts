import { EnvelopeAt, Geo, InfoCircle } from "react-bootstrap-icons";

export const i18n = {
  website: "Tchik-Tchik Production",
  bio: {
    label: "Qui sommes nous ?",
    bio: " Fondée par Adèle Galliot et Florian Séjourné, deux ancien.ne.s élèves de la CinéFabrique de Lyon, Tchik Tchik Productions est une société de productions de cinéma basée en Nouvelle Aquitaine. Nous accompagnons des films de fiction et documentaires de jeunes auteurices.",
  },
  footer: {
    base: "On verra plus tard mais en gros là, un bas de page.",
  },
  menu: {
    homepage: { label: "Production", url: "/" },
    contact: { label: "Contact", url: "/contact" },
  },
  homepage: {
    films: "Nos films",
    newsletters: "À la une !",
  },
  movies: {
    bio: "En bref :",
  },
  contact: {
    portrait: { title: "On tient la boutique :" },
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
};
