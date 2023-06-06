import { Stack, Typography, AvatarGroup, Avatar } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const CardFooter = ({ task }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <AvatarGroup
        sx={{
          "& .MuiAvatarGroup-avatar": {
            width: 30,
            height: 30,
            fontSize: "14px",
          },
        }}
        max={4}
      >
        {task.users?.map((user) => (
          <Avatar src={user.image}></Avatar>
        ))}
      </AvatarGroup>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ color: "grey" }}
      >
        <CalendarMonthOutlinedIcon sx={{ fontSize: "22px" }} />
        <Typography variant="body2">04 Aug 23</Typography>
      </Stack>
    </Stack>
  );
};

export default CardFooter;
