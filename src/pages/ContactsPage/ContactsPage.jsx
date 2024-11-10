import { useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import Loading from "../../components/Loading/Loading";
import css from "./ContactsPage.module.css";
import ContactList from "../../components/ContactList/ContactList";
import { selectLoading } from "../../redux/contacts/selectors";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../../redux/contacts/operations";
import { useEffect, useState } from "react";
import FilterController from "../../components/FilterController/FilterController";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("all");
  const [favourite, setFavourite] = useState(false);
  const nameFilter = useSelector(selectNameFilter);
  const numberFilter = useSelector(selectNumberFilter);

  useEffect(() => {
    dispatch(
      fetchContacts({ type, favourite, name: nameFilter, number: numberFilter })
    );
  }, [dispatch, type, favourite, nameFilter, numberFilter]);

  const handleContactType = (contactType) => {
    setType(contactType);
    setFavourite(false);
  };

  const handleIsFavourite = (isFavourite) => {
    setFavourite(isFavourite);
    if (isFavourite) {
      setType("all");
    }
  };

  const isLoading = useSelector(selectLoading);

  return (
    <section className={css.contacts_section}>
      <div className={css.container}>
        <DocumentTitle>Your Contacts</DocumentTitle>
        <ContactForm />
        <FilterController
          handleContactType={handleContactType}
          type={type}
          handleIsFavourite={handleIsFavourite}
          favourite={favourite}
        />
        {isLoading && <Loading />}
        <ContactList />
      </div>
    </section>
  );
};
export default ContactsPage;
