import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectOptions({
  selectedSections,
  setSelectedSections,
}) {
  const options = ["option1", "option2", "option3", "option4", "option5"];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedSections(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 250 }}>
        <InputLabel sx={{ color: "grey" }} id="demo-multiple-checkbox-label">
          Select Sections
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          sx={{
            boxShadow: "none",
            "& .MuiSelect-select": {
              paddingRight: "32px",
              pb: 1.5,
              bgcolor: "#F5F5F5",
              borderRadius: "6px",
              border: "none",
            },

            ".MuiOutlinedInput-notchedOutline": { border: "2px solid #e0e0e0" },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #e0e0e0",
            },
          }}
          multiple
          value={selectedSections}
          onChange={handleChange}
          input={<OutlinedInput label="Select Sections" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {options &&
            options.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedSections.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
