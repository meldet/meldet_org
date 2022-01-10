import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Category } from "@prisma/client";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-mui";
import { DateTimePicker } from "formik-mui-lab";
import * as React from "react";
import { ReportFormValues, ReportSteps } from "../pages/report";
import LocationForm from "./LocationForm";
import ReportMapPicker from "./ReportMapPicker";


interface IReportForm {
  formState: ReportFormValues;
  handleFormSubmit: (formValues: Partial<ReportFormValues>) => void;
  handleStepChange: (step: ReportSteps) => void;
  categories: Category[];
  isMobile: boolean;
}


export default function ReportForm({
  categories,
  formState,
  handleFormSubmit,
  handleStepChange,
  isMobile
}: IReportForm) {
  
  const [open, setOpen] = React.useState(false);

  return (
    <Formik
      initialValues={{ ...formState }}
      validate={(values) => {
        const errors: any = {};
        if (!values.title) {
          errors.title = "Required";
        } else if (!values.categories) {
          errors.categories = "Required";
        } else if (!values.incidentDate) {
          errors.incidentDate = "Required";
        } else if (!formState.address) {
          errors.address = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        handleFormSubmit({
          ...values,
          address: formState.address,
          lat: formState.lat,
          lng: formState.lng,
        });
        setSubmitting(false);
        handleStepChange("review");
      }}
    >
      {({ submitForm, isSubmitting, errors, setFieldValue }) => (
        <Grid item xs={12} md={4}>
          <Typography variant="h4" component="h1" gutterBottom ml={2}>
            Report
          </Typography>
          <Form>
            <FormControl sx={{ p: 2, m: 0, width: "100%" }}>
              <Grid container item spacing={3}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    type="text"
                    label="Title*"
                    name="title"
                    fullWidth
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <LocationForm
                    location={formState}
                    setLocation={handleFormSubmit}
                    error={errors.address}
                  />
                </Grid>

                {isMobile && (
                  <ReportMapPicker
                    formState={formState}
                    handleFormSubmit={handleFormSubmit}
                  />
                )}

                <Grid item container xs={12}>
                  <Field
                    component={Select}
                    multiple
                    formHelperText={{
                      children: "Select one or more categories",
                    }}
                    id="categories"
                    name="categories"
                    labelId="Categories"
                    label="Categories*"
                    input={
                      <OutlinedInput
                        id="categories-input"
                        label="categories*"
                        fullWidth
                      />
                    }
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    renderValue={(selected: string[]) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {selected.map((value: string) => (
                          <Chip key={value} label={JSON.parse(value).name} />
                        ))}
                      </Box>
                    )}
                    onChange={(e: any) => {
                      setOpen(false);
                      setFieldValue('categories', e.target.value)
                    }}
                    validate={(values: any[]) =>
                      values.length <= 0 ? "Required" : undefined
                    }
                  >
                    {categories &&
                      categories.map((category) => (
                        <MenuItem
                          key={category.id}
                          value={JSON.stringify(category)}
                          style={{ whiteSpace: "normal", maxWidth: 450 }}
                        >
                          {/* <Checkbox checked={values.indexOf(name) > -1} /> */}
                          <ListItemText
                            classes={{ primary: `color: red` }}
                            inset
                            primary={category.name.toUpperCase()}
                            secondary={category.description}
                          />
                        </MenuItem>
                      ))}
                  </Field>
                </Grid>

                <Grid item container xs={12}>
                  <Field
                    component={DateTimePicker}
                    sx={{ width: "100%", flexGrow: 1 }}
                    label="Date"
                    name="incidentDate"
                    maxDate={new Date()}
                    textField={{
                      helperText: "This is the date of the incident",
                    }}
                    validate={(values: Date | undefined) =>
                      !values ? "Required" : undefined
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    multiline
                    minRows={6}
                    fullWidth
                    label="Description"
                    name="description"
                    type="text"
                  />
                </Grid>
                <Grid item container justifyContent={"flex-end"} xs={12}>
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
            </FormControl>
          </Form>
        </Grid>
      )}
    </Formik>
  );
}
