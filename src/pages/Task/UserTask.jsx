import { Box } from "@mui/material";

const UserTask = () => {
  const drawerWidth = 240;
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
      Assigned Tasks
    </Box>
  );
};

export default UserTask;
