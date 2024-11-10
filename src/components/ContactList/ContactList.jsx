import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/slice";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  if (!contacts.length) {
    return <p>Contacts not found</p>;
  }

  const sortedContacts = [...contacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const groupedContacts = sortedContacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

  return (
    <div className={css.contact_list}>
      <p className={css.contacts_length}>All contacts {contacts.length}</p>
      {Object.keys(groupedContacts).map((letter) => (
        <div key={letter}>
          <h2>{letter}</h2>
          <ul className={css.contact_group}>
            {groupedContacts[letter].map((contact) => (
              <li key={contact._id} className={css.item}>
                <Contact contact={contact} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
