import { useState } from "react";
import FormInput from "./FormInput";
import inputs from "./InputList";
import { Grid, Stack, Typography, Button } from "@mui/material";
import style from "./FormInput.module.css";

const TaskForm = ({ editMode, isParentTask, handleSubmit }) => {
  const [details, setDetails] = useState({
    title: null,
    duration: null,
    startDate: null,
    startTime: null,
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDetails((details) => ({ ...details, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {inputs.map((input) => (
          <Grid item xs={12} md={6}>
            <FormInput
              {...input}
              value={details[input.name]}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle2" sx={{ ml: 1.5, color: "grey" }}>
              Description
            </Typography>
            <textarea
              className={style.formInput}
              style={{ height: "180px", fontSize: "16px" }}
              placeholder="What is this task about?"
              name="description"
            ></textarea>
          </Stack>
        </Grid>
      </Grid>
      <Stack my={3} alignItems="flex-end">
        <Button
          type="submit"
          variant="contained"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Save and Proceed
        </Button>
      </Stack>
    </form>
  );
};

export default TaskForm;
