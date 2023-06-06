import { Stack, Divider } from "@mui/material";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";

const TaskCard = ({ task }) => {
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
      <CardHeader task={task} />
      <CardContent task={task} />
      <Divider />
      <CardFooter task={task} />
    </Stack>
  );
};

export default TaskCard;
