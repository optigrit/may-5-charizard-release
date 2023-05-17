import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "@mui/material";
import GoogleIcon from "../../assets/SignInSignUp/icon/google-icon.svg";

const GoogleSignInButton = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const navigate = useNavigate();

  const onSuccess = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}loginthroughgoogle`,
        {
          firstName: data.profileObj.givenName ?? "",
          lastName: data.profileObj.familyName ?? data.profileObj.givenName,
          email: data.profileObj.email,
          profilePhotoLink: data.profileObj.imageUrl ?? "",
          username: data.profileObj.email,
        }
      );
      localStorage.setItem("Token", response?.data.token);
      navigate("/", { replace: true });
    } catch (error) {
      localStorage.setItem("Token", "");
    }
  };
  const onFailure = (data) => {};

  const svgIcon = (
    <Icon sx={{ lineHeight: "0.75" }}>
      <img alt="edit" src={GoogleIcon} />
    </Icon>
  );

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_PUBLIC_GOOGLE_CLIENT_ID}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      isSignedIn={true}
      render={(renderProps) => (
        <Button
          fullWidth
          onClick={renderProps.onClick}
          variant="outlined"
          startIcon={svgIcon}
          sx={{
            textTransform: "none",
            fontWeight: "400",
            mb: 2,
            pt: 1,
            pb: 1,
            borderColor: "#EBEBEB",
            color: "#787878",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
        >
          Sign in with Google
        </Button>
      )}
    />
  );
};

export default GoogleSignInButton;
