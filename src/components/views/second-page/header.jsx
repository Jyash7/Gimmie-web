import { Box, Typography } from "@mui/material";
import React from "react";
import SecondPageBanner from "./banner";
import Deals from "./deals";
import TrendingProducts from "./trending-products";
import AllProduct from "./all-product";
import Footer from "./footer";
import imageurl from "services/images";
import { useNavigate } from "react-router-dom";

const HeaderSecond = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <Box sx={{ background: "#fff" }}>
      <Box sx={{display:'flex', justifyContent:"center", alignItems:'center'}}>
        <Box>
          <img
            onClick={handleLogoClick}
            src={imageurl.secondLogo}
            alt="Login-logo"
            style={{
              margin: "auto",
              padding: 10,
              maxWidth: "90%",
              mixBlendMode: "darken",
            }}
          />
        </Box>
        <Box>

          <Typography
            sx={{
              color: "rgba(55, 92, 101, 1)", 
              fontWeight:400,
            }}
            variant="h2"
          >
            Gimmie
          </Typography>
        </Box>
      </Box>


      <SecondPageBanner />
      <Deals />
      <TrendingProducts />
      <AllProduct />
      <Footer />
    </Box>
  );
};

export default HeaderSecond;
