import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers, updateUser } from "../redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import { CircularProgress } from "@material-ui/core";

import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "340",
    overflowX: "auto",
  },
  card: {
    paddingRight: 17,
    paddingLeft: 15,
    paddingBottom: 12,
    background: "lavender",
  },
});

const Users = ({ userData, fetchUsers }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUsers();
    updateUser();
  }, []);

  useEffect(() => {
    if (userData.users.length > 0) {
      setLoading(false);
    }
  }, [userData]);

  return (
    <div className="container">
      <Card className={classes.card}>
        <h3>Users</h3>
        {loading && <CircularProgress color="secondary" />}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Id</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Occupation</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Bio</StyledTableCell>
                <StyledTableCell align="right">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.users.map((user, index) => (
                <StyledTableRow key={user.name}>
                  <StyledTableCell align="right">{index + 1}</StyledTableCell>
                  <StyledTableCell align="right">{user.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    {user.occupation}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.bio}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Link
                      to={`/edituser/${user._id}`}
                      style={{ color: "green" }}
                    >
                      <EditIcon />
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

const mapaStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapaDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapaStateToProps, mapaDispatchToProps)(Users);
