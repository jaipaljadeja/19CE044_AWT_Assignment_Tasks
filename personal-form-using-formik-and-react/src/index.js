import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  name: yup
    .string("Enter your Name")
    .min(3, "Name should be minimum 3 characters")
    .required("Name is required"),
  about: yup
    .string("Tell about yourself")
    .min(5, "About should be minimum 5 characters")
    .required("About is required"),
  collegeName: yup
    .string("Enter your College Name")
    .min(3, "College should be minimum 3 characters")
    .required("College is required"),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      name: "Jaipal",
      about: "I am a coder",
      collegeName: "Charusat University",
      email: "foobar@example.com",
      password: "foobar",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="about"
          name="about"
          label="About"
          value={formik.values.about}
          onChange={formik.handleChange}
          error={formik.touched.about && Boolean(formik.errors.about)}
          helperText={formik.touched.about && formik.errors.about}
        />
        <TextField
          fullWidth
          id="collegeName"
          name="collegeName"
          label="College Name"
          value={formik.values.collegeName}
          onChange={formik.handleChange}
          error={
            formik.touched.collegeName && Boolean(formik.errors.collegeName)
          }
          helperText={formik.touched.collegeName && formik.errors.collegeName}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

ReactDOM.render(<WithMaterialUI />, document.getElementById("root"));
