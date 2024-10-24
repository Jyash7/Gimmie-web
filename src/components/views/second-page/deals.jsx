import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { truncate } from "lodash";
import { renderStars } from "services/utiles";
import { useNavigate } from "react-router-dom";

const Deals = () => {
  const navigate = useNavigate();

  const { productsInfo, loading, error } = useSelector(
    (state) => state.product
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const topTwoProducts = productsInfo?.products?.slice(0, 4) || [];
  useEffect(() => {
    if (topTwoProducts.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topTwoProducts.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [topTwoProducts.length]);

  if (loading || error) {
    return (
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </Grid>
    );
  }


  if (topTwoProducts.length === 0) {
    return (
      <Grid item xs={12} sm={6} md={3} sx={{ mt: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </Grid>
    );
  }

  const handleProductClick = (asin) => {
    navigate(`/product/${asin}`);
  };

  const mainProduct = topTwoProducts[currentIndex];
  const starRating = parseFloat(mainProduct.product_star_rating) || 0;

  return (
    <Box sx={{
      background: "#fff",
    }}>
      <Container className="mt-5" id="target-section">
        <Typography variant="h3" sx={{ color: "#000", fontWeight: 700, mb: 2 }}>
          Deals For The Day
        </Typography>
        <Grid
          container
          sx={{
            outline: "1px solid rgb(179, 179, 179)",
            border: "2px solid rgba(179, 179, 179, 1)",
            borderRadius: 8,
            padding: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Grid item xs={12} md={8}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Grid container spacing={2}>
                  {productsInfo?.products?.slice(0, 4).map((image, index) => (
                    <Grid item md={12} xs={3} key={index}>
                      <Box
                        component="img"
                        src={image.product_photo}
                        alt="cards"
                        sx={{
                          height: 100,
                          borderRadius: 1,
                          border: "2px solid rgba(179, 179, 179, 1)",
                          width: 100,
                          p: 1,
                          objectFit: "contain",
                          mixBlendMode: "darken",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12} md={9}>
                <Box
                  component="img"
                  src={mainProduct.product_photo}
                  alt="cards"
                  sx={{
                    height: 400,
                    width: "100%",
                    objectFit: "contain",
                    mixBlendMode: "darken",
                    marginTop: 2,
                    borderRadius: 4,
                    marginBottom: 2,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Product details */}
          <Grid item xs={12} md={4}>
            <Box sx={{
              display: "flex", flexDirection: "column", gap: 1,
            }}>
              <Typography
                variant="h4"
                sx={{ color: "#000", fontWeight: 700, lineHeight: 1.3 }}
              >
                {truncate(mainProduct.product_title, { length: 80 })}
              </Typography>
              <Typography variant="body2">
                {truncate(mainProduct.sales_volume, { length: 80 })}
              </Typography>
              <Typography variant="body2">
                {renderStars(starRating)}
                <span className="mx-4">{mainProduct.product_num_ratings}</span>
              </Typography>
              <Typography variant="h4" sx={{ color: "#000", fontWeight: 700 }}>
                {mainProduct.product_price}
              </Typography>
              <Button
                onClick={() => handleProductClick(mainProduct.asin)}
                className="all-btn"
              >
                Check Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            "& .swiper-button-prev::after, & .swiper-button-next::after": {
              fontSize: "24px !important",
            },
          }}
        >
          <Swiper
            className="swiper-container"
            cssMode={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            slidesPerView={2}
            breakpoints={{
              100: {
                slidesPerView: 1,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
          >
            {productsInfo?.products?.length > 0 &&
              productsInfo?.products?.map((slide, index) => {
                const starRating = parseFloat(slide.product_star_rating) || 0;

                return (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        p: "20px 20px",
                        display: "flex",
                        flexDirection: "column",
                        border: "2px solid rgba(179, 179, 179, 1)",
                        borderRadius: 6,
                        gap: 1,
                        justifyContent: "space-evenly",

                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ color: "#000", lineHeight: 1.3 }}
                      >
                        {truncate(slide.product_title, { length: 25 })}
                      </Typography>
                      <Typography variant="body2">
                        {truncate(slide.sales_volume, { length: 80 })}
                      </Typography>
                      <Typography variant="body2">
                        {renderStars(starRating)}
                        <span className="mx-4">
                          {slide.product_num_ratings}
                        </span>
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{ color: "#000", fontWeight: 700 }}
                      >
                        {slide.product_price}
                      </Typography>
                      <Button
                        onClick={() => handleProductClick(slide.asin)}
                        className="all-btn"
                      >
                        Check Now
                      </Button>
                    </Box>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

export default Deals;
