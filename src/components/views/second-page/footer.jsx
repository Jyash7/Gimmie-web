import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import imageurl from "services/images";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 8,
        paddingY: 1,
        backgroundImage: `url(${imageurl.footerBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundPosition:"100%",
      }}
    >
      <Grid container className="footerSection">
        <Grid item xs={12} md={4} className="d-flex flex-column gap-4">
          <img
            src={imageurl.gimmitext}
            alt="Gimmi Text"
            style={{
              maxWidth: "40%",
              height: "auto",
              margin: "auto",
            }}
          />
          <img
            src={imageurl.footerImg}
            alt="Footer Logo"
            style={{
              maxWidth: "30%",
              height: "auto",
              margin: "auto",
            }}
          />
        </Grid>

        <Grid item xs={11} md={4} className="m-auto">
          <Box sx={{ p: 8 }}>
            <Typography
              variant="h3"
              sx={{
                color: "#0C101E",
                marginBottom: 2,
                fontWeight: 500,
                lineHeight: 1.2,
              }}
            >
              Download Our App On Play Store
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#000", marginBottom: 2 }}
            >
              Coming Soon...
            </Typography>

            <Box className="d-flex gap-4">
              <img
                src={imageurl.googleplay}
                alt="Google Play Store"
                style={{
                  width: "100%",
                  maxWidth: "120px",
                }}
              />

              <img
                src={imageurl.appstore}
                alt="Apple App Store"
                style={{
                  width: "100%",
                  maxWidth: "120px",
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box>
            <Typography
              variant="h6"
              sx={{ color: "#000", textAlign: "center", mb: 2 }}
            >
              Scan To Download
              <br />
              The App!
            </Typography>
            <img
              src={imageurl.qr}
              alt="Decorative Flower"
              style={{
                margin: "auto",
                width: "30%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Footer;
