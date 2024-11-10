import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <section className={css.registration_page_section}>
      <DocumentTitle>Registration</DocumentTitle>
      <div className={css.container}>
        <RegistrationForm />
      </div>
    </section>
  );
};
export default RegistrationPage;
