import TaskForm from "../utils/TaskForm";
import { Stack, Divider, Button } from "@mui/material";
import TaskHeader from "../utils/TaskHeader";
import { useState } from "react";
import AddSubTask from "./AddSubTask";
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const AddTaskDetails = ({ setOpen, editMode, isParentTask }) => {
  const [active, setActive] = useState("taskForm");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isParentTask) navigate("/create-task");
    else if (active === "taskForm") setActive("subtaskDetails");
  };

  const title = isParentTask
    ? editMode
      ? "Edit Task"
      : "Create Task"
    : editMode
    ? "Edit Subtask"
    : "Create Subtask";
  const subtitle = isParentTask
    ? editMode
      ? "Edit the details of the task"
      : "Assign new task to the participants here"
    : editMode
    ? "Edit the subtask details for current task"
    : "Add subtask details for the current task";

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      <Stack direction="row" justifyContent="space-between">
        <TaskHeader title={title} subtitle={subtitle} />
        <CloseOutlinedIcon
          onClick={() => setOpen(false)}
          sx={{ color: "grey", cursor: "pointer" }}
        />
      </Stack>
      <Divider />
      {active === "taskForm" && (
        <TaskForm
          editMode={editMode}
          isParentTask={isParentTask}
          handleSubmit={handleSubmit}
        />
      )}
      {active === "subtaskDetails" && (
        <>
          <AddSubTask />
          <Stack mt={5} alignItems="flex-end">
            <Stack direction="row" spacing={1}>
              <Button 
                onClick={() => setActive("taskForm")}
                variant="outlined"
                disableRipple
              >
                Back
              </Button>
              <Button type="submit" variant="contained" disableRipple>
                Submit
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default AddTaskDetails;
