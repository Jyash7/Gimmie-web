import React,{} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "swiper/swiper-bundle.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import { truncate } from "lodash";
import { renderStars } from "services/utiles";
import { useNavigate,  } from "react-router-dom";


const SwiperComponent = ({ slidesData }) => {
  const navigate = useNavigate();

  const handleProductClick = (asin) => {
    navigate(`/product/${asin}`);
  }



  return (
    <Swiper
      style={{ padding: "5px" }}
      slidesPerView={4}
      spaceBetween={50}
      breakpoints={{
        100: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
      freeMode={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      modules={[FreeMode, Pagination, Autoplay]}
      className="mySwiper"
    >
      {slidesData?.length > 0 &&
        slidesData.map((product, index) => {
          const starRating = parseFloat(product.product_star_rating) || 0;

          return (
            <SwiperSlide className="p-0" key={index}>
              <Box
                className="product-cards"

                sx={{ cursor: "pointer" }}
              >
                <Box
                  className="card-box"
                  sx={{ height: "100%", width: "100%" }}
                >
                  <Box
                    component="img"
                    src={product.product_photo}
                    alt={product.product_title}
                    sx={{
                      height: 150,
                      width: "100%",
                      objectFit: "contain",
                      mixBlendMode: "darken",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#000",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    mt: 3,
                  }}
                >
                  {truncate(product.product_title, { length: 40 })}
                </Typography>
                <Typography variant="body2">
                  {truncate(product.sales_volume, { length: 25 })}
                </Typography>
                <Typography variant="body2" className="mt-2">
                  {renderStars(starRating)}
                  <span className="mx-4">{product.product_num_ratings}</span>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    mt: 1,
                  }}
                >
                  <Button
                    onClick={() => handleProductClick(product.asin)}
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    className="card-link"
                  >
                    View Product
                    <ArrowRightAltIcon />
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SwiperComponent;
