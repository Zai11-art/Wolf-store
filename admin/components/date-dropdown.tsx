import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function DateDropdown({
  setBarRange,
  options,
  currentRange,
}: {
  setBarRange: (data: string) => void;
  options: string[];
  currentRange: string;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setBarRange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small" fullWidth>
        <InputLabel id="demo-simple-select-label">Range</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={currentRange}
          label="Range"
          onChange={handleChange}
          defaultValue={"gegege"}
        >
          {options.map((range) => (
            <MenuItem value={range}>{range}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
