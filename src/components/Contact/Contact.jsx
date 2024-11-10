import { useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";

export default function Contact({ contact }) {
  const { _id, name, phoneNumber, email, contactType, isFavourite } = contact;
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(phoneNumber);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedContactType, setEditedContactType] = useState(contactType);

  const [showMore, setShowMore] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(_id)).unwrap();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const toggleFavourite = () => {
    dispatch(updateContact({ _id, isFavourite: !isFavourite }))
      .unwrap()
      .catch((error) => {
        console.error("Error updating favourite status:", error);
      });
  };

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    const updatedContact = {
      _id,
      name: editedName,
      phoneNumber: editedPhoneNumber,
      email: editedEmail,
      contactType: editedContactType,
      isFavourite,
    };

    dispatch(updateContact(updatedContact)).catch((error) => {
      console.error("Failed to update contact:", error);
    });
    setIsEditing(false);
  };

  return (
    <div className={css.contact_container}>
      <div className={css.contact_header}>
        <div className={css.contact_left}>
          <IoPerson className={css.person_icon} size={16} />
          {isEditing ? (
            <input
              className={css.input_field}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          ) : (
            <span>{editedName}</span>
          )}
        </div>

        <span onClick={toggleFavourite} className={css.heart_icon}>
          {isFavourite ? (
            <AiFillHeart size={20} color="red" />
          ) : (
            <AiOutlineHeart size={20} />
          )}
        </span>
      </div>

      <div className={css.contact_info}>
        <IoCallSharp className={css.phone_icon} size={16} />
        {isEditing ? (
          <input
            className={css.input_field}
            value={editedPhoneNumber}
            onChange={(e) => setEditedPhoneNumber(e.target.value)}
          />
        ) : (
          <span>{editedPhoneNumber}</span>
        )}
      </div>

      {showMore && (
        <div className={css.more_info}>
          <div className={css.contact_info}>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                className={css.input_field}
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            ) : (
              <span>{editedEmail}</span>
            )}
          </div>
          <div className={css.contact_info}>
            <strong>Contact Type:</strong>{" "}
            {isEditing ? (
              <select
                value={editedContactType}
                onChange={(e) => setEditedContactType(e.target.value)}
              >
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="home">Home</option>
              </select>
            ) : (
              <span>{editedContactType}</span>
            )}
          </div>
        </div>
      )}

      <div className={css.btn_container}>
        <button onClick={toggleShowMore} className={css.show_more_button}>
          {showMore ? "Show Less" : "Show More"}
        </button>

        {isEditing ? (
          <button onClick={handleSave} className={css.contact_button_save}>
            Save
          </button>
        ) : (
          <button onClick={toggleEdit} className={css.contact_button_change}>
            Change contact
          </button>
        )}

        <button className={css.contact_button_delete} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
