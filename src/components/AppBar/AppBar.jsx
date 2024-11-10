import { useSelector } from "react-redux";
import { useState } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Navigation from "../Navigation/Navigation";
import css from "./AppBar.module.css";
import UserMenu from "../UserMenu/UserMenu";
import AuthNav from "../AuthNav/AuthNav";
import { IoMdClose } from "react-icons/io";
import { FiAlignJustify } from "react-icons/fi";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={css.header}>
      <div className={css.header_container}>
        <div className={css.menu_icon} onClick={toggleMenu}>
          {!menuOpen ? <FiAlignJustify size={24} /> : null}
        </div>

        <div className={css.nav_desktop}>
          <Navigation className={css.nav_links} />
          {isLoggedIn ? (
            <UserMenu className={css.user_section} />
          ) : (
            <AuthNav className={css.user_section} />
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className={css.nav_menu}>
          <div className={css.close_icon} onClick={toggleMenu}>
            <IoMdClose size={24} />
          </div>
          <div className={css.nav_content}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
          </div>
        </nav>
      )}
    </header>
  );
};

export default AppBar;
