import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { updateUser, fetchUser } from "../redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const EditUser = (props) => {
  const [state, setState] = useState({
    name: "",
    occupation: "",
    email: "",
    bio: "",
  });

  let history = useHistory();
  const { id } = useParams();

  const { name, occupation, email, bio } = state;

  useEffect(() => {
    props.fetchUser(id);
  }, []);

  useEffect(() => {
    if (props.user) {
      setState({ ...props.user });
    }
  }, [props.user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await props.updateUser(state, id);
    history.push("/");
  };

  const CustomButton = styled.button`
    position: relative;
    width: 95px;
    height: 42px;
    left: 0px;
    top: 5px;
    background: orange;
    color: white;
    border: none;
    border-radius: 4px;
  `;

  return (
    <div>
      {props.loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            value={name}
            name="name"
            type="text"
            label="Name"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="standard-basic"
            value={occupation}
            name="occupation"
            type="text"
            label="occupation"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="standard-basic"
            value={email}
            name="email"
            type="email"
            label="Email"
            onChange={handleInputChange}
          />
          <br />
          <TextField
            id="standard-basic"
            value={bio}
            name="bio"
            type="text"
            label="Bio"
            onChange={handleInputChange}
          />
          <br />
          <CustomButton>Update</CustomButton>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    loading: state.user.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data, id) => dispatch(updateUser(data, id)),
    fetchUser: (id) => dispatch(fetchUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
