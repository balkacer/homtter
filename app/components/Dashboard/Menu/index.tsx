import { NavLink } from "@remix-run/react"
import ROUTES, { CURRENT_DOMAIN } from "~/mocks/dashboardRoutes"

const Menu = (props: { currentRoute: string }) => {
  const { currentRoute } = props;

  return (
    <aside className="menu p-4">
      {ROUTES.map((item) => (
        <>
          {!item.to && (
            <>
              <p className="menu-label">
                {item.name}
              </p>
              {item.children && (
                <ul className="menu-list">
                  {item.children.map(child => {
                    return (<li key={child.to}>
                      <NavLink to={child.to} className={({ isActive }) => isActive ? "is-active" : undefined}>
                        {child.name}
                      </NavLink>
                      {!!child.children && (
                        <ul className="menu-list">
                          {child.children?.map(childOfChild => {
                            return (<li key={childOfChild.to}>
                              <NavLink to={childOfChild.to} className={({ isActive }) => isActive ? "is-active" : undefined}>
                                {childOfChild.name}
                              </NavLink>
                            </li>)
                          })}
                        </ul>)}
                    </li>)
                  })}
                </ul>
              )}
            </>
          )}
        </>
      ))}
    </aside>
  )
}

export default Menu