import { Stack, Typography } from "@mui/material";
import TaskHeader from "../../../components/Task/utils/TaskHeader";
import TaskSubTabs from "../../../components/Task/CreateAndEdit/TaskSubTabs";

const CreateTask = () => {
  const drawerWidth = 240;

  return (
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
        <TaskHeader
          title="Task Title"
          subtitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo eligendi doloremque, incidunt eius quo"
        />
        <Stack mt={2} spacing={1} direction={{md: "row"}} justifyContent="space-between" >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">Duration : </Typography>
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              2 days
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">Starts At : </Typography>
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              12:00 AM ( 04 Aug 23 )
            </Typography>
          </Stack>
        </Stack>
        <TaskSubTabs />
      </Stack>
    </Stack>
  );
};

export default CreateTask;
