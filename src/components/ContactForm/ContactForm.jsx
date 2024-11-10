import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast, { Toaster } from "react-hot-toast";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Required!"),
  number: Yup.string()
    .matches(/^[0-9]+$/, "Phone number should contain only numbers")
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long")
    .required("Required!"),
  email: Yup.string().email("Invalid email address. Email must include @"),
});

const ContactForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      phoneNumber: values.number,
      email: values.email,
      contactType: values.contactType,
      isFavourite: values.isFavourite,
    };
    dispatch(addContact(newContact))
      .unwrap()
      .then(() =>
        toast.success("Contact successfully added!", {
          position: "top-center",
        })
      )
      .catch(() =>
        toast.error("Error adding contact", {
          position: "top-centre",
        })
      );
    actions.resetForm();
    setIsFormVisible(false);
  };

  return (
    <div className={css.contact_form_container}>
      {!isFormVisible ? (
        <button
          className={css.create_button}
          onClick={() => setIsFormVisible(true)}
        >
          Create contact
        </button>
      ) : (
        <div className={css.form_wrapper}>
          <button
            className={css.close_button}
            onClick={() => setIsFormVisible(false)}
          >
            &times;
          </button>
          <Formik
            initialValues={{
              name: "",
              number: "",
              email: "",
              contactType: "personal",
              isFavourite: false,
            }}
            validationSchema={ContactFormSchema}
            onSubmit={handleSubmit}
          >
            <Form className={css.contact_form}>
              <div className={css.input_container}>
                <label htmlFor="name" className={css.label}>
                  Name
                </label>
                <Field className={css.form_input} type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div className={css.input_container}>
                <label htmlFor="number" className={css.label}>
                  Number
                </label>
                <Field className={css.form_input} type="text" name="number" />
                <ErrorMessage name="number" component="div" />
              </div>

              <div className={css.input_container}>
                <label htmlFor="email" className={css.label}>
                  Email
                </label>
                <Field className={css.form_input} type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>

              <div className={css.input_container}>
                <label htmlFor="contactType" className={css.label}>
                  Contact Type
                </label>
                <Field
                  as="select"
                  name="contactType"
                  className={css.select_input}
                >
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="home">Home</option>
                </Field>
                <ErrorMessage name="contactType" component="div" />
              </div>

              <div className={css.checkbox_container}>
                <Field
                  type="checkbox"
                  name="isFavourite"
                  className={css.checkbox_input}
                />
                <label>Favourite</label>
              </div>
              <ErrorMessage name="isFavourite" component="div" />

              <button className={css.form_button} type="submit">
                Add Contact
              </button>
              <Toaster />
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
