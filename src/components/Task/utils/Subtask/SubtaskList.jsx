import { List, ListItem, Stack, Typography, Box } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import TaskMenu from "../TaskMenu";
import { useSelector } from "react-redux";
import ButtonViewSections from "../Buttons/ButtonViewSections";
import ButtonViewText from "../Buttons/ButtonViewText";
import ReadMore from "../ReadMore";
import SubtaskProgress from "./SubtaskProgress";
import BtnViewFile from "../Buttons/BtnViewFile";
import UtilFunctions from "../UtilFunctions";

const SubtaskList = (props) => {
  const { taskProgress, assigneeId, subtasks } = useSelector(
    (state) => state.TaskReducer
  );
  return (
    <List
      sx={{
        height: "80vh",
        maxHeight: "100vh",
        overflow: "scroll",
        border: "1.5px solid #e0e0e0",
        borderRadius: "10px",
        px: { xs: 0.7, md: 2 },
        marginTop: "0px !important",
        py: 0,
        mb: 2,
      }}
    >
      {subtasks?.map((subtask, i) => (
        <ListItem
          sx={{
            borderBottom: "1.5px solid #e0e0e0",
            py: 1.5,
            alignItems: "flex-start",
          }}
          key={i}
        >
          <TagIcon
            sx={{
              mr: 2.5,
              color: "grey",
              display: { xs: "none", sm: "block" },
              mt: 2.5,
            }}
          />
          <Stack spacing={1} sx={{ width: "100%" }}>
            <Stack
              direction={{  xs: props.viewMode ? "column" : "row" , md: "row" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Stack
                direction="row"
                sx={{ gap: "12px" }}
                flexWrap="wrap"
                alignItems="center"
              >
                <Typography>{subtask?.title}</Typography>
                <Typography
                  sx={{
                    fontSize: "10.8px",
                    border: `0.2px solid ${
                      props.typeColors[subtask?.type.toLowerCase()].border
                    }`,
                    color: props.typeColors[subtask?.type.toLowerCase()].color,
                    px: 1.2,
                    py: 0.2,
                    borderRadius: "4px",
                  }}
                >
                  {subtask?.type}
                </Typography>
              </Stack>
              {!props.viewMode ? (
                <TaskMenu isParentTask={props.isParentTask} subtask={subtask} />
              ) : (
                assigneeId && (
                  <SubtaskProgress
                    subtaskId={subtask?.id}
                    taskProgress={taskProgress}
                  />
                )
              )}
            </Stack>

            <Stack
              spacing={1}
              direction={{
                xs:
                  subtask?.type?.toLowerCase() === "contest" &&
                  "column-reverse",
                md:
                  subtask?.type?.toLowerCase() === "contest"
                    ? "row-reverse"
                    : "row",
              }}
              justifyContent="space-between"
              alignItems={{ md: "center" }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1, md: 4 }}
                justifyContent="space-between"
              >
                {subtask?.type?.toLowerCase() === "course" && (
                  <Typography sx={{ color: "grey", fontSize: "12.8px" }}>
                    <span style={{ color: "#000000DE" }}>Title : </span>
                    {subtask?.info?.title}
                  </Typography>
                )}
                <Typography sx={{ color: "grey", fontSize: "12.8px" }}>
                  <span style={{ color: "#000000DE" }}>Duration : </span>
                  {UtilFunctions.convertDuration(subtask?.duration)}
                  {subtask?.duration >= 86400 ? "days" : "hours"}
                </Typography>

                <Typography
                  sx={{
                    color: "grey",
                    fontSize: "12.8px",
                  }}
                >
                  <span style={{ color: "#000000DE" }}>Start Time : </span>
                  {UtilFunctions.parseEpochTime(subtask.startsAt)} (
                  {UtilFunctions.parseEpochDate(subtask.startsAt)} )
                </Typography>
              </Stack>
              {/* -------------  CONTEST ------------ */}
              {subtask?.type?.toLowerCase() === "contest" && (
                <Stack
                  direction={{ xs: "row" }}
                  spacing={{ xl: 4 }}
                  alignItems={{ xl: "center" }}
                  sx={{ flexWrap: "wrap", gap: "12px" }}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      sx={{
                        fontSize: "10.8px",
                        bgcolor: "#f5f5f5",
                        color: "grey",
                        px: 0.8,
                        py: 0.2,
                        borderRadius: "4px",
                      }}
                      variant="body1"
                    >
                      {subtask?.info?.code?.toUpperCase()}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#4DB6AC",
                        border: "1px solid #e0f2f1",
                        width: "fit-content",
                        fontSize: "10.8px",
                        px: 0.8,
                        py: 0.2,
                        borderRadius: "4px",
                      }}
                      variant="body1"
                    >
                      {subtask?.info?.type?.toUpperCase()}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography sx={{ color: "grey", fontSize: "12.8px" }}>
                      <span style={{ color: "#000000DE" }}>Title : </span>
                      {subtask?.info?.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ fontSize: "12.8px" }}
                      variant="body1"
                    >
                      <span style={{ color: "#000000DE" }}>Min Score : </span>
                      {subtask.minScore}
                    </Typography>
                  </Stack>
                </Stack>
              )}

              {/*---------------- TEXT ----------------*/}

              {props.viewMode && subtask?.type?.toLowerCase() === "text" && (
                <>
                  {assigneeId ? (
                    <BtnViewFile
                      subtaskId={subtask?.id}
                      taskProgress={taskProgress}
                      btnText="View Submission"
                    />
                  ) : (
                    <ButtonViewText
                      fileRequired={subtask?.isFileRequired}
                      displayValue={subtask?.textEditor}
                    />
                  )}
                </>
              )}

              {!props.viewMode && subtask?.type?.toLowerCase() === "text" && (
                <ButtonViewText
                  fileRequired={subtask?.isFileRequired}
                  displayValue={subtask?.textEditor}
                />
              )}
              {/*--------------- COURSE ---------------*/}
              {subtask?.type?.toLowerCase() === "course" && (
                <ButtonViewSections
                  id={subtask.id}
                  sections={subtask?.info?.sections}
                />
              )}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ gap: "8px", flexWrap: "wrap-reverse" }}
            >
              <Box>
                <span style={{ fontSize: "12.8px" }}>Description : </span>
                <ReadMore fontSize="12.8px" color="text.secondary">
                  {subtask?.description}
                </ReadMore>
              </Box>
              {subtask?.type?.toLowerCase() === "contest" &&
                props.viewMode &&
                assigneeId && (
                  <Typography
                    sx={{
                      color: "#8d6e63",
                      border: "1px solid #d7ccc8",
                      width: "fit-content",
                      fontSize: "12.8px",
                      px: 0.8,
                      py: 0.2,
                      borderRadius: "4px",
                    }}
                    variant="body1"
                  >
                    Score: {subtask?.score ? subtask.score : "N/A"}
                  </Typography>
                )}
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};

export default SubtaskList;
