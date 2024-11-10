import { useDispatch, useSelector } from "react-redux";
import css from "./EditProfileForm.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { useState } from "react";
import { updateUserProfile } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";

const EditProfileForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState(user.name);
  const [avatarURL, setAvatarURL] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (avatarURL) formData.append("avatar", avatarURL);
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully");
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label>
        Change name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Change avatar:
        <input type="file" onChange={(e) => setAvatarURL(e.target.files[0])} />
      </label>
      <label>
        Old Password:
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </label>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <div className={css.btn_container}>
        <button type="submit" className={css.btn_save}>
          Save
        </button>
      </div>

      <Toaster position="top-right" />
    </form>
  );
};

export default EditProfileForm;
