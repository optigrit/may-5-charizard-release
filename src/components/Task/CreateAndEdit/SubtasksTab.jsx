import {
  Stack,
  List,
  ListItem,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import TaskHeader from "../utils/TaskHeader";
import TagIcon from "@mui/icons-material/Tag";
import ButtonAddNew from "./ButtonAddNew";
import TaskMenu from "../utils/TaskMenu";

const SubtasksTab = () => {
  const typeColors = {
    course: {
      color: "#ba68c8",
      border: "#f3e5f5",
    },
    contest: {
      color: "#4db6ac",
      border: "#e0f2f1",
    },
    text: {
      color: "#f06292",
      border: "#fce4ec",
    },
  };
  const arr = [
    "course",
    "contest",
    "text",
    "text",
    "contest",
    "course",
    "course",
  ];

  return (
    <Stack spacing={{ xs: 2, md: 2.5 }}>
      <Stack
        direction={{ xs: "column-reverse", md: "row" }}
        justifyContent="space-between"
        alignItems={{ md: "center" }}
      >
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TaskHeader subtitle="Here is a list of all the subtasks you've created" />
        </Box>
        <ButtonAddNew isParentTask={false} />
      </Stack>
      <List
        sx={{
          height: "80vh",
          overflow: "scroll",
          border: "1.5px solid #e0e0e0",
          borderRadius: "10px",
          px: { xs: 0.7, md: 2 },
        }}
      >
        {arr.map((e) => (
          <ListItem sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}>
            <TagIcon
              sx={{
                mr: 2.5,
                color: "grey",
                display: { xs: "none", sm: "block" },
              }}
            />
            <ListItemText
              primary={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2.2}
                >
                  <Stack
                    direction="row"
                    sx={{ gap: "12px" }}
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <Typography>
                      Title of the task Lorem ipsum dolor sit amet.
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "10.8px",
                        border: `0.2px solid ${typeColors[e].border}`,
                        color: typeColors[e].color,
                        px: 1.2,
                        py: 0.2,
                        borderRadius: "4px",
                      }}
                    >
                      TYPE
                    </Typography>
                  </Stack>
                  <TaskMenu isParentTask={false} />
                </Stack>
              }
              secondary={
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems={{ lg: "center" }}
                  mt={1}
                  spacing={1}
                  justifyContent="space-between"
                >
                  <Stack spacing={1} direction="row">
                    <Typography sx={{ fontSize: "12.5px" }}>
                      Duration :
                    </Typography>
                    <Typography sx={{ color: "grey", fontSize: "12.5px" }}>
                      12 h
                    </Typography>
                  </Stack>
                  <Stack spacing={1} direction="row">
                    <Typography sx={{ fontSize: "12.5px" }}>
                      Starts At :
                    </Typography>
                    <Typography
                      sx={{
                        color: "grey",
                        fontSize: "12.5px",
                      }}
                    >
                      12:00 AM ( 04 Aug 23 )
                    </Typography>
                  </Stack>
                </Stack>
              }
            ></ListItemText>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default SubtasksTab;
