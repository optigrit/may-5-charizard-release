import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useState } from "react";
import AddTaskDetails from "../CreateAndEdit/AddTaskDetails";
import TaskModal from "./TaskModal";
import { TaskAPI } from "../../../api/requests/tasks/taskAPI";
import { useDispatch } from "react-redux";
import { manipulateuserdata } from "../../../Redux/UserData/User-Action";
import { SET_ALERT_DATA } from "../../../Redux/UserData/User-Constants";
import { useNavigate } from "react-router-dom";
import { manipulateTask } from "../../../Redux/Task/Task-Action";
import {
  DELETE_SUBTASK,
  DELETE_TASK,
} from "../../../Redux/Task/Task-Constants";

export default function TaskMenu({ task, isParentTask, subtask }) {
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [clicked, setClicked] = useState("");
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTask = async () => {
    handleClose();
    if (isParentTask) {
      try {
        const id = task.id;
        const data = await TaskAPI.deleteTask(id);
        dispatch(manipulateTask(DELETE_TASK, data[0]));
        handlealert("Task Deleted Successfully", "success");
      } catch (err) {
        handlealert("Failed to Delete Task", "error");
      }
    } else if (!isParentTask) {
      try {
        const id = subtask.id;
        const data = await TaskAPI.deleteSubTask(id);
        dispatch(manipulateTask(DELETE_SUBTASK, data[0]));
        handlealert("Subtask Deleted Successfully", "success");
      } catch (err) {
        handlealert("Failed to Subtask Task", "error");
      }
    }
  };

  const handleViewTask = () => {
    handleClose();
    if (isParentTask) {
      navigate(`/task/${task.id}`, {
        state: {
          id: task.id,
        },
      });
    } else {
      setOpenModal(true);
      setClicked("view");
    }
  };

  const handleEditTask = () => {
    handleClose();
    setOpenModal(true);
    setClicked("edit");
  };

  return (
    <div>
      <Button
        disableRipple
        style={{ maxWidth: "fit-content", minWidth: "fit-content", padding: 0 }}
        onClick={handleClick}
      >
        {isParentTask ? (
          <MoreHorizIcon sx={{ color: "grey" }} />
        ) : (
          <>
            <MoreVertOutlinedIcon
              sx={{ display: { md: "none" }, color: "grey" }}
            />
            <MoreHorizIcon
              sx={{ color: "grey", display: { xs: "none", md: "block" } }}
            />
          </>
        )}
      </Button>
      <Menu
        elevation={4}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isParentTask && (
          <MenuItem sx={{ color: "grey" }} onClick={handleViewTask}>
            <ListItemIcon>
              <VisibilityOutlinedIcon sx={{ color: "grey" }} />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        )}

        <MenuItem sx={{ color: "grey" }} onClick={handleEditTask}>
          <ListItemIcon>
            <EditOutlinedIcon sx={{ color: "grey" }} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteTask} sx={{ color: "#e57373" }}>
          <ListItemIcon>
            <DeleteOutlinedIcon sx={{ color: "#e57373" }} />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <TaskModal
        modalWidth={clicked === "view" && "auto"}
        modalHeight={clicked === "view" && "auto"}
        open={openModal}
        setOpen={setOpenModal}
      >
        {clicked === "edit" && (
          <AddTaskDetails
            setOpen={setOpenModal}
            editMode={true}
            isParentTask={isParentTask}
            taskData={task}
            subtask={subtask}
          />
        )}
      </TaskModal>
    </div>
  );
}
