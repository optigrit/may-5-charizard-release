import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TaskAPI } from "../../../api/requests/tasks/taskAPI";
import { useDispatch, useSelector } from "react-redux";
import { manipulateTask } from "../../../Redux/Task/Task-Action";
import {
  SET_ASSIGNEE_ID,
  SET_TASK_PROGRESS,
  SET_TASK_STATUS,
} from "../../../Redux/Task/Task-Constants";

const SelectAssignee = ({ getTaskProgress }) => {
  const [assignees, setAssignees] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { assigneeId } = useSelector((state) => state.TaskReducer);

  const getTaskAssignees = async () => {
    try {
      const { data } = await TaskAPI.getTaskAssignees(id);
      setAssignees(data);
    } catch (err) {}
  };

  useEffect(() => {
    getTaskAssignees();
  }, []);

  useEffect(() => {
    assigneeId
      ? getTaskProgress(id, assigneeId)
      : dispatch(manipulateTask(SET_TASK_PROGRESS, null));
  }, [assigneeId]);

  const handleChange = (event) => {
    dispatch(manipulateTask(SET_ASSIGNEE_ID, event.target.value));
  };

  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 120, width: "25%" }}>
      <Select
        sx={{ width: "100%" }}
        value={assigneeId}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem sx={{ maxWidth: "100%" }} value={null}>
          <em>None</em>
        </MenuItem>
        {assignees?.map((assignee) => (
          <MenuItem key={assignee.id} value={assignee.id}>
            {assignee.username}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectAssignee;
