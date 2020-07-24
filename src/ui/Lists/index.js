import React from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  withStyles,
  makeStyles,
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

const useStyles = makeStyles(() => ({
  hover: {
    "&:hover": {
      // cursor: "pointer",
    },
  },
}));

/**
 * Выводит список объектов data
 * @param {Array of objects} data Массив с объектами для вывода
 * @param {func} onChangePage Обработка смены страницы (пагинация)
 * @param {Object} table Массив с объектами для настройки таблицы
 * @param {func} onClickRow Обработка клика по строке
 * @param {string} toRedirect Куда переходить при нажатии на строку
 */

const Lists = ({ data, onChangePage, table, onClickRow, toRedirect }) => {
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
                <Link to={`${toRedirect}`}>
                  <VisibilityIcon />
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={data._meta.pageCount}
        color="primary"
        size="large"
        onChange={onChangePage}
        page={data._meta.currentPage}
      />
    </TableContainer>
  );
};

Lists.propTypes = {
  data: PropTypes.object,
  onChangePage: PropTypes.func,
  table: PropTypes.shape({
    headersName: PropTypes.array,
    keyValue: PropTypes.array,
  }),
  onClickRow: PropTypes.func,
  toRedirect: PropTypes.string,
};
export default Lists;
