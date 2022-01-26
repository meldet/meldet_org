import {
  Alert,
  Box,
  Button,
  Chip,
  FormHelperText,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as React from "react";
import { Switch } from "formik-mui";
import { ReportFormValues, ReportSteps } from "../pages/report";
import { SocialMediaConstentOptions } from "@prisma/client";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { format } from "date-fns";
import { submitReport } from "../lib/uiDataFetching";

interface IReportForm {
  formState: ReportFormValues;
  handleFormSubmit: (formValues: ReportFormValues) => void;
  handleStepChange: (step: ReportSteps) => void;
}

export default function ReportReview({
  formState,
  handleStepChange,
}: IReportForm) {
  const [responseStatus, setResponseStatus] = React.useState(0);
  const handleBackClick = () => {
    handleStepChange("report");
  };
  return (
    <Formik
      initialValues={{ ...formState }}
      validate={(values) => {
        const errors: any = {};
        if (!values.canIdentifyOffenders) {
          errors.canIdentifyOffenders = "Required";
        } else if (!values.address) {
          errors.address = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const {
          canIdentifyOffenders,
          address,
          lat,
          lng,
          categories,
          description,
          incidentDate,
          isPrivate,
          socialMediaConsent,
          title,
          ...rest
        } = values;

        const response = await submitReport({
          // ...rest,
          address,
          lat,
          lng,
          title,
          description,
          isPrivate,
          incidentDate: incidentDate.toISOString(),
          socialMediaConsent: socialMediaConsent
            ? SocialMediaConstentOptions.ACCEPTED
            : SocialMediaConstentOptions.DECLINED,
          categories: categories.map((str) => JSON.parse(str).id),
        });
        
        console.log(response);
        setResponseStatus(response.status);
        if (response.status < 300) {
          handleStepChange("success");
        }
        // TODO: Error handling, clean up in seperate file

        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, errors }) => (
        <Form>
          <Typography variant="h4" component="h1" gutterBottom ml={2}>
            review
          </Typography>
          <Paper elevation={4} sx={{ padding: 2, margin: 2, marginBottom: 4, maxWidth: '450px' }}>
            <Typography variant={"h5"} mb={1}>
              {formState.title}
            </Typography>

            <Grid container mb={1}>
              <Grid item m={0.5} sx={{ display: "flex" }}>
                <LocationOnIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {formState.address}
                </Typography>
              </Grid>
              <Grid item m={0.5} sx={{ display: "flex" }}>
                <EventIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {format(formState.incidentDate, "dd/MM/yyyy")}
                </Typography>
              </Grid>
              <Grid m={0.5} item sx={{ display: "flex" }}>
                <AccessTimeIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {format(formState.incidentDate, "k:mm")}
                </Typography>
              </Grid>
            </Grid>
            <Typography mb={2} variant="body1">
              {formState.description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {formState.categories.map((value: string) => (
                <Chip key={value} label={JSON.parse(value).name} />
              ))}
            </Box>
          </Paper>
          <Field component={Switch} type="checkbox" name="socialMediaConsent" />
          Allowed to publish on social media
          <br />
          <Field component={Switch} type="checkbox" name="isPrivate" />
          I don&apos;t want this to be visible on the website
          <br />
          <Field
            component={Switch}
            type="checkbox"
            name="canIdentifyOffenders"
          />
          No offenders can be identified from my report
          <FormHelperText sx={{marginLeft: 2}}>{errors.canIdentifyOffenders && "Required"}</FormHelperText>
          <br />
          {isSubmitting && <LinearProgress />}
          {responseStatus >= 300 && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error" onClose={() => {}}>
                Shit, we got a {responseStatus} response from the server. Failed
                to save your report.
              </Alert>
            </Stack>
          )}
          <Box display={"flex"} justifyContent={"flex-end"} m={2}>

          <Button
            variant="outlined"
            disabled={isSubmitting}
            onClick={handleBackClick}
            >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
            sx={{marginLeft: 1}}
            >
            Submit
          </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
