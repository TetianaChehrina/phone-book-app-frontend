import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={css.section_home}>
      <DocumentTitle>Home</DocumentTitle>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to your phone book!</h1>
      </div>
    </section>
  );
};
export default HomePage;
