import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";

import { useDispatch } from "react-redux";

import { updateUser, fetchUser } from "../redux";

import { useHistory, useParams } from "react-router-dom";

import styled from "styled-components";

// TODO : FIX EDIT OF USER
const EditUser = ({ user }) => {
  const [state, setState] = useState({
    name: "",
    occupation: "",
    email: "",
    bio: "",
  });

  let history = useHistory();
  const { id } = useParams();

  const { name, occupation, email, bio } = state;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUser(state, id));
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
      <h3>Edit User</h3>
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
    </div>
  );
};

const mapaStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () => dispatch(updateUser()),
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(mapaStateToProps, mapDispatchToProps)(EditUser);
