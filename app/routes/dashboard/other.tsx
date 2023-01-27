import { ActionFunction, LoaderFunction } from "@remix-run/node";
import AuthService from "~/services/auth.server";

export default function Other() {
  return (
    <main className="hero">
      <h1>Hola Amiko</h1>
    </main>
  );
}
