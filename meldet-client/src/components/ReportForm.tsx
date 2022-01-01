import {
  Box,
  Button,
  Chip,
  Grid,
  LinearProgress,
  ListItemText,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { Category } from "@prisma/client";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-mui";
import { DateTimePicker } from "formik-mui-lab";
import * as React from "react";
import { ReportFormValues, ReportSteps } from "../pages/report";
import LocationForm, { Location } from "./LocationForm";

interface Values {
  location: string;
  title: string;
  categories: Category[];
}

interface IReportForm {
  formState: ReportFormValues;
  handleFormSubmit: (formValues: ReportFormValues) => void;
  handleStepChange: (step: ReportSteps) => void;
  categories: Category[];
}


export default function ReportForm({
  categories,
  formState,
  handleFormSubmit,
  handleStepChange,
}: IReportForm) {
  
  const [location, setLocation] = React.useState<Location>({label: ''});

  return (
    <Formik
      initialValues={{ ...formState }}
      validate={(values) => {
        const errors: Partial<Values> = {};
        if (!values.title) {
          errors.title = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log('submitting', location.latitude)
        handleFormSubmit({
          ...values,
          address: location.label,
          lat: location.latitude ? String(location.latitude) : '',
          lng: location.longitude ? String(location.longitude) : '',
        });
        setSubmitting(false);
        handleStepChange("review");
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>


            <LocationForm 
              location={location} 
              setLocation={setLocation}
            />



            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                component={TextField}
                type="text"
                label="Title"
                name="title"
                InputProps={{ notched: true }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                component={Select}
                multiple
                // formControl={{ sx: sxFormControl }}
                formHelperText={{ children: "Select one or more categories" }}
                id="categories"
                name="categories"
                labelId="Categories"
                label="Categories"
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected: string[]) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {console.log(selected)}
                    {selected.map((value: string) => (
                      <Chip key={value} label={JSON.parse(value).name} />
                    ))}
                  </Box>
                )}
                // validate={(age: number) =>
                //   !age
                //     ? "Please enter your age"
                //     : age < 21
                //     ? "You must be 21 or older"
                //     : undefined
                // }
              >
                {categories &&
                  categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      value={JSON.stringify(category)}
                      // style={getStyles(name, personName, theme)}
                    >
                      {/* <Checkbox checked={values.indexOf(name) > -1} /> */}
                      <ListItemText
                        inset
                        primary={category.name}
                        secondary={category.description}
                      />
                    </MenuItem>
                  ))}
              </Field>
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                component={DateTimePicker}
                label="Date"
                name="date"
                textField={{ helperText: "This is the date of the incident" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Field
                component={TextField}
                multiline
                minRows={6}
                label="Description"
                name="description"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              {isSubmitting && <LinearProgress />}
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Review
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
