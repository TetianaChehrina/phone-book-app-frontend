import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import LoginForm from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <section className={css.login_section}>
      <DocumentTitle>Please log in</DocumentTitle>
      <div className={css.login_page_container}>
        <LoginForm />
      </div>
    </section>
  );
};
export default LoginPage;
