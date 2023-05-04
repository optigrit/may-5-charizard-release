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

export default function LinearProgressWithLabelReusable({ progressCount }) {
  const [progress, setProgress] = React.useState(progressCount);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

  return (
    <Box sx={{ width: "24%",display:{xs:"none",sm:"block"} }}>
        <Typography variant="subtitle2" sx={{fontWeight:"400"}}>Your Progress</Typography>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
