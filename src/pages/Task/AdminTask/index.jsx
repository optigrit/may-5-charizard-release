import { Stack, Typography } from "@mui/material";
import TaskStatusTabs from "../../../components/Task/index/TaskStatusTabs";

const AdminTask = () => {
  const drawerWidth = 240;
  const tasks = [1,2,3,4,5,6,6,7,8,9,10]
  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#FAFBFB",
        minHeight: "100vh",
        p:2
      }}
    >
      <Stack
        spacing={1}
        sx={{ textAlign: "start", width: "100%" }}
      >
        <Typography variant="h5">Tasks</Typography>
        <Typography sx={{ color: "grey" }} variant="subtitle1">
          Find all your created tasks listed below
        </Typography>
      </Stack>

      <TaskStatusTabs tasks={tasks} isParentTask={true} />
    </Stack>
  );
};

export default AdminTask;
