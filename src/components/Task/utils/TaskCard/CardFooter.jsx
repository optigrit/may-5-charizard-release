import { Stack, Typography, AvatarGroup, Avatar, Tooltip } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { useSelector } from "react-redux";
import UtilFunctions from "../UtilFunctions";

const CardFooter = ({ task, isParentTask }) => {

  const {role} = useSelector((state) => state.TaskReducer)
  const deadline = UtilFunctions.parseEpochDate(task.startsAt + task.duration)
  
  const getTaskAvatars = () => {
    const taskAvatars = new Array(task.assignedUsersCount)
    for (let i = 0; i < taskAvatars.length; i ++) {
      taskAvatars[i] = task.userImages && task.userImages[i].profilePhotoLink
    }
   return taskAvatars
  }
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
     {(role === "ADMIN" || role === "SUPERADMIN") && isParentTask &&  <AvatarGroup
        sx={{
          "& .MuiAvatarGroup-avatar": {
            width: 30,
            height: 30,
            fontSize: "14px",
          },
        }}
        max={4}
      >
        {getTaskAvatars().map((img) => (
          <Avatar src={img}></Avatar>
        ))}
      </AvatarGroup>}

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ color: "grey" }}
      >
        <Tooltip title="Deadline">
          <CalendarMonthOutlinedIcon sx={{ fontSize: "22px" }} />
        </Tooltip>
        <Typography variant="body2">
          {deadline}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CardFooter;
