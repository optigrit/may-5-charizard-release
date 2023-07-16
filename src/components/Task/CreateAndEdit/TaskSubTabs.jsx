import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AssigneesTab from "./AssigneesTab";
import SubtasksTab from "../utils/Subtask/SubtasksTab";

export default function TaskSubTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              sx: { height: "2.5px", borderRadius: "4px" },
            }}
            sx={{
              height: "65px",
              "& button": { color: "grey", py: 0 },
              "& button.Mui-selected": {
                color: "#698AFF",
                opacity: "100%",
              },
            }}
          >
            <Tab
              sx={{ mr: { sm: 5 } }}
              icon={<FormatListBulletedIcon />}
              iconPosition="start"
              label="Subtasks"
              value="1"
              disableRipple
            />
            <Tab
              icon={<PersonAddOutlinedIcon />}
              iconPosition="start"
              label="Assignees"
              value="2"
              disableRipple
            />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ py: 2, px: 1 }}>
          <SubtasksTab isParentTask={false} viewMode={false} />
        </TabPanel>
        <TabPanel value="2" sx={{ py: 2, px: 1 }}>
          <AssigneesTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
