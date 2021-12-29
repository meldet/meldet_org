import { Alert, Button, LinearProgress, Stack } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as React from "react";
import { Switch } from "formik-mui";
import { ReportFormValues, ReportSteps } from "../pages/report";
import { SocialMediaConstentOptions } from "@prisma/client";



interface IReportForm {
    formState: ReportFormValues;
    handleFormSubmit: (formValues: ReportFormValues) => void
    handleStepChange: (step: ReportSteps) => void
}

export default function ReportReview({formState, handleFormSubmit, handleStepChange}: IReportForm) {
  const [responseStatus, setResponseStatus] = React.useState(0)
  const handleBackClick = () => {
    handleStepChange("report")

  }
  return (
    <Formik
      initialValues={{ ...formState }}
      onSubmit={async (values, { setSubmitting }) => {
        const { canIdentifyOffenders, ...rest } = values;
        const body = JSON.stringify({
          ...rest,
          incidentDate: values.incidentDate.toISOString(),
          socialMediaConsent: values.socialMediaConsent
            ? SocialMediaConstentOptions.ACCEPTED
            : SocialMediaConstentOptions.DECLINED,
          categories: values.categories.map(str => JSON.parse(str).id)
        });

        const response = await fetch("http://localhost:3000/api/report", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
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
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field component={Switch} type="checkbox" name="socialMediaConsent" />
          Allowed to publish on social media
          <br />
          <Field
            component={Switch}
            type="checkbox"
            name="canIdentifyOffenders"
          />
          No offenders can be identified from my report
          <br />
          <Field component={Switch} type="checkbox" name="isPrivate" />
          I don&apos;t want this to be visible on the website
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
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
