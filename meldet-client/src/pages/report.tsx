import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Navigation from "../components/Navigation";
import { Grid } from "@mui/material";
import ReportForm from "../components/ReportForm";
import { useRouter } from "next/router";
import { Category, Report as IReport } from "@prisma/client";
import ReportReview from "../components/ReportReview";

export type ReportSteps = 'report' | 'review' | 'contact' | 'success' // TODO: this could become an enum, but it might prove a bit tricky

export type ReportFormValues = Omit<IReport, "id" | "statusChanges" | "createdAt" | "incidentDate" | "socialMediaConsent"> & {
  canIdentifyOffenders: boolean,
  incidentDate: Date
  socialMediaConsent: boolean
};

const reportFormDefault = {
  address: "",
  lat: '',
  lng: '',
  title: "",
  categories: [],
  incidentDate: new Date(),
  description: "",
  socialMediaConsent: false,
  canIdentifyOffenders: false,
  isPrivate: false,
};

export default function Report() {
  // Logic for steps
  const {step: stepQuery} = useRouter().query
  const [step, setStep] = React.useState<ReportSteps>('report')
  React.useEffect(() => {
    if (stepQuery == 'report' || stepQuery == 'review' || stepQuery == 'contact') {
      setStep(stepQuery)
    }
  }, [stepQuery])
  const handleStepChange = (step: ReportSteps) => {
    setStep(step)
  }

  const [formState, setFormState] = React.useState<ReportFormValues>(reportFormDefault);

  const handleFormSubmit = (formValues: ReportFormValues) => {
    setFormState({...formValues})
  }



    return (
      <Grid container flexDirection="column">
        <Navigation />
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Report step {step}
          </Typography>
          {step == "report" && (
            <ReportForm
              formState={formState}
              handleFormSubmit={handleFormSubmit}
              handleStepChange={handleStepChange}
            />
          )}
          {step == "review" && (
            <ReportReview
              formState={formState}
              handleFormSubmit={handleFormSubmit}
              handleStepChange={handleStepChange}
            />
          )}
        </Box>
      </Grid>
    );
}
