import { Stack, Grid } from "@mui/material";
import TaskCard from "./TaskCard";

const TaskTabContent = ({ tasks }) => {
  return (
    <Grid container spacing={2} >
      {tasks.map((task) => {
        return (
          <Grid item  xs={12} md={6} lg={4} xxl={3}>
            <TaskCard task={task}/>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TaskTabContent;
