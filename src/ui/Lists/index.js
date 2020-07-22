import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  withStyles,
  TableFooter,
  makeStyles,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    hover: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const Lists = ({ data, onChangePage, table }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            {table.headersName.map((v, k) => (
              <StyledTableCell key={k}>{v}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.result.map((d, key) => (
            <StyledTableRow
              key={key}
              onClick={() => onClickRow(d)}
              className={classes.hover}
            >
              {table.keyValue.map((v, k) => (
                <StyledTableCell key={k}>{d[v]}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {/* <TablePagination
               rowsPerPage={data._meta.perPage}
               count={data._meta.totalCount}
               page={data._meta.currentPage - 1}
               rowsPerPageOptions={[data._meta.perPage]}
               onChangePage={(e, p) => onChangePage(e, p)}
             />  */}
          </TableRow>
        </TableFooter>
      </Table>
      <div>
        <Pagination
          count={data._meta.pageCount}
          color="primary"
          size="large"
          onChange={onChangePage}
        />
      </div>
    </TableContainer>
  );
};
export default Lists;
