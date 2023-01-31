import { NavLink, useLocation } from "@remix-run/react";
import ROUTES from "~/mocks/dashboardRoutes";
import recursiveSearch from "~/utils/recursiveSearch";
const Breadcrumb = () => {
  const path = useLocation().pathname

  return (
    <nav className="breadcrumb has-arrow-separator" aria-label="breadcrumbs">
      <ul>
        {
          path.replace("/", "").split("/").map((_, i, array) => {
            const routePath = "/" + array.filter((_, index) => index <= i).join("/");

            const routeName = ROUTES.reduce((value, current) => {
              if (value) return value;
              const result = recursiveSearch(current, "children", "name", ({ to }) => to === routePath)
              return result;
            }, "");

            const isActive = routePath === path;

            return (
              <li key={routePath} className={isActive ? "is-active" : undefined}>
                <NavLink to={routePath} aria-current={isActive ? "page" : undefined} end>
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