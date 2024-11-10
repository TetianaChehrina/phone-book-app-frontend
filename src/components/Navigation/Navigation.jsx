import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.navigation}>
      <NavLink className={css.list} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={css.list} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};
export default Navigation;
