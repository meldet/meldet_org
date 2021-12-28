import { Button, LinearProgress, MenuItem } from "@mui/material";
import { Category } from "@prisma/client";
import { Formik, Form, Field } from "formik";
import { TextField, Autocomplete, Select } from "formik-mui";
import { DateTimePicker } from "formik-mui-lab";
import * as React from "react";
import { Switch } from "formik-mui";
import { ReportFormValues, ReportSteps } from "../pages/report";


interface Values {
  location: string;
  title: string;
  categories: Category[];
}

interface IReportForm {
  formState: ReportFormValues;
  handleFormSubmit: (formValues: ReportFormValues) => void;
  handleStepChange: (step: ReportSteps) => void;
}

export default function ReportForm({formState, handleFormSubmit, handleStepChange}: IReportForm) {
  return (
    <Formik
      initialValues={{...formState}}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.title) {
          errors.title = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
          handleFormSubmit({...values})
          setSubmitting(false)
          handleStepChange('review')
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <br />
          {/* <Field
            component={Autocomplete}
            type="text"
            label="Location"
            name="location"
            options={[]}
            autofocus
          /> */}
          <br />
          <Field
            component={TextField}
            type="text"
            label="Title"
            name="title"
            InputProps={{ notched: true }}
          />
          <br />
          <Field
            component={Select}
            // formControl={{ sx: sxFormControl }}
            formHelperText={{ children: "Select your categories" }}
            id="categories"
            name="categories"
            labelId="Categories"
            label="Categories"
            // validate={(age: number) =>
            //   !age
            //     ? "Please enter your age"
            //     : age < 21
            //     ? "You must be 21 or older"
            //     : undefined
            // }
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Field>
          <br />
          <Field
            component={DateTimePicker}
            label="Date"
            name="date"
            textField={{ helperText: "This is the date of the incident" }}
          />
          <br />
          <Field
            component={TextField}
            multiline
            minRows={6}
            label="Description"
            name="description"
          />
          <br />
          {isSubmitting && <LinearProgress />}
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Review
          </Button>
        </Form>
      )}
    </Formik>
  );
}
