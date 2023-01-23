import { LoaderArgs } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { checkIfUserIsLogged } from "~/services/auth";
import stylesUrl from "~/styles/index.css";

export default function Index() {
  return (
    <main>
      <h1>Alguien ha iniciado sesión</h1>
    </main>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export async function loader({ request }: LoaderArgs) {
  return await checkIfUserIsLogged(request.headers.get("Cookies"))
}
