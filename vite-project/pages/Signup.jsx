import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  @media screen and (min-width: 375px) and (max-width: 800px) {
    && {
      padding: 0.4rem 0.8rem;
      font-size: 0.6rem;
    }
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
  @media screen and (min-width: 375px) and (max-width: 800px) {
    && {
      padding: 0.1rem;
      font-size: 0.6rem;
    }
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
  @media screen and (min-width: 375px) and (max-width: 800px) {
    && {
      width: 20rem;
      padding: 2.5rem 1rem;
    }
  }
`;

function Signup(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      alert("Check your email for verification!");
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
          Already have an account?
          <NavLink to="/login">
            <StyledButtonVariant onClick={props.toggleForm}>
              Login
            </StyledButtonVariant>
          </NavLink>
        </p>
      </StyledCard>
    </>
  );
}

export default Signup;
