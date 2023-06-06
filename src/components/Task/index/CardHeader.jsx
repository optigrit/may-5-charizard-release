import { Stack, Chip, Typography } from "@mui/material";
import TaskMenu from "../utils/TaskMenu";

const CardHeader = ({ task }) => {
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Chip
          sx={{ color: `${task.chipColor}`, bgcolor: `${task.chipbg}` }}
          label="category"
        />
        <TaskMenu task={task} isParentTask={true} />
      </Stack>
      <Stack>
        <Typography variant="h6">Task Title</Typography>
        <Typography variant="body1" sx={{ color: "grey" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
          delectus.
        </Typography>
      </Stack>
    </>
  );
};

export default CardHeader;
