import { Stack, Chip, Typography } from "@mui/material";
import TaskMenu from "../utils/TaskMenu";

const CardHeader = ({ task, isParentTask }) => {
  return (
    <>
      {isParentTask && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip
            sx={{ color: `${task.chipColor}`, bgcolor: `${task.chipbg}` }}
            label={isParentTask ? "category" : "TYPE"}
          />
          <TaskMenu task={task} isParentTask={isParentTask} />
        </Stack>
      )}
      <Stack>
        <Typography variant="h6">Title</Typography>
        <Typography variant="body1" sx={{ color: "grey" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
          delectus.
        </Typography>
      </Stack>
    </>
  );
};

export default CardHeader;
