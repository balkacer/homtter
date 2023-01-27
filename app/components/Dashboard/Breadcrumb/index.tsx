import { NavLink } from "@remix-run/react";
import ROUTES, { CURRENT_DOMAIN } from "~/mocks/dashboardRoutes";

const Breadcrumb = (props: { currentRoute: string }) => {
  const { currentRoute } = props;

  return (
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        {
          currentRoute.replace(CURRENT_DOMAIN, "").split("/").map((route, i, array) => {
            const routePath = "/" + array.filter((_, index) => index <= i).join("/");
            console.log(routePath);

            const routeName = route.toUpperCase();
            const isActive = routePath === "/" + currentRoute.replace(CURRENT_DOMAIN, "")

            return (
              <li className={isActive ? "is-active" : undefined}>
                <NavLink to={routePath} aria-current={isActive ? "page" : undefined}>
                  {routeName}
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Breadcrumb;