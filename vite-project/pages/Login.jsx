import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../client.js";
import { Card, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  && {
    font-size: 0.8rem;
    font-weight: 400;
    color: #05161a;
    padding: 0.6rem 4rem;
    margin-bottom: 2rem;
    background-color: #6da5c0;
    box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -webkit-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    -moz-box-shadow: -1px 1px 8px 0px rgba(169, 169, 169, 0.75);
    border-radius: 1rem;
    letter-spacing: 0.04rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
`;

const StyledButtonVariant = styled(Button)`
  && {
    font-size: 0.8rem;
    font-weight: 400;
    color: #a9a9a9;
    padding: 0.1rem 0.8rem;
    margin-bottom: 2rem;
    background-color: #072e33;
    border-radius: 1rem;
    letter-spacing: 0.04rem;
  }

  &:hover {
    transform: scale(1.1);
    background-color: #0f969c;
  }
`;

const StyledTextField = styled(TextField)`
  && {
    background-color: #a9a9a9;
    border-radius: 1rem;
    width: 20rem;
    height: 3.5rem;
  }
`;

const StyledCard = styled(Card)`
  && {
    color: #999999;
    background-color: #05161a;
    border-radius: 1rem;
    box-shadow: -8px 8px 17px 0px rgba(12, 112, 117, 0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10rem auto;
    width: 40rem;
    padding: 6rem 2rem;
  }
`;

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      props.setToken(data);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      <p className="name greeting">
        Welcome to <span className="p">P</span>od<span className="p">P</span>
        ortal!
      </p>
      <StyledCard>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-fields">
            <StyledTextField
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <StyledTextField
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <StyledButton type="submit">Submit</StyledButton>
        </form>
        <p className="alternate-authentication">
          Don't have an account?
          <NavLink to="/signup">
            <StyledButtonVariant onClick={props.toggleForm}>
              SignUp
            </StyledButtonVariant>
          </NavLink>
        </p>
      </StyledCard>
    </>
  );
}

export default Login;
