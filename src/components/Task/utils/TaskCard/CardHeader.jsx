import { Stack,  Typography } from "@mui/material";
import TaskMenu from "../TaskMenu";

const CardHeader = ({ task, isParentTask, role }) => {
  return (
    <>
      {isParentTask && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {(role === "ADMIN" || role === "SUPERADMIN") && <TaskMenu task={task} isParentTask={isParentTask} />}
        </Stack>
      )}
      <Stack>
        <Typography variant="h6">{task?.title}</Typography>
      </Stack>
    </>
  );
};

export default CardHeader;
