import { useState } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { manipulateTask } from "../../../../../Redux/Task/Task-Action";
import { CHANGE_POST_DATA } from "../../../../../Redux/Task/Task-Constants";
import { TaskAPI } from "../../../../../api/requests/tasks/taskAPI";

export default function SelectStatus({ subtaskId, fileRequired }) {
  const dispatch = useDispatch();
  const { subtaskPostData } = useSelector((state) => state.TaskReducer);
  const options = ["Completed", "Ongoing", "Not Started"];
  const [status, setStatus] = useState("");
  
  const postSubtaskData = async (postData) => {
    delete postData.submitted
    await TaskAPI.submitSubtask(subtaskId, postData);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    const item = subtaskPostData?.find((el) => el.subtaskId === subtaskId)
    const postData = {
        ...item,
        status: options[(event.target.value)]?.toUpperCase(),
      }
    dispatch(
      manipulateTask(CHANGE_POST_DATA, postData)
    );

    if(fileRequired && !postData.submitted && postData.fileUrl) {
      delete postData.fileUrl
    }
    postSubtaskData(postData)
  };
  return (
    <FormControl size="small" sx={{ width: { xs: "100%", sm: 200 } }}>
      <InputLabel>Select Status</InputLabel>
      <Select
        value={status}
        onChange={handleChange}
        sx={{ fontColor: "grey" }}
        label="Select Status"
      >
        {options.map((item, i) => (
          <MenuItem value={i} key={i}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
