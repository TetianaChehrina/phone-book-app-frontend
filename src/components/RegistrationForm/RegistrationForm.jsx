import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast, { Toaster } from "react-hot-toast";

import css from "./RegistrationForm.module.css";
import { useRef } from "react";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleSubmit = (values, action) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (fileInputRef.current.files[0]) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    dispatch(register(formData))
      .unwrap()
      .then(() =>
        toast.success("Registration successful!", {
          position: "top-center",
        })
      )
      .catch(() =>
        toast.error("Something went wrong!", {
          position: "top-right",
        })
      );
    action.resetForm();
    fileInputRef.current.value = null;
  };

  return (
    <div className={css.form_container}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Username
            <Field type="text" name="name" placeholder="Enter your name..." />
          </label>
          <label className={css.label}>
            Email
            <Field
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </label>
          <label className={css.label}>
            Password
            <Field
              type="password"
              name="password"
              placeholder="Enter your password..."
            />
          </label>
          <label className={css.label}>
            Avatar
            <input
              type="file"
              name="avatar"
              accept="image/*"
              ref={fileInputRef}
              className={css.fileInput}
            />
          </label>

          <button type="submit">Register</button>
          <Toaster />
        </Form>
      </Formik>
    </div>
  );
};
export default RegistrationForm;
