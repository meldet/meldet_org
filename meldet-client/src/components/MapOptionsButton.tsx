import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import theme from "../theme";

const MapOptionsButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  borderColor: "white",
  color: "white",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

export default MapOptionsButton
