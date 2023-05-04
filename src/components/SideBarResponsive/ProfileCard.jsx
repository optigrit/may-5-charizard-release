import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import List from "@mui/material/List";

import React from "react";

const ProfileCard = ({ Name, Email }) => {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 240,
          bgcolor: "transparent",
          paddingBottom: "0px",
          paddingTop: "0px",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{ borderRadius: "10%" }}
              alt={Name}
              src="/static/images/avatar/1.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            sx={{ wordBreak: "break-word" }}
            primary={Name}
            primaryTypographyProps={{ fontSize: { uxl: "20px" } }}
          />
        </ListItem>
      </List>
    </>
  );
};

export default ProfileCard;
