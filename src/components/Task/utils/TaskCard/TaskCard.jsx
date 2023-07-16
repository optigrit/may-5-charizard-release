import { Stack, Divider } from "@mui/material";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import CardFooter from "./CardFooter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TaskCard = ({ task, isParentTask, subtaskCount }) => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.TaskReducer);

  const handleNavigate = () => {
    if (isParentTask && !role) {
      navigate(`/task/${task.id}`);
    }
  };

  return (
    <Stack
      onClick={handleNavigate}
      spacing={2.2}
      sx={{
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: "10px",
        p: 3,
        height: "100%",
        cursor: !role && isParentTask && "pointer",
      }}
    >
      <CardHeader role={role} isParentTask={isParentTask} task={task} />
      <CardContent
        isParentTask={isParentTask}
        task={task}
        subtaskCount={subtaskCount}
      />
      <Divider />
      <CardFooter isParentTask={isParentTask} task={task} />
    </Stack>
  );
};

export default TaskCard;
