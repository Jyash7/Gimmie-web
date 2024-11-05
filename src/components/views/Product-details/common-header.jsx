import React from "react";
import { Box } from "@mui/material";
import imageurl from "services/images";
import { useNavigate } from "react-router-dom";

const CommonHeader = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          background: "#375C65",
          color: "white",
          textAlign: "center",
          cursor: "pointer"

        }}
      >
        <img
          onClick={handleLogoClick}
          src={imageurl.frameLogo}
          alt="Login-logo"
          style={{
            margin: "auto",
            padding: 12,
            width: "40%",
            maxWidth: "250px",
          }}
        />
      </Box>
    </>
  );
};

export default CommonHeader;
