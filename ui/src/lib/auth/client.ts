export async function getUser() {
  return await fetch("http://localhost:8000/auth/user", {
    credentials: "include",
  });
}

export const signin = new URL(
  "http://localhost:8000/auth/signin?redirect=http://localhost:5173",
);

export async function signout() {
  return await fetch("http://localhost:8000/auth/signout", {
    credentials: "include",
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const response = await getUser();
  return response.ok;
}
