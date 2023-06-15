import React from "react";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import {
  Stack,
  List,
  ListItem,
  Typography,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import LinearProgressWithLabelReusable from "../../LinearProgress/LinearProgressWithLabelReusable";

const listItems = [
  {
    title: "Status",
    value: "In Progress",
    icon: <RotateRightIcon sx={{ fontSize: "16px" }} />,
  },
  {
    title: "Due Date",
    value: "Aug 04, 2023",
  },

  {
    title: "Assignees",
    images: [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/men/14.jpg",
      "https://randomuser.me/api/portraits/men/11.jpg",
      "https://randomuser.me/api/portraits/men/10.jpg",
      "https://randomuser.me/api/portraits/men/4.jpg",
      "https://randomuser.me/api/portraits/men/6.jpg",
    ],
  },
  {
    title: "Progress",
    progress: 40,
  },
];

const ViewTaskHeader = () => {
  return (
    <Stack spacing={1.5}>
      <Typography sx={{ fontSize: "1.8rem" }} variant="h4">
        Title of the task
      </Typography>

      <List>
        {listItems.map((item) => (
          <ListItem sx={{ py: 1, height: "40px", px: 0 }}>
            <Typography sx={{ color: "grey", width: { xs: "120px" } }}>
              {item.title}
            </Typography>
            {item.icon ? (
              <Stack
                alignItems="center"
                sx={{
                  color: "#ffb74d",
                  bgcolor: "#fff3e0",
                  py: 0.2,
                  px: 1,
                  pr: 1.1,
                  borderRadius: "4px",
                }}
                direction="row"
                spacing={1}
              >
                {item.icon}
                <Typography>{item.value}</Typography>
              </Stack>
            ) : (
              <Typography>{item.value && item.value}</Typography>
            )}

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
              {item.images?.map((image) => (
                <Avatar src={image}></Avatar>
              ))}
            </AvatarGroup>
            {item.progress && (
              <LinearProgressWithLabelReusable
                displayTitle="none"
                progressCount={item.progress}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Stack spacing={1}>
        <Typography variant="h6">Description</Typography>
        <Typography sx={{ color: "grey" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus iure
          alias ratione impedit tenetur sed iusto perferendis fugiat eaque
          inventore, dicta, tempora repellat maxime, omnis repudiandae.
          Doloremque eum eligendi perferendis, laboriosam, sit ex tenetur, odio
          officia magnam corrupti quaerat tempora!
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ViewTaskHeader;
