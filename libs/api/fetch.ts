export async function getData<T>(): Promise<T | undefined> {
  const res = await fetch("http://localhost:3312/api", {
    cache: "force-cache",
  });

  if (!res.ok) {
    console.error();
  }

  return res.json();
}

export async function post<T extends {}>(data: T): Promise<T | undefined> {
  const res = await fetch("http://localhost:3312/api", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to post data");
  }

  return res.json();
}
