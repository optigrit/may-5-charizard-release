import { Stack, Typography, Box, Button } from "@mui/material";
import TaskHeader from "../utils/TaskHeader";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

const ViewTask = ({ isParentTask, setOpen }) => {
  const title = isParentTask ? "Task Title" : "Subtask Title";
  const subtitle = isParentTask
    ? "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    : "Lorem ipsum dolor sit amet consectetur adipisicing elit dolor sit amet con";
  return (
    <Stack spacing={3} p={1}>
      <TaskHeader title={title} subtitle={subtitle} />
      <Stack
        spacing={2}
        p={3.5}
        sx={{
          bgcolor: "#f5f5f5",
          borderRadius: "10px",
          width: "100%",
          my: 2.5,
        }}
      >
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <PlayCircleOutlinedIcon sx={{ color: "#698Aff", mt: 0.3 }} />
          <Stack spacing={0.5}>
            <Typography variant="body1">
              Web Development with React JS
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ color: "grey" }}>
                Sections :{" "}
              </Typography>
              <Typography variant="body2" sx={{ color: "grey" }}>
                1, 2, 4, 6
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack mt={1} spacing={1}>
        <Stack spacing={1} direction="row">
          <Typography variant="body2">Duration :</Typography>
          <Typography variant="body2" sx={{ color: "grey" }}>
            12 h
          </Typography>
        </Stack>
        <Stack spacing={1} direction="row">
          <Typography variant="body2">Starts At :</Typography>
          <Typography
            variant="body2"
            sx={{
              color: "grey",
            }}
          >
            12:00 AM ( 04 Aug 23 )
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{ maxWidth: "fit-content", minWidth: "fit-content", px: 2 }}
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Okay
        </Button>
      </Box>
    </Stack>
  );
};

export default ViewTask;
