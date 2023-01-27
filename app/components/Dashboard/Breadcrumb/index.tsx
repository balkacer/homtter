import { NavLink } from "@remix-run/react";
import ROUTES, { CURRENT_DOMAIN } from "~/mocks/dashboardRoutes";
import recursiveSearch from "~/utils/recursiveSearch";

const Breadcrumb = (props: { currentRoute: string }) => {
  const { currentRoute } = props;

  return (
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        {
          currentRoute.replace(CURRENT_DOMAIN, "").split("/").map((route, i, array) => {
            const routePath = "/" + array.filter((_, index) => index <= i).join("/");

            const routeName = ROUTES.reduce((value, current) => {
              if (value) return value;
              const result = recursiveSearch(current, "children", "name", ({ to }) => to === routePath)
              return result;
            }, "");

            const isActive = routePath === currentRoute.replace(CURRENT_DOMAIN, "/")

            return (
              <li key={routePath} className={isActive ? "is-active" : undefined}>
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