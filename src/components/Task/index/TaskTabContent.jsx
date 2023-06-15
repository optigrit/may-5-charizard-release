import { Grid } from "@mui/material";
import TaskCard from "./TaskCard";

const TaskTabContent = ({ tasks, isParentTask }) => {
  return (
    <Grid container spacing={2} >
      {tasks.map((task) => {
        return (
          <Grid item  xs={12} md={6} lg={4} xxl={3}>
            <TaskCard isParentTask={isParentTask} task={task}/>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TaskTabContent;
