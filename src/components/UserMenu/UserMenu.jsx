import { useDispatch, useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import EditProfileForm from "../EditProfileForm/EditProfileForm";

const UserMenu = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  return (
    <div className={css.container}>
      <p className={css.username}>
        <span>Welcome, {user.name}</span>
        {user.avatarURL && (
          <span className={css.avatarWrapper}>
            <img
              src={user.avatarURL}
              alt="User avatar"
              className={css.avatar}
            />
          </span>
        )}
      </p>
      <button className={css.edit_btn} onClick={handleEdit}>
        {isEditing ? "Cancel" : <CiEdit />}
      </button>
      {isEditing && (
        <div className={css.edit_profile_form_container}>
          <EditProfileForm onClose={handleCloseForm} />
        </div>
      )}
      <button
        className={css.btn}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
};
export default UserMenu;
