import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";

const TableHeader = (props) => {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHead>
      <div className="head"></div>
      <TableRow>
        <TableCell key="name">
          <TableSortLabel
            active={"name" === "name"}
            direction={valueToOrderBy == "name" ? orderDirection : "asc"}
            onClick={createSortHandler("name")}
          >
            Name
          </TableSortLabel>
        </TableCell>

        <TableSortLabel
          active={"location" === "location"}
          direction={valueToOrderBy == "location" ? orderDirection : "asc"}
          onClick={createSortHandler("location")}
        >
          <TableCell key="location">Location</TableCell>
        </TableSortLabel>

        <TableSortLabel
          active={"date" === "date"}
          direction={valueToOrderBy == "date" ? orderDirection : "asc"}
          onClick={createSortHandler("date")}
        >
          <TableCell key="date">Date</TableCell>
        </TableSortLabel>

        <TableSortLabel
          active={"units" === "units"}
          direction={valueToOrderBy == "units" ? orderDirection : "asc"}
          onClick={createSortHandler("units")}
        >
          <TableCell key="units">Units</TableCell>
        </TableSortLabel>

        <TableSortLabel
          active={"type" === "type"}
          direction={valueToOrderBy == "type" ? orderDirection : "asc"}
          onClick={createSortHandler("type")}
        >
          <TableCell key="type">Type</TableCell>
        </TableSortLabel>

        <TableSortLabel
          active={"points" === "points"}
          direction={valueToOrderBy == "points" ? orderDirection : "asc"}
          onClick={createSortHandler("points")}
        >
          <TableCell key="points">Points</TableCell>
        </TableSortLabel>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
