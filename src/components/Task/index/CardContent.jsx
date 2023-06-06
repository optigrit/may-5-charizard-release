import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { Stack, Typography } from "@mui/material";

const CardContent = ({task}) => {
  return (
    <Stack spacing={0.5} sx={{ color: "grey" }}>
      <Stack spacing={1.5} direction="row" alignItems="center">
        <PlayCircleOutlinedIcon sx={{ color: "#698AFF", fontSize: "22px" }} />
        <Typography variant="body2">{task.courses.length} courses</Typography>
      </Stack>
      <Stack spacing={1.5} direction="row" alignItems="center">
        <ComputerOutlinedIcon sx={{ color: "#698AFF", fontSize: "22px" }} />{" "}
        <Typography variant="body2">{task.contests.length} contests</Typography>
      </Stack>
    </Stack>
  );
};

export default CardContent;
