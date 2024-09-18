import React, { useEffect } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import SwiperComponent from "components/common/swiper-component";
import imageurl from "services/images";
import { productDetails } from "redux/store/slice/dashboard/productSlice";
import { useDispatch, useSelector } from "react-redux";

const TrendingProducts = () => {
  const dispatch = useDispatch();
  const product = localStorage.getItem("productsInfo");
  const data = product !== null ? JSON.parse(product) : {};
  const { productsInfo } = useSelector((state) => state.product);
  useEffect(() => {
    if (data?.products === undefined) {
      dispatch(
        productDetails({
          type: "keyword",
          keyword: "Mobiles",
        })
      );
    }
  }, [data?.products, dispatch]);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          background: "#375C65",
          mt: 15,
          padding: { xs: 4, md: 6 },
        }}
      >
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={imageurl.watch}
              alt="First Banner"
              sx={{
                bottom: 0,
                width: "40%",
                maxWidth: "300px",
                position: { sm: "relative", md: "absolute" },
                margin: "auto",
                mb: { sm: 2, md: 0 },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} className="text-center">
            <Typography
              variant="h3"
              sx={{ color: "#fff", whiteSpace: "nowrap" }}
            >
              Explore more.
            </Typography>
            <Typography variant="body2" sx={{ color: "#CDCDCD" }}>
              Shop even more gift options on Amazon.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className="text-center mt-3">
            <Link
              target="_blank"
              href="https://www.amazon.com/deals"
              className="check-now-btn"
              size="small"
              style={{
                background: "transparent",
                color: "#fff",
                border: "2px solid #fff",
                borderRadius: 10,
                fontSize: "16px",
                padding: 6,
              }}
            >
              Shop Now
            </Link>
          </Grid>
        </Grid>
      </Box>

      {/* --------------Products-------------- */}

      <Container className="mt-5">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ color: "#000", fontWeight: 700 }}>
            Trending Products
          </Typography>
        </Box>
        <SwiperComponent slidesData={productsInfo?.products ?? []} />
      </Container>

      {/* ----------add section ---------------- */}
      <Container className="py-5">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                backgroundImage: `url(${imageurl.orangeBackground})`,
                p: "60px 10px",
              }}
            >
              <img
                src="https://m.media-amazon.com/images/I/81NIpE9-5mL._SL1500_.jpg"
                alt="Login-logo"
                style={{ margin: "auto", mixBlendMode: "darken" }}
              />
              <Box textAlign="center" className="d-flex gap-2 flex-column mt-5">
                <Typography variant="h4" sx={{ color: "#fff" }}>
                  Get Upto 10% Off
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Get up to 10% off, on selected items. Limited time offer!
                  "Explore more"
                </Typography>
                <Link
                  className="explore-btn"
                  target="_blank"
                  href="https://www.amazon.com/deals?ref_=nav_cs_gb&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%255C%2522percentOff%255C%2522%253A%255B%255C%25221%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522"
                  sx={{
                    background: "transparent",
                    color: "#fff",
                    border: "1px solid #fff",
                    mx: "auto",
                    textDecoration: "none",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  Explore More
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundImage: `url(${imageurl.darkPinkBackground})`,
                    p: 2,
                  }}
                >
                  <Box
                    textAlign="center"
                    className="d-flex gap-2 flex-column mt-1 mb-4"
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      Get Upto 25% Off
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      Get up to 25% off, on your favorite products today!
                      "Explore more"
                    </Typography>
                    <Link
                      className="explore-btn"
                      target="_blank"
                      href="https://www.amazon.com/deals?ref_=nav_cs_gb&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%255C%2522percentOff%255C%2522%253A%255B%255C%25222%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522"
                      sx={{
                        background: "transparent",
                        color: "#fff",
                        border: "1px solid #fff",
                        padding: "5px",
                        mx: "auto",
                        textDecoration: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Explore More
                    </Link>
                  </Box>
                  <img
                    src="https://m.media-amazon.com/images/I/51EZig0rEAL._AC_SL1500_.jpg"
                    alt="Login-logo"
                    style={{
                      mixBlendMode: "darken",
                      objectFit: "contain",
                      height: 170,
                      margin: "auto",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    backgroundImage: `url(${imageurl.pinkBackground})`,
                    p: 2,
                  }}
                >
                  <img
                    src={imageurl.watch2}
                    alt="Login-logo"
                    style={{ margin: "auto" }}
                  />
                  <Box
                    textAlign="center"
                    className="d-flex gap-2 flex-column mt-1 mb-4"
                  >
                    <Typography variant="h3" sx={{ color: "#000" }}>
                      Get Upto 50% Off
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#000" }}>
                      Get up to 50% off, on exclusive deals. Shop now! "Explore
                      more"
                    </Typography>
                    <Link
                      className="explore-btn"
                      target="_blank"
                      href="https://www.amazon.com/deals?ref_=nav_cs_gb&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%255C%2522percentOff%255C%2522%253A%255B%255C%25223%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522"
                      sx={{
                        background: "transparent",
                        color: "#000",
                        border: "1px solid #000",
                        padding: "5px",
                        mx: "auto",
                        textDecoration: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Explore More
                    </Link>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    backgroundImage: `url(${imageurl.greyBackground})`,
                    p: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    textAlign="center"
                    className="d-flex gap-2 flex-column mt-1 mb-4"
                  >
                    <Typography variant="h3" sx={{ color: "#fff" }}>
                      Get Upto 70% Off
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#fff" }}>
                      Get up to 75% off, on clearance items. Don’t miss out!
                      "Explore more"
                    </Typography>
                    <Link
                      className="explore-btn"
                      target="_blank"
                      href="https://www.amazon.com/deals?ref_=nav_cs_gb&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%255C%2522percentOff%255C%2522%253A%255B%255C%25224%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522"
                      sx={{
                        background: "transparent",
                        color: "#fff",
                        border: "1px solid #fff",
                        padding: "5px",
                        mx: "auto",
                        textDecoration: "none",
                        borderRadius: "5px",
                      }}
                    >
                      Explore More
                    </Link>
                  </Box>
                  <img
                    src="https://m.media-amazon.com/images/I/61x4yN6eUVL._SL1356_.jpg"
                    alt="Login-logo"
                    style={{
                      margin: "auto",
                      mixBlendMode: "darken",
                      height: 195,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TrendingProducts;
