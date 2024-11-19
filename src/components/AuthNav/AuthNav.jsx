import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const AuthNav = ({ toggleMenu }) => {
  return (
    <div className={css.container}>
      <NavLink className={css.link} to="/register" onClick={toggleMenu}>
        Register
      </NavLink>
      <NavLink className={css.link} to="/login" onClick={toggleMenu}>
        Login
      </NavLink>
    </div>
  );
};
export default AuthNav;
