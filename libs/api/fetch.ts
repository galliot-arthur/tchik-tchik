import { Ressources } from "../domain/type/ressources";

type Error = { message: string };

export async function getData<T>(): Promise<T | undefined> {
  const res = await fetch("/api", {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error();
  }

  return res.json();
}

export async function post<T extends {}>(
  data: T,
  ressource: Ressources,
  contentType?: string
): Promise<T | Error> {
  const res = await fetch(`/api/${ressource}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": contentType ?? "application/json" },
  });

  if (!res.ok) {
    return { message: `Erreur lors de la création de : ${ressource}` };
  }

  return res.json();
}

export async function put<T extends {}>(
  data: T,
  id: string,
  ressource: Ressources
): Promise<T | Error> {
  const res = await fetch(`/api/${ressource}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return { message: `Erreur lors de la création de : ${ressource}` };
  }

  return res.json();
}

export async function remove<T extends {}>(
  id: string,
  ressource: Ressources
): Promise<T | Error> {
  const res = await fetch(`/api/${ressource}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return { message: `Erreur lors de la suppression de : ${ressource}` };
  }

  return res.json();
}
