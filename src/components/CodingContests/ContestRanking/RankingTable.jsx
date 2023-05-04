import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import { Box, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6a6a6a",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: { xs: "12px", md: "14px" },
  },
}));

function StickyTableHeader({ columns }) {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column, index) => (
          <TableCell
            key={column.id}
            size="small"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1200,
              backgroundColor: "white",
              borderBottom: "1px solid #F1F1F1 ",
              borderTop: "1px solid #F1F1F1 ",
              // textAlign: index === 1 ? "left" : "center",
              textAlign: "center",
            }}
            width="10%!important"
            sx={{ padding: { xs: "12px", md: "16px" } }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                display: "-webkit-box!important",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: " vertical",
                color: "#8C8C8C",
              }}
              variant="body2"
            >
              {column.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const RankingTable = ({
  perPage,
  columns,
  rows,
  page,
  totalRanks,
  setPage,
}) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {/* <Paper
        sx={{
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          border: 0,
          boxShadow: 0,
        }}
      > */}
      <TableContainer sx={{ "&": { overflowX: "initial" }, mb: "64px" }}>
        <Table stickyHeader aria-label="sticky table">
          {/* <TableHead >
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, textAlign: "center" }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead> */}
          <StickyTableHeader columns={columns} />
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ textAlign: "center" }}
                        sx={{ padding: { xs: "8px", md: "12px" } }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box!important",
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitBoxOrient: " vertical",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        fullWidth
        position="fixed"
        display={"flex"}
        justifyContent={"center"}
        style={{
          backgroundColor: "#ffffff",
          top: "auto",
          bottom: "0px",
          right: 0,
        }}
        sx={{
          width: { xs: "100%", lg: `calc(100% - 240px)` },
          ml: { lg: `240px` },
        }}
      >
        <Stack alignItems="center" py={2}>
          <Pagination
            count={parseInt(totalRanks / parseInt(perPage)) + 1}
            page={page}
            onChange={handleChange}
            shape="rounded"
            color="primary"
          />
        </Stack>
      </Box>
         </>
  );
};

export default RankingTable;
