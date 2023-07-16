import { Stack, Typography } from "@mui/material";
import TaskHeader from "../../components/Task/utils/TaskHeader";
import TaskSubTabs from "../../components/Task/CreateAndEdit/TaskSubTabs";
import { useState, useEffect } from "react";
import { TaskAPI } from "../../api/requests/tasks/taskAPI";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { manipulateTask } from "../../Redux/Task/Task-Action";
import { SET_SUBTASKS } from "../../Redux/Task/Task-Constants";
import UtilFunctions from "../../components/Task/utils/UtilFunctions";
import SideBarResponsive from "../../components/SideBarResponsive";

const CreateEditTask = () => {
  const drawerWidth = 240;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        const data = await TaskAPI.getTaskData(id);
        setTaskData(data[0]);
        dispatch(manipulateTask(SET_SUBTASKS, data?.subTasks));
      } catch (err) {}
    };
    getTaskData();
  }, [dispatch, id]);

  return (
   <>
   <SideBarResponsive/>
   <Stack
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#fff",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Stack sx={{ width: { xs: "100%", lg: "85%", xl: "70%" } }}>
        <TaskHeader title={taskData?.title} subtitle={taskData?.description} />
        <Stack
          mt={2}
          sx={{ gap: "8px" }}
          direction={{ md: "row" }}
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">Duration : </Typography>
            <Typography variant="body2" sx={{ color: "grey" }}>
              {UtilFunctions.convertDuration(taskData?.duration)}{" "}
              {taskData.duration >= 86400 ? "days" : "hours"}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body2">Starts At : </Typography>
            <Typography variant="body2" sx={{ color: "grey" }}>
              {UtilFunctions.parseEpochTime(taskData?.startsAt)} (
              {UtilFunctions.parseEpochDate(taskData?.startsAt)})
            </Typography>
          </Stack>
        </Stack>
        <TaskSubTabs />
      </Stack>
    </Stack>
   </>
  );
};

export default CreateEditTask;
