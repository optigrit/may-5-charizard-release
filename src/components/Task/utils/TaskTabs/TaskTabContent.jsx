import { CircularProgress, Grid, Stack } from "@mui/material";
import TaskCard from "../TaskCard/TaskCard";

const TaskTabContent = ({ tasks, subtasks, isParentTask }) => {
  const taskArray = isParentTask ? tasks : subtasks;
if (!taskArray){
  return <Stack sx={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
    <CircularProgress/>
  </Stack>
}

  return (
    <Grid container spacing={2}>
      {taskArray?.map((task) => {
        return (
          <Grid item xs={12} md={6} xl={4} xxl={3}>
            <TaskCard isParentTask={isParentTask} task={task} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TaskTabContent;
