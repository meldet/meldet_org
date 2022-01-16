import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Alert,
  FormHelperText,
  Grid,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Navigation from "../components/Navigation";
import { sendEmail } from "../lib/uiDataFetching";

interface ContactFormValues {
  sender: string;
  body: string;
}
const initialValues: ContactFormValues = { sender: "", body: "" };

const getError = (value: string, field: "sender" | "body") => {
  let error = "";
  if (field == "sender") {
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
      error = `Not a valid email address`;
  } else if (field == "body") {
    if (!value) {
      error = "Required";
    } else if (value.length < 6) {
      error = "this message is a bit short, no?";
    }
  }
  return error;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formValues, setFormValues] =
    React.useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = React.useState<ContactFormValues>(initialValues);
  const [responseStatus, setResponseStatus] = React.useState<number>(NaN);
  const [responseError, setResponseError] = React.useState("");

  const handleChange = (value: string, field: "sender" | "body") => {
    const newValues = { ...formValues };
    newValues[field] = value;
    setFormValues(newValues);

    const newErrors = { ...errors };
    newErrors[field] = getError(value, field);
    setErrors(newErrors);
  };

  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setResponseStatus(NaN);
  };

  const handleSubmit = async () => {
    if (errors.body || errors.sender) return;
    setIsSubmitting(true);
    const { status, error } = await sendEmail({
      body: formValues.body,
      sender: formValues.sender,
    });
    setResponseStatus(status);
    setResponseError(error);
    if (!error && status < 300) {
      setFormValues({ ...initialValues });
    }
    setIsSubmitting(false);
  };
  return (
    <Grid container flexDirection="column">
      <Navigation />
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom ml={2}>
          Contact us
        </Typography>
        {
          // let errors: {sender: string, body: string} = {sender: "", body: ""}
          // if (!values.sender) {errors.sender = "Required"}
          // else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.sender)
          // ) {
          //   errors.sender = "Invalid email address";
          // } else if (!values.body) {
          //   errors.body = "Required"
          // } else if (values.body.length < 5) {
          //   errors.body = `An email with less than ${values.body.length} characters? Weird.`
          // }
        }

        <Box sx={{ p: 2, m: 0, width: "100%" }}>
          <TextField
            type="text"
            label="Your email address"
            name="sender"
            fullWidth
            autoFocus
            required
            margin="normal"
            value={formValues.sender}
            error={!!errors.sender}
            onChange={(e: any) => {
              handleChange(e.target.value, "sender");
            }}
          />
          <TextField
            multiline
            minRows={6}
            fullWidth
            required
            label="Message"
            name="body"
            type="text"
            margin="normal"
            value={formValues.body}
            error={!!errors.body}
            helperText={errors.body}
            onChange={(e: any) => {
              handleChange(e.target.value, "body");
            }}
          />
          <Stack sx={{ width: "100%" }} spacing={2}>
            {responseStatus >= 300 && (
              <Alert severity="error" onClose={handleCloseSnack}>
                Shit, we got a {responseStatus} response from the server.{" "}
                {responseError}
              </Alert>
            )}
            </Stack>
            <Snackbar
              open={responseStatus < 300}
              autoHideDuration={4000}
              onClose={handleCloseSnack}
              message="Message sent"
            />
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isSubmitting}
            disabled={
              isSubmitting ||
              !formValues.body ||
              !formValues.sender ||
              !!errors.body ||
              !!errors.sender
            }
            onClick={handleSubmit}
          >
            Send
          </LoadingButton>

        </Box>
      </Box>
    </Grid>
  );
}
