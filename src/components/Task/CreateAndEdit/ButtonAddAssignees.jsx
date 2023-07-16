import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TaskAPI } from "../../../api/requests/tasks/taskAPI";
import { manipulateuserdata } from "../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../Redux/UserData/User-Constants";

const ButtonAddAssignees = () => {
  const dispatch = useDispatch();

  const ALERT_TIME = 5000;
  const handlealert = (text, type) => {
    dispatch(
      manipulateuserdata(SET_ALERT_DATA, {
        text: text,
        type: type,
      })
    );
    setTimeout(() => {
      dispatch(manipulateuserdata(SET_ALERT_DATA, { text: "", type: "" }));
    }, ALERT_TIME);
  };

  const { taskAssignees } = useSelector((state) => state.TaskReducer);

  const handleSave = async () => {
    try {
      const id = window.location.href.split("/")[4];
      const usersArr = [];
      for (let i = 0; i < taskAssignees.length; i++) {
        usersArr.push(taskAssignees[i].username);
      }
      const body = {
        usernames: usersArr,
      };

      const assignUsers = await TaskAPI.assignTaskToUser(body, id);
      handlealert("Task Assigned Successfully", "success");
    } catch (err) {
      handlealert("Failed to Assign Task", "error");
    }
  };

  return (
    <Button
      sx={{
        width: { xs: "100%", md: "auto" },
      }}
      disabled={!taskAssignees.length > 0}
      variant="contained"
      disableRipple
      onClick={handleSave}
    >
      Save
    </Button>
  );
};

export default ButtonAddAssignees;
