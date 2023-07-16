import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TaskAPI } from "../../../../api/requests/tasks/taskAPI";
import { manipulateuserdata } from "../../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../../Redux/UserData/User-Constants";
import { manipulateTask } from "../../../../Redux/Task/Task-Action";
import { CHANGE_POST_DATA, FETCH_TASK_PROGRESS } from "../../../../Redux/Task/Task-Constants";

const BtnSubmission = ({ subtaskId, setOpen, subtaskPostItem }) => {
  const { subtaskPostData, fetchTaskProgress } = useSelector((state) => state.TaskReducer);
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

  const item = subtaskPostData?.find(
    (el) => el.subtaskId === subtaskId
  );

  const handleSubmit = async () => {
    try {
      if(item.submitted) delete item.submitted
      await TaskAPI.submitSubtask(subtaskId, item);
      dispatch((manipulateTask(CHANGE_POST_DATA, {
        ...subtaskPostItem,
        submitted: true
      })))
      handlealert("File Submitted Successfully", "success");
      setOpen(false)
      dispatch((manipulateTask(FETCH_TASK_PROGRESS, !fetchTaskProgress)))
    } catch {
      handlealert("There was some error submitting file", "error");
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        size="small"
        disabled={item?.fileUrl ? false : true}
        sx={{ maxWidth: "fit-content", minWidth: "fit-content", px: 2 }}
        variant="contained"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default BtnSubmission;
