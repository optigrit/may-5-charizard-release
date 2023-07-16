import { Box, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ViewTaskHeader from "../../components/Task/View/ViewTaskHeader";
import TaskStatusTabs from "../../components/Task/utils/TaskTabs/TaskStatusTabs";
import { useParams } from "react-router-dom";
import { TaskAPI } from "../../api/requests/tasks/taskAPI";
import { manipulateTask } from "../../Redux/Task/Task-Action";
import {
  SET_CURRENT_TASK,
  SET_SUBTASKS,
  SET_TASK_PROGRESS,
} from "../../Redux/Task/Task-Constants";
import SubtasksTab from "../../components/Task/utils/Subtask/SubtasksTab";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GetValidatedTokenData from "../../utils/helper";

const ViewTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const drawerWidth = 240;
  const { role, fetchTaskProgress } = useSelector((state) => state.TaskReducer);

  const decoded = GetValidatedTokenData();

  const setSubtasks = async () => {
    try {
      const data = await TaskAPI.getTaskData(id);
      dispatch(manipulateTask(SET_CURRENT_TASK, data));
      dispatch(manipulateTask(SET_SUBTASKS, data?.subTasks));
    } catch (err) {}
  };

  const getTaskProgress = async (taskId, userId) => {
    try {
      const data = await TaskAPI.getTaskProgress(taskId, userId);
      const status =
        data?.overAllProgress === null || data?.overAllProgress === 0
          ? "Not Started"
          : data?.overAllProgress === 100
          ? "Completed"
          : "In Progress";
      dispatch(manipulateTask(SET_TASK_PROGRESS, { ...data, status }));
    } catch (err) {}
  };

  useEffect(() => {
    setSubtasks();
    if (!role) {
      getTaskProgress(id, decoded.id);
    }
  }, [fetchTaskProgress]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#FAFBFB",
        height: "100vh",
      }}
    >
      <Stack
        spacing={2.5}
        sx={{
          width:
            role === "ADMIN" || role === "SUPERADMIN"
              ? { xs: "100%", lg: "80%", xl: "70%" }
              : "100%",
        }}
      >
        <ViewTaskHeader getTaskProgress={getTaskProgress} />
        {role === "ADMIN" || role === "SUPERADMIN" ? (
          <Stack spacing={2}>
            <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <FormatListBulletedIcon sx={{ color: "grey" }} />
              <Typography variant="h6">Subtasks</Typography>
            </Box>
            <SubtasksTab isParentTask={true} viewMode={true} />
          </Stack>
        ) : (
          <TaskStatusTabs isParentTask={false} />
        )}
      </Stack>
    </Box>
  );
};

export default ViewTask;
