/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch } from "react-redux";

// Validations Rules
import Validations from "utils/Validations/index";
import { loginThunk } from "redux/Thunks/Thunks";

// Constants
import Constants from "utils/Constants";

// Sessions
import Sessions from "utils/Sessions";

function Basic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credentialError, setCredentialError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    e.preventDefault();
    if (emailError !== "" || passwordError !== "" || email === "" || password === "") {
      if (email === "") {
        setEmailError(Constants.FIELD_REQUIRED);
      } else {
        setEmailError(emailError);
      }
      if (password === "") {
        setPasswordError(Constants.FIELD_REQUIRED);
      } else {
        setPasswordError(passwordError);
      }
      return;
    }

    setLoading(true);

    const body = { email, password };

    const res = await dispatch(loginThunk(body));

    if (res.error === undefined) {
      setCredentialError(false);
      setLoading(false);
    } else {
      setCredentialError(true);
      setLoading(false);
    }

    if (res.payload.status) {
      if (email !== "") {
        Sessions.setUserToken(res.payload.data.payload.token);
        Sessions.setUserEmail(email);
      }
      navigate("/dashboard");
    }
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError(Validations.validate("email", value, null, null, true));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError(Validations.validate("password", value, 6, 30, true));
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDTypography textAlign="center" color="error" mt={1}>
          {credentialError ? Constants.INVALID_CREDENTIAL : ""}
        </MDTypography>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" onChange={handleEmailChange} fullWidth />
              <MDTypography variant="button" color="error">
                {emailError}
              </MDTypography>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" onChange={handlePasswordChange} fullWidth />
              <MDTypography variant="button" color="error">
                {passwordError}
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                disabled={loading}
                onClick={handleLogin}
                fullWidth
              >
                {loading ? `Loading...` : "Sign In"}
              </MDButton>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
