import * as React from "react";
import { Paper, Typography, Grid, Box, Chip } from "@mui/material";
import { format } from "date-fns";
import {ReportWithCat } from "../lib/uiDataFetching";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryLabel from "./CategoryLabel";

export default function Report({title, address, incidentDate, description, categories}: ReportWithCat) {
  const [date, setDate] = React.useState<{day: String, time: string}>({day: "", time: ""})
    React.useEffect(() => {
      
      const castedIncidentDate = incidentDate as any as Date;
      if (incidentDate && castedIncidentDate) {
        try {
          // test to know incidentDate is a Date object
          const dateObj = new Date(castedIncidentDate)
          const dayString = format(dateObj, "k:mm");
          setDate({
            day: format(dateObj, "dd/MM/yyyy"),
            time: dayString == "24:00" ? "" : dayString,
          });
        } catch (err) {
          setDate({
            day: incidentDate,
            time: "",
          });
        }
      }
    }, [incidentDate])
    return (
        <Paper elevation={4} sx={{ padding: 2, margin: 2, marginBottom: 4, maxWidth: '450px' }}>
            <Typography variant={"h5"} mb={1}>
              {title.toLowerCase()}
            </Typography>

            <Grid container mb={1}>
              <Grid item m={0.5} sx={{ display: "flex" }}>
                <LocationOnIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {address}
                </Typography>
              </Grid>
              {
              date.day && <Grid item m={0.5} sx={{ display: "flex" }}>
                <EventIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {date.day}
                </Typography>
              </Grid>
              }
              {
              date.time && <Grid m={0.5} item sx={{ display: "flex" }}>
                <AccessTimeIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {date.time}
                </Typography>
              </Grid>
              }
            </Grid>
            <Typography mb={2} variant="body1">
              {description}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
              }}
            >
              {categories && categories.map((cat) => (
                <CategoryLabel key={cat.id} {...cat} onClick={(e: any) =>{}} /> // handleclick is for getting the hover feel
              ))}
            </Box>
          </Paper>
    )
}