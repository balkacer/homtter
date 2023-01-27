import { Link, useSubmit } from "@remix-run/react"
import { User } from "~/models"
import Image from "~/components/Image";
import NavbarLogo from "~/components/Image/navbarLogo";

const Navbar = (props: { loggedUser?: User | null, }) => {
  const { loggedUser } = props;
  const submit = useSubmit();

  return (
    <nav className="navbar is-fixed-top is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <NavbarLogo />
        </Link>
        <div className="navbar-burger" data-target="homtter-navbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navbar" className="navbar-menu">
        <div className="navbar-start" style={{ width: "100%" }}>
          <div className="navbar-item" style={{ width: "100%" }}>
            <div className="field has-addons is-expanded">
              <div className="control is-expanded">
                <input className="input is-fullwidth" type="text" placeholder="Find a repository" />
              </div>
              <div className="control">
                <a className="button is-primary">
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {!!loggedUser?.email ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link is-arrowless" style={{ padding: 0 }}>
                  <Image source={loggedUser.profilePicture ?? undefined} isRounded size="32" />
                </div>
                <div className="navbar-dropdown is-right is-boxed">
                  <Link to="/profile" className="navbar-item">
                    Profile
                  </Link>
                  <Link to="/dashboard" className="navbar-item">
                    Dashboard
                  </Link>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" onClick={() => submit(null, { method: "post", action: "/dashboard" })}>
                    Log Out
                  </a>
                </div>
              </div>
            ) : (
              <div className="buttons">
                <Link to="/sign-up" className="button is-primary">
                  <strong>Sign up</strong>
                </Link>
                <Link to="/sign-in" className="button is-light">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;