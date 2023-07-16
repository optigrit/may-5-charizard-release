import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import TaskModal from "../TaskModal";
import TextEditor from "../TextEditor";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ButtonOkay from "./ButtonOkay";
import { useSelector } from "react-redux";

const ButtonViewText = (props) => {
  const [open, setOpen] = useState(false);
  const {role} = useSelector((state) => state.TaskReducer)
  return (
    <Box>
      <Button
        variant= {(role === "ADMIN" || role === "SUPERADMIN") ? "outlined" : "text"}
        sx={{ textTransform: "none !important" }}
        size="small"
        endIcon={<ChevronRightIcon />}
        onClick={() => setOpen(true)}
      >
        View Text
      </Button>
      <TaskModal
        open={open}
        setOpen={setOpen}
        title="Assignment Details"
      >
        <Stack sx={{ height: "100%" }} spacing={2}>
        <Typography 
            sx={{
              border: `0.5px solid ${props.fileRequired? "#6ad4bc": "#bdbdbd"}`,
              px: 0.8,
              py: 0.2,
              width: "fit-content",
              fontSize: "13px",
              borderRadius: "4px",
              color: `${props.fileRequired? "#6ad4bc": "#bdbdbd"}`
            }}
          >
            {props.fileRequired? "File Required": "No File Required"}
          </Typography>
          <TextEditor displayValue={props.displayValue} />
          <ButtonOkay setOpen={setOpen} />
        </Stack>
      </TaskModal>
    </Box>
  );
};

export default ButtonViewText;
