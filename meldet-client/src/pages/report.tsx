import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Navigation from "../components/Navigation";
import { Grid, Paper } from "@mui/material";
import ReportForm from "../components/ReportForm";
import { useRouter } from "next/router";
import { Category, Report as ReportModel } from "@prisma/client";
import ReportReview from "../components/ReportReview";
import ReportFormSuccess from "../components/ReportFormSuccess";
import { fetchCategories } from "../lib/helpers";
import { GetStaticProps } from "next";

export type ReportSteps = 'report' | 'review' | 'contact' | 'success' // TODO: this could become an enum, but it might prove a bit tricky

export type ReportFormValues = Omit<ReportModel, "id" | "statusChanges" | "createdAt" | "incidentDate" | "socialMediaConsent"> & {
  canIdentifyOffenders: boolean,
  incidentDate: Date
  socialMediaConsent: boolean
  categories: string[]
};

const reportFormDefault = {
  address: "",
  lat: '',
  lng: '',
  title: "",
  categories: [],
  incidentDate: new Date(),
  description: "",
  socialMediaConsent: true  ,
  canIdentifyOffenders: false,
  isPrivate: false,
};

interface IReport {
  categories: Category[];
  notFound?: boolean;
}

export default function Report({categories}: IReport) {
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
          <Paper>

          {step == "report" && (
            <ReportForm
            formState={formState}
            handleFormSubmit={handleFormSubmit}
            handleStepChange={handleStepChange}
            categories={categories}
            />
            )}
          {step == "review" && (
            <ReportReview
            formState={formState}
            handleFormSubmit={handleFormSubmit}
            handleStepChange={handleStepChange}
            />
            )}
          {
            step == "success" && (
              <ReportFormSuccess />
              )
            }
            </Paper>
        </Box>
      </Grid>
    );
}

export const getStaticProps: GetStaticProps = async ({}) => {
  const categories = await fetchCategories();

  if (!categories) {
    return {
      notFound: true,
      revalidate: 60 * 15,
    };
  }

  return {
    props: { categories },
    revalidate: 60 * 15, // rebuild the site every 15 minutes with the latest data
  };
};
