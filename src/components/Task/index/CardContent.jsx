import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { Stack, Typography, Checkbox, Button } from "@mui/material";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinearProgressWithLabelReusable from "../../LinearProgress/LinearProgressWithLabelReusable";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CardContent = ({ task, isParentTask }) => {
  return (
    <Stack spacing={0.5} sx={{ color: "grey" }}>
      {isParentTask ? (
        <Stack spacing={1.5} direction="row" alignItems="center">
          <FormatListBulletedOutlinedIcon
            sx={{ color: "#698AFF", fontSize: "22px" }}
          />
          <Typography variant="body2">8 subtasks</Typography>
        </Stack>
      ) : (
        <>
          <Stack
            spacing={2}
            p={2}
            justifyContent="center"
            sx={{
              bgcolor: "#f5f5f5",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            {task.type === "text" ? (
              <Stack spacing={2} direction="row">
                <DescriptionOutlinedIcon sx={{ color: "#698Aff", mt: 0.3 }} />
                <Stack spacing={1}>
                  <Typography>Lorem ipsum dolor sit amet...</Typography>
                  <Button variant="outlined"> View Attachment</Button>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="flex-start" spacing={2}>
                {task.type === "course" && (
                  <PlayCircleOutlinedIcon sx={{ color: "#698Aff", mt: 0.3 }} />
                )}
                {task.type === "contest" && (
                  <ComputerOutlinedIcon sx={{ color: "#698Aff", mt: 0.3 }} />
                )}

                <Stack spacing={0.5}>
                  <Typography color="text.secondary" variant="body1">
                    {task.title}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                      {task.type === "course" && "Sections :"}
                      {task.type === "contest" && "Minimum Score :"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey" }}>
                      {task.type === "course" && task.sections}
                      {task.type === "contest" && task.minScore}
                    </Typography>
                  </Stack>
                  {task.type === "course" && (
                    <LinearProgressWithLabelReusable
                      displayTitle="none"
                      progressCount={36}
                    />
                  )}
                  {task.type === "contest" && (
                    <Typography
                      sx={{
                        color: "grey",
                        border: "1px solid #bdbdbd",
                        px: 0.8,
                        py: 0.2,
                        borderRadius: "2px",
                        width: "fit-content",
                        fontSize: "12.2px",
                      }}
                    >
                      Not Attended
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>

          {task.type === "text" ? (
            <Stack p={2} direction="row" alignItems="center" spacing={1}>
              <Checkbox sx={{ padding: 0 }} />
              <Typography variant="body2">Mark as completed</Typography>
            </Stack>
          ) : (
            <Button
              size="small"
              sx={{
                minWidth: "fit-content",
                maxWidth: "fit-content",
                textTransform: "none !important",
              }}
              endIcon={<ChevronRightIcon />}
            >
              Go to {task.type}
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};

export default CardContent;
