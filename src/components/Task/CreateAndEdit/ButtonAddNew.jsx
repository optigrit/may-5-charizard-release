import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import TaskModal from "../utils/TaskModal";
import AddTaskDetails from "./AddTaskDetails";

const ButtonAddNew = ({ isParentTask }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: { xs: "100%", md: "auto" },
      }}
    >
      <Button
        disableRipple
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ width: "100%" }}
      >
        Add New
      </Button>
      <TaskModal open={open} setOpen={setOpen}>
        <AddTaskDetails setOpen={setOpen} isParentTask={isParentTask} />
      </TaskModal>
    </Box>
  );
};

export default ButtonAddNew;
