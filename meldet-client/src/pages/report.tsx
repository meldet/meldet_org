import * as React from "react";
import Navigation from "../components/Navigation";
import { Grid } from "@mui/material";
import ReportForm from "../components/ReportForm";
import { useRouter } from "next/router";
import { Category, Report as ReportModel } from "@prisma/client";
import ReportReview from "../components/ReportReview";
import ReportFormSuccess from "../components/ReportFormSuccess";
import { fetchCategories } from "../lib/helpers";
import { GetStaticProps } from "next";
import { UiContext } from "../lib/context";
import ReportMapPicker from "../components/ReportMapPicker";
import { randomKey } from "../components/LocationForm";

export type ReportSteps = 'report' | 'review' | 'contact' | 'success' // TODO: this could become an enum, but it might prove a bit tricky

export type ReportFormValues = Omit<ReportModel, "id" | "statusChanges" | "createdAt" | "incidentDate" | "socialMediaConsent"> & {
  canIdentifyOffenders: boolean,
  incidentDate: Date
  socialMediaConsent: boolean
  categories: string[]
  key: string
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
  key: randomKey()
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

  const handleFormSubmit = (formValues: Partial<ReportFormValues>) => {
    setFormState({...formState, ...formValues})
  }



    return (
      <UiContext.Consumer>
        {({ isMobile }) => (
          <Grid container flexDirection="column">
            <Navigation />

            <Grid container flexDirection={"row"} flexWrap={"wrap"}>
              {step == "report" && (
                <ReportForm
                  formState={formState}
                  handleFormSubmit={handleFormSubmit}
                  handleStepChange={handleStepChange}
                  categories={categories}
                  isMobile={isMobile}
                />
              )}
              {step == "review" && (
                <ReportReview
                  formState={formState}
                  handleFormSubmit={handleFormSubmit}
                  handleStepChange={handleStepChange}
                />
              )}
              {step == "success" && <ReportFormSuccess />}
              {!isMobile && step == "report" && (
                <ReportMapPicker
                  formState={formState}
                  handleFormSubmit={handleFormSubmit}
                  // handleStepChange={handleStepChange}
                />
              )}
            </Grid>
          </Grid>
        )}
      </UiContext.Consumer>
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
