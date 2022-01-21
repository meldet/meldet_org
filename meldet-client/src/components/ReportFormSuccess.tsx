import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "./Link";


export default function ReportFormSuccess() {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom ml={2}>
        report step
      </Typography>
      form successfully submitted
      <Button>
        <Link href={"/"}>home</Link>
      </Button>
    </div>
  );
}
