import {
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import { FilterAlt, KeyboardDoubleArrowLeft } from "@mui/icons-material"; // Import icons
import { useState } from "react";

const FilterPanel = ({ filter, setFilter, onApplyFilter, onClearFilter }) => {
  const [expanded, setExpanded] = useState(false);

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, type: value }));
  };

  const handleAvailabilityStatusChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, availabilityStatus: value }));
  };

  const handleOwnershipTypeChange = (event) => {
    const { value } = event.target;
    setFilter((prev) => ({ ...prev, ownershipType: value }));
  };

  const handleAreaChange = (event, newValue) => {
    setFilter((prev) => ({ ...prev, areaRange: newValue }));
  };

  return (
    <>
      {!expanded && (
        <Box className="filterExpandButton">
          <Tooltip title="Filters" placement="right">
            <span>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                className="icon-button-style"
              >
                <FilterAlt />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      )}

      <div className={`filterPanel ${expanded ? "expanded" : "collapsed"}`}>
        <Collapse in={expanded} orientation="horizontal">
          <FormControl margin="normal">
            <Tooltip title="Hide filters" placement="right">
              <span>
                <IconButton
                  onClick={() => setExpanded(!expanded)}
                  className="filterCollapsButton"
                >
                  <KeyboardDoubleArrowLeft />
                </IconButton>
              </span>
            </Tooltip>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              multiple
              label="Type"
              value={filter.type}
              onChange={handleTypeChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Residential">Residential</MenuItem>
              <MenuItem value="Commercial">Commercial</MenuItem>
              <MenuItem value="Farming">Farming</MenuItem>
              <MenuItem value="Fish Farm">Fish Farm</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Availability Status</InputLabel>
            <Select
              multiple
              label="Availability Status"
              value={filter.availabilityStatus}
              onChange={handleAvailabilityStatusChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="For Sale">For Sale</MenuItem>
              <MenuItem value="For Rent">For Rent</MenuItem>
              <MenuItem value="Sold">Sold</MenuItem>
              <MenuItem value="Leased">Leased</MenuItem>
              <MenuItem value="Auction">Auction</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Ownership Type</InputLabel>
            <Select
              multiple
              label="Ownership Type"
              value={filter.ownershipType}
              onChange={handleOwnershipTypeChange}
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Private">Private</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
              <MenuItem value="Common">Common</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Slider
              value={filter.areaRange}
              min={500}
              max={2000}
              step={100}
              valueLabelDisplay="on"
              onChange={handleAreaChange}
              valueLabelFormat={(value) => `${value} m`}
              sx={{
                width: "80%", // Adjust the slider width to give space for the value label
              }}
            />
          </FormControl>

          <div className="filterButtons">
            <Button
              onClick={() => onClearFilter()}
              variant="outlined"
              fullWidth
            >
              Clear
            </Button>
            <Button
              onClick={() => onApplyFilter(filter)}
              variant="contained"
              fullWidth
            >
              Filter
            </Button>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default FilterPanel;
