import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const ViewTask = () => {
  const drawerWidth = 240;
  const task = useSelector((state) => state.TaskReducer.currentTask);
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
     <Typography>Task Title</Typography>
     <Typography>Courses: {task && task.courses.length}</Typography>
     <Typography>Contests: {task && task.contests.length}</Typography>
     <Typography>Users: {task && task.users.length}</Typography>
    </Box>
  );
};

export default ViewTask;
