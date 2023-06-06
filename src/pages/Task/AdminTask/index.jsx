import { Stack, Typography } from "@mui/material";
import TaskStatusTabs from "../../../components/Task/index/TaskStatusTabs";

const AdminTask = () => {
  const drawerWidth = 240;

  return (
    <Stack
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: "#FAFBFB",
        minHeight: "100vh",
      }}
    >
      <Stack
        spacing={1}
        sx={{ textAlign: "start", width: "100%", p: 2, pb: 0 }}
      >
        <Typography variant="h5">Tasks</Typography>
        <Typography sx={{ color: "grey" }} variant="subtitle1">
          Find all your created tasks listed below
        </Typography>
      </Stack>

      <TaskStatusTabs />
    </Stack>
  );
};

export default AdminTask;
