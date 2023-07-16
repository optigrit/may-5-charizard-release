import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import TaskStatusTabs from "../../components/Task/utils/TaskTabs/TaskStatusTabs";
import { TaskAPI } from "../../api/requests/tasks/taskAPI";
import { useDispatch, useSelector } from "react-redux";
import { manipulateTask } from "../../Redux/Task/Task-Action";
import { SET_TASKS } from "../../Redux/Task/Task-Constants";

const Task = () => {
  const drawerWidth = 240;
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.TaskReducer);
  
  useEffect(() => {
    // API call for getting all tasks
    const getAllTasks = async () => {
      try {
        const data =
          role === "ADMIN" || role === "SUPERADMIN"
            ? await TaskAPI.getCreatedTasks(1)
            : await TaskAPI.getAssignedTasks();
        dispatch(manipulateTask(SET_TASKS, data));
      } catch (err) {}
    };
    getAllTasks();
  }, [dispatch, role]);

  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#FAFBFB",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Stack spacing={1} sx={{ textAlign: "start", width: "100%" }}>
        <Typography variant="h5">Tasks</Typography>
        <Typography sx={{ color: "grey" }} variant="subtitle1">
          Find all your created tasks listed below
        </Typography>
      </Stack>
      <TaskStatusTabs isParentTask={true} />
    </Stack>
  );
};

export default Task;
