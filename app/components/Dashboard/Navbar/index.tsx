import { Link, useSubmit } from "@remix-run/react"
import { User } from "~/models"
import Image from "~/components/Image";
import NavbarLogo from "~/components/Image/navbarLogo";

const Navbar = (props: { loggedUser?: User | null, }) => {
  const { loggedUser } = props;
  const submit = useSubmit();

  return (
    <nav className="level pr-3 pl-5 m-0">
      <div className="level-left">
        <div className="level-item">
          <Link to="/">
            <NavbarLogo />
          </Link>
        </div>
        <div className="level-item">
          <div className="field has-addons">
            <p className="control">
              <input className="input" type="text" placeholder="Find a post" />
            </p>
            <p className="control">
              <button className="button">
                Search
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-link is-arrowless columns m-0">
            <div className="column is-flex is-flex-direction-column is-align-items-end">
              <h5 className="title is-6">{loggedUser?.name + " " + loggedUser?.lastName}</h5>
              <h6 className="subtitle is-7">{loggedUser?.email}</h6>
            </div>
            <div>
              <Image source={loggedUser?.profilePicture ?? undefined} size="32" isRounded />
            </div>
          </div>
          <div className="navbar-dropdown is-right is-boxed">
            <Link to="/profile" className="navbar-item">
              Profile
            </Link>
            <Link to="/dashboard" className="navbar-item">
              Settings
            </Link>
            <Link to="/dashboard" className="navbar-item">
              Preferences
            </Link>
            <hr className="navbar-divider" />
            <a className="navbar-item" onClick={() => submit(null, { method: "post", action: "/dashboard" })}>
              Log Out
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;