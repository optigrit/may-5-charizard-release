import { Stack, Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import NumberBadge from "./NumberBadge";
import ButtonAddNew from "../CreateAndEdit/ButtonAddNew";
import tabs from "./TabsData";
import TaskTabContent from "./TaskTabContent";
import { useSelector } from "react-redux";

const TaskStatusTabs = () => {
  const [value, setValue] = useState("1");
  const tasks = useSelector((state) => state.TaskReducer.tasks);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{ position: "sticky", top: 0, zIndex: 1, p: 1, bgcolor: "#FAFBFB" }}
      >
        <Stack
          sx={{
            bgcolor: "#fff",
            boxShadow: 3,
            borderRadius: "10px",
            m: 1,
            px: 1,
            py: 0,
          }}
          direction="row"
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          <TabList
            variant="scrollable"
            TabIndicatorProps={{
              sx: { height: "2.5px", borderRadius: "4px" },
            }}
            sx={{
              height: "65px",
              "& button": { color: "grey", opacity: "65%", py: 0 },
              "& button.Mui-selected": {
                color: "#698AFF",
                opacity: "100%",
              },
            }}
            onChange={handleChange}
          >
            {tabs.map((tab) => (
              <Tab
                icon={
                  <NumberBadge
                    num={tasks.length}
                    isActive={value === tab.value}
                  />
                }
                iconPosition="end"
                disableRipple
                label={tab.label}
                value={tab.value}
              />
            ))}
          </TabList>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <ButtonAddNew isParentTask={true} />
          </Box>
        </Stack>
      </Box>
      {tabs.map((tab) => (
        <TabPanel sx={{ pt: 1 }} value={tab.value}>
          <TaskTabContent tasks={tasks} />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export default TaskStatusTabs;
