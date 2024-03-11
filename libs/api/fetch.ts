import { API_URL } from "@/app/env";
import { Ressources } from "../domain/type/ressources";
import { ApiError } from "./error";

export async function fetchData<T>(
  ressources: Ressources,
  id?: string
): Promise<T | Error> {
  const res = await fetch(`${API_URL}/api/${ressources}${id ? `/${id}` : ""}`, {
    method: "GET",
    next: { tags: [ressources] },
  });

  if (!res.ok) {
    return res.json().then((err) => new Error(err.message ?? "unknow"));
  }
  const data = await res.json();

  return data;
}

export async function fetchFromSlug<T>(
  ressources: Ressources,
  slug: string
): Promise<T | Error> {
  const res = await fetch(`${API_URL}/api/${ressources}/slug/${slug}`, {
    method: "GET",
    next: { tags: [ressources] },
  });

  if (!res.ok) {
    return res.json().then((err) => new Error(err.message ?? "unknow"));
  }
  const data = await res.json();

  return data;
}

export async function post<T extends {}>(
  data: T,
  ressource: Ressources,
  contentType?: string
): Promise<T | ApiError> {
  const res = await fetch(`/api/${ressource}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": contentType ?? "application/json" },
  });

  if (!res.ok) {
    return {
      message: `Erreur lors de la création de : ${ressource}`,
      status: res.status,
    };
  }

  return res.json();
}

export async function put<T extends {}>(
  data: T,
  id: string,
  ressource: Ressources
): Promise<T | ApiError> {
  const res = await fetch(`/api/${ressource}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return {
      message: `Erreur lors de la création de : ${ressource}`,
      status: res.status,
    };
  }

  return res.json();
}

export async function remove<T extends {}>(
  id: string,
  ressource: Ressources
): Promise<T | ApiError> {
  const res = await fetch(`/api/${ressource}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return {
      message: `Erreur lors de la suppression de : ${ressource}`,
      status: res.status,
    };
  }

  return res.json();
}
