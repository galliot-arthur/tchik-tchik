import { Ressources } from "../domain/type/ressources";

export async function getData<T>(): Promise<T | undefined> {
  const res = await fetch("http://localhost:3312/api", {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error();
  }

  return res.json();
}

export async function post<T extends {}>(
  data: T,
  ressource: Ressources
): Promise<T | undefined> {
  const res = await fetch(`http://localhost:3312/api/${ressource}`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  return res.json();
}

export async function put<T extends {}>(
  data: T,
  id: string,
  ressource: Ressources
): Promise<T | undefined> {
  const res = await fetch(`http://localhost:3312/api/${ressource}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  return res.json();
}

export async function remove<T extends {}>(
  id: string,
  ressource: Ressources
): Promise<T | undefined> {
  const res = await fetch(`http://localhost:3312/api/${ressource}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  return res.json();
}
