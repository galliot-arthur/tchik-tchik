import { API_URL } from "@/app/env";
import { Ressources } from "../domain/type/ressources";
import { ApiError } from "./error";

const getId = (id?: string) => (id ? `/${id}` : "");

export async function fetchData<T>(
  ressource: Ressources,
  id?: string
): Promise<T | ApiError> {
  const url = `${API_URL}/api/${ressource}${getId(id)}`;
  console.log(url);

  const res = await fetch(url, {
    method: "GET",
    next: { tags: [ressource] },
  });

  if (!res.ok) {
    const err = await res.json();
    return {
      message: (err.message ?? `unkown error from ${ressource}`) + " / " + url,
      status: res.status,
    };
  }

  const data = await res.json();

  return data;
}

export async function fetchFromSlug<T>(
  ressource: Ressources,
  slug: string
): Promise<T | ApiError> {
  const res = await fetch(`${API_URL}/api/${ressource}/slug/${slug}`, {
    method: "GET",
    next: { tags: [ressource] },
  });

  if (!res.ok) {
    const err = await res.json();
    return {
      message: err.message ?? `unkown error from ${ressource}`,
      status: res.status,
    };
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
