import css from "./LoginForm.module.css";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() =>
        toast.success("Registration successful!", {
          position: "top-center",
        })
      )
      .catch(() =>
        toast.error("You have not registered, please register first", {
          position: "top-centre",
        })
      );

    actions.resetForm();
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <label className={css.label}>
          Email
          <Field type="email" name="email" className={css.input} />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" className={css.input} />
        </label>
        <button type="submit" className={css.button}>
          Log in
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
};
export default LoginForm;
