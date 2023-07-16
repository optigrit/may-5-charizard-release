import { Stack, Box } from "@mui/material";
import TaskHeader from "../TaskHeader";
import ButtonAddNew from "../../CreateAndEdit/ButtonAddNew";
import { useState } from "react";
import { TaskAPI } from "../../../../api/requests/tasks/taskAPI";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SubtaskList from "./SubtaskList";

const SubtasksTab = ({ isParentTask, viewMode }) => {
  const { id } = useParams();
  const typeColors = {
    course: {
      color: "#ba68c8",
      border: "#f3e5f5",
    },
    contest: {
      color: "#ffc107",
      border: "#ffecb3",
    },
    text: {
      color: "#f06292",
      border: "#fce4ec",
    },
  };

  const [subTasksData, setSubTasksData] = useState([]);
  const getAllSubTasks = async () => {
    try {
      const data = await TaskAPI.getTaskData(id);
      setSubTasksData(data.subTasks);
    } catch (err) {}
  };

  useEffect(() => {
    getAllSubTasks();
  }, []);



  return (
    <Stack spacing={{ xs: 2, md: 2.5 }}>
      {!viewMode && (
        <Stack
          mb={2}
          direction={{ xs: "column-reverse", md: "row" }}
          justifyContent="space-between"
          alignItems={{ md: "center" }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <TaskHeader subtitle="Here is a list of all the subtasks you've created" />
          </Box>
          <ButtonAddNew display="flex" isParentTask={isParentTask} />
        </Stack>
      )}

      <SubtaskList
        isParentTask={isParentTask}
        subTasksData={subTasksData}
        typeColors={typeColors}
        viewMode={viewMode}
      />
    </Stack>
  );
};

export default SubtasksTab;
