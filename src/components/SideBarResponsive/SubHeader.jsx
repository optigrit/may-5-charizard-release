import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const SubHeader = ({
  uploadData,
  editProblem,
  title,
  handleEditForm,
  UploadTitle,
  EditTitle,
  FormId,
  addProblemFun,
  addProblemAndGoToHomeFun,
  SaveAndCreateBtn,
  SaveAndGoBtn,
}) => {
  return (
    <>
      <Grid container sx={{ p: 2 }}>
        <Grid
          item
          xs={12}
          md={6}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Typography variant="h6">{title}</Typography>
          {editProblem && (
            <Button
              variant="contained"
              sx={{ display: { xs: "block", md: "none" } }}
              size="small"
              onClick={() => uploadData()}
            >
              <ModeEditOutlineOutlinedIcon fontSize="16px" sx={{ mr: 0.5 }} />
              Edit
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ justifyContent: { md: "flex-end!important" } }}
        >
          {EditTitle ? (
            <Button
              variant="outlined"
              size="small"
              sx={{ mr: 2 }}
              onClick={() => handleEditForm()}
            >
              {EditTitle}
            </Button>
          ) : null}
          {UploadTitle && (
            <Button
              variant="contained"
              size="small"
              form={FormId}
              type="submit"
            >
              {UploadTitle}
            </Button>
          )}
          {addProblemFun && addProblemAndGoToHomeFun && (
            <Grid
              sx={{
                justifyContent: { md: "flex-end!important" },
                marginTop: { xs: "12px", md: "0px" },
              }}
              display="flex"
              flexDirection="row"
              gap="16px"
            >
              <Button
                variant="outlined"
                onClick={addProblemFun}
                size="small"
                sx={{ textTransform: "capitalize", textAlign: "start" }}
              >
                <ModeEditOutlineOutlinedIcon
                  sx={{ fontSize: { xs: "16px", md: "18px" }, mr: 1 }}
                />
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "14px", md: "16px" },
                    display: "-webkit-box!important",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: " vertical",
                  }}
                >
                  {SaveAndCreateBtn}
                </Typography>
              </Button>
              <Button
                variant="contained"
                onClick={addProblemAndGoToHomeFun}
                size="small"
                sx={{ textTransform: "capitalize", textAlign: "start" }}
              >
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: { xs: "14px", md: "16px" },
                    display: "-webkit-box!important",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: " vertical",
                  }}
                >
                  {" "}
                  {SaveAndGoBtn}
                </Typography>
              </Button>
            </Grid>
          )}
          {editProblem && (
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ display: { xs: "none", md: "block" } }}
                size="small"
                onClick={() => uploadData()}
              >
                <ModeEditOutlineOutlinedIcon fontSize="16px" sx={{ mr: 0.5 }} />
                Edit
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default SubHeader;
