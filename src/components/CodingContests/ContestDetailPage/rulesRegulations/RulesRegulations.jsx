import React from "react";
import { ContainerOfTitle } from "../../../../Style/VideoSlider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import StarIcon from "@mui/icons-material/Star";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion } from "@mui/material";

const RulesRegulations = ({ rules }) => {
  return (
    <>
      <Accordion
        defaultExpanded={true}
        sx={{ boxShadow: "none", marginTop: "32px!important" }}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#FAFCFE",
            minHeight: { xs: "48px!important", md: "58px!important" },
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "500", fontSize: { xs: "16px", md: "20px" } }}
          >
            Rules and Regulations
          </Typography>{" "}
          {/*title of the container*/}
        </AccordionSummary>
        <AccordionDetails
          sx={{ border: "1px solid #e5e5e5", px: "0px", pb: 1 }}
        >
          <List sx={{ p: "0px" }}>
            {rules.map((point, index) => {
              return (
                <ListItem key={index}>
                  <StarIcon
                    sx={{ color: "#e5e5e5", fontSize: "16px" }}
                    mr={1}
                  />
                  <Typography
                    ml={1}
                    sx={{
                      fontSize: { xs: "12px", md: "13px" },
                      lineHeight: "18px",
                      textTransform: { xs: "none", md: "uppercase" },
                      fontWeight: "200",
                    }}
                    variant="body2"
                  >
                    {point}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default RulesRegulations;
