import { Stack, Divider } from "@mui/material";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

const TaskCard = ({ task, isParentTask }) => {
  return (
    <Stack
      spacing={2.2}
      sx={{
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: "10px",
        p: 3,
        height: "100%",
      }}
    >
      <CardHeader isParentTask={isParentTask} task={task} />
      <CardContent isParentTask={isParentTask} task={task} />
      <Divider />
      <CardFooter isParentTask={isParentTask} task={task} />
    </Stack>
  );
};

export default TaskCard;
