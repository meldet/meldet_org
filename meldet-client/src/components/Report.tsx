import * as React from "react";
import { Paper, Typography, Grid, Box, Chip } from "@mui/material";
import { format } from "date-fns";
import {ReportWithCat } from "../lib/uiDataFetching";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function Report({title, address, incidentDate, description, categories}: ReportWithCat) {
    return (
        <Paper elevation={4} sx={{ padding: 2, margin: 2, marginBottom: 4, maxWidth: '450px' }}>
            <Typography variant={"h5"} mb={1}>
              {title}
            </Typography>

            <Grid container mb={1}>
              <Grid item m={0.5} sx={{ display: "flex" }}>
                <LocationOnIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {address}
                </Typography>
              </Grid>
              <Grid item m={0.5} sx={{ display: "flex" }}>
                <EventIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {incidentDate}
                  {/* {incidentDate && format(new Date(incidentDate), "dd/MM/yyyy")} */}
                </Typography>
              </Grid>
              <Grid m={0.5} item sx={{ display: "flex" }}>
                <AccessTimeIcon />
                <Typography ml={1} mr={2} variant="caption">
                  {/* {incidentDate && format(new Date(incidentDate), "k:mm")} */}
                </Typography>
              </Grid>
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
                <Chip key={cat.name} label={cat.name} />
              ))}
            </Box>
          </Paper>
    )
}