import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from "@material-ui/core/IconButton";
import PageHeader from '../components/PageHeader';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
// utils
import { getData, deleteData } from "../utils/FormUtil";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  container: {
    maxHeight: 700,
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const CustomTableCell = ({ row, name, onChange, value }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={value}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        value
      )}
    </TableCell>
  );
};

export default function HomePage ( ) {

  const [rows, setRows] = useState([]);
  const [previous, setPrevious] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { 
      name: 'accName', 
      label: 'Account Name', 
      minWidth: 200 
    }, { 
      name: 'accAlias', 
      label: 'Account Alias', 
      minWidth: 100
    }, { 
      name: 'createdAt', 
      label: 'Created At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }, { 
      name: 'updatedAt', 
      label: 'Updated At', 
      minWidth: 150,
      format: (date) => new Date(date).toString().substring(4, 15)
    }
  ];

  useEffect(() => {
    let mounted = true;
    getData('/accounts')
      .then(data => {
        if(mounted) {
          data === null ? alert("Err") : setRows(data);
        }
      })
    return () => mounted = false;
  }, []);

  const onToggleEditMode = (_id) => {
    setRows(state => {
      return rows.map(row => {
        if (row._id === _id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row._id]) {
      setPrevious(state => ({ ...state, [row._id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { _id } = row;
    const newRows = rows.map(row => {
      if (row._id === _id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    console.log(previous)
    setRows(newRows);
  };

  const onRevert = (_id) => {
    const newRows = rows.map(row => {
      if (row._id === _id) {
        return previous[_id] ? previous[_id] : row;
      }
      return row;
    });
    console.log(newRows.find((item) => item._id === _id))
    setRows(newRows);
    setPrevious(state => {
      delete state[_id];
      return state;
    });
    onToggleEditMode(_id);
  };

  const onDelete = (_id) => {
    let mounted = true;
    deleteData(`/accounts/${_id}`)
      .then(data => {
        if (mounted) {
          if (data === null) {
            alert("Delete failed");
          }
          else {
            let newRows = rows.filter(row => row._id !== _id);
            setRows(newRows);
          }
        }
      })
    return () => mounted = false;
  }

  const onSubmit = (_id) => {
    rows.map(row => {
      if (row._id === _id) {
        console.log(row)
      }
      return row;
    })
  }

  return (
    <React.Fragment>
      <PageHeader 
        title="Home Page" 
        subTitle="description goes here"
      />
      <Link to="/form-account">
        <AddButton />
      </Link>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                {columns.map((column) => (
                  <TableCell
                    key={column.name}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell className={classes.selectTableCell}>
                    {row.isEditMode ? (
                      <React.Fragment>
                        <IconButton
                          aria-label="done"
                          onClick={() => onSubmit(row._id)}
                        >
                          <DoneIcon />
                        </IconButton>
                        <IconButton
                          aria-label="revert"
                          onClick={() => onRevert(row._id)}
                        >
                          <RevertIcon />
                        </IconButton>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <IconButton
                          aria-label="edit"
                          onClick={() => onToggleEditMode(row._id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => onDelete(row._id)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </React.Fragment>
                    )}
                  </TableCell>
                  {columns.map((column, index) => {
                    const noFormatVal = row[column.name];
                    const value = column.format ? column.format(noFormatVal) : noFormatVal; 
                    return (
                      <CustomTableCell key={index} {...{ row, name: column.name, align: column.align, onChange, value }} />
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
};
