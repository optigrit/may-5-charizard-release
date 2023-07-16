import { Button, List, ListItem, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import TaskModal from "../TaskModal";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import ButtonOkay from "./ButtonOkay";

const ButtonViewSections = ({ sections, id }) => {
  const [open, setOpen] = useState(false);
  const { role } = useSelector((state) => state.TaskReducer);

  return (
    <Box>
      <Button
        endIcon={<ChevronRightIcon />}
        onClick={() => setOpen(true)}
        size="small"
        variant="outlined"
        sx={{
          minWidth: "fit-content",
          maxWidth: "fit-content",
          textTransform: "none !important",
        }}
      >
        {role === "ADMIN" || role === "SUPERADMIN" ? "View Sections" : "View "}
      </Button>
      <TaskModal
        modalWidth={{ xs: "95vw", sm: "75vw", md: "60vw", lg: "55vw" }}
        modalHeight={{ xs: "95vh", sm: "80vh", md: "70vh", lg: "65vh" }}
        borderRadius="10px"
        open={open}
        setOpen={setOpen}
        title="Section List"
        subtitle="View all the assigned sections for the course"
      >
        <Stack sx={{ height: "100%" }} spacing={2}>
          <List
            sx={{
              height: "100%",
              border: "1.5px solid #e0e0e0",
              borderRadius: "10px",
              my: 2,
              px: 2,
              overflow: "scroll",
            }}
          >
            {sections?.map((section, i) => (
              <ListItem
                key={i}
                sx={{ borderBottom: "1px solid #e0e0e0", py: 1 }}
              >
                <TagOutlinedIcon sx={{ color: "grey", mr: 2.5 }} />
                <Typography>{section?.sectionTitle}</Typography>
              </ListItem>
            ))}
          </List>
          <ButtonOkay setOpen={setOpen} />
        </Stack>
      </TaskModal>
    </Box>
  );
};

export default ButtonViewSections;
