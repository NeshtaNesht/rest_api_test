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
  Icon,
  Button,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";

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
      // cursor: "pointer",
    },
  },
}));

const Lists = ({
  data,
  onChangePage,
  table,
  onClickRow,
  isRedirect,
  toRedirect,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            {table.headersName.map((v, k) => (
              <StyledTableCell key={k}>{v}</StyledTableCell>
            ))}
            <StyledTableCell>Действия</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.result.map((d, key) => (
            <StyledTableRow
              key={key}
              onClick={(e) => onClickRow(e, d)}
              className={classes.hover}
            >
              {table.keyValue.map((v, k) => (
                <StyledTableCell key={k}>{d[v]}</StyledTableCell>
              ))}
              <StyledTableCell>
                <Link to={`${toRedirect}/${d.id}`}>
                  <VisibilityIcon />
                </Link>
              </StyledTableCell>
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
      <Pagination
        count={data._meta.pageCount}
        color="primary"
        size="large"
        onChange={onChangePage}
      />
    </TableContainer>
  );
};
export default Lists;
