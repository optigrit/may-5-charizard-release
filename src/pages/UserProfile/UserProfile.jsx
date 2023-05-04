import { Box } from "@mui/system";
import React from "react";
import RankChart from "../../components/RankChart";
import SideBarResponsive from "../../components/SideBarResponsive";

const UserProfile = () => {
  const drawerWidth = 240;
  return (
    <>
      <SideBarResponsive />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >

      <h1>UserProfile page</h1>
      <RankChart/>
      </Box>
    </>
  );
};
export default UserProfile;
