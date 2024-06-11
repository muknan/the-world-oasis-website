import { auth } from "./auth";

export default async function isAuth() {
  const session = await auth();
  if (!session) throw new Error("You must be logged in!");

  return session;
}
