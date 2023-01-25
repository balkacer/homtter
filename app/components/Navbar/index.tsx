import { Link, useSubmit } from "@remix-run/react"
import { User } from "~/models"
import Image from "../Image";
import NavbarLogo from "../Image/navbarLogo";

const Navbar = (props: { loggedUser?: User | null, }) => {
  const { loggedUser } = props;
  const submit = useSubmit();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <NavbarLogo />
        </Link>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/estates" className="navbar-item">
            Estates
          </Link>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            {loggedUser ? (
              <div className="navbar-item has-dropdown">
                <a className="navbar-item">
                  <Image source={loggedUser.profilePicture ?? undefined} size="64" isRounded />
                </a>
                <div className="navbar-dropdown">
                  <Link to="/profile" className="navbar-item">
                    Profile
                  </Link>
                  <Link to="/estates/publish-new" className="navbar-item">
                    Publish
                  </Link>
                  <a className="navbar-item" onClick={() => submit(null, { method: "post", action: "/" })}>
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
                  Log in
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