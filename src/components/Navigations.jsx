/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLogin } from "../app/confirmLoginSlice";

export default function NavBar({ token }) {
  const auth2 = useSelector(getLogin);

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          {!auth2 && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          {auth2 && (
            <>
              <li>
                <NavLink
                  to="/account"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Account
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={logout}
                  className={({ isActive }) => (isActive ? "" : "")}
                >
                  Logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
