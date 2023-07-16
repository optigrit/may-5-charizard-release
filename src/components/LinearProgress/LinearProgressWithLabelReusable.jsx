import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearProgressWithLabelReusable({ progressCount, displayTitle, display }) {
  return (
    <Box
      sx={{
        width: "250px",
        display: { xs: display? display: "none", sm: "block" },
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "400", display: displayTitle }}>
        Your Progress
      </Typography>
      <LinearProgressWithLabel value={progressCount} />
    </Box>
  );
}
