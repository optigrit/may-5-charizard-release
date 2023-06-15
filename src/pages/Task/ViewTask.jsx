import {
  Box,
  Typography,
  Stack,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ViewTaskHeader from "../../components/Task/View/ViewTaskHeader";
import TaskStatusTabs from "../../components/Task/index/TaskStatusTabs";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";

const ViewTask = () => {
  const drawerWidth = 240;
  const task = useSelector((state) => state.TaskReducer.currentTask);
  const subtasks = [
    {
      type: "course",
      title: "Web Development with React JS",
      sections: "1, 2, 4, 7",
    },
    {
      type: "contest",
      title: "Title of The Contest",
      minScore: 400,
    },
    {
      type: "text",
    },

  ]
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
      <Stack spacing={2.5} sx={{ width: "100%" }}>
        <ViewTaskHeader />
        <Stack spcing={1.5}>
          {/* <Stack direction="row" alignItems="center" spacing={1} >
            <FormatListBulletedOutlinedIcon  />
            <Typography variant="h5" sx={{fontSize: "1.45rem"}} >Subtasks</Typography>
          </Stack> */}
          <TaskStatusTabs role="user" isParentTask={false} tasks={subtasks} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ViewTask;
