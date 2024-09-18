import React, { useEffect } from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommonHeader from "./common-header";
import Footer from "../second-page/footer";
import ReviewsComponent from "./reviews";
import RelatedProducts from "./related-products";
import { truncate } from "lodash";
// import { renderStars } from "services/utiles";
import { productDetailsSingle } from "redux/store/slice/dashboard/productSlice";

const ProductDetails = () => {
  const { asin } = useParams();
  const dispatch = useDispatch();

  const { loading, productsInfoDetail, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (asin) {
      dispatch(productDetailsSingle(asin));
    }
  }, [asin, dispatch]);

  if (error) return <div>{error.message}</div>;

  const product = productsInfoDetail?.data || {};

  return (
    <Box sx={{ background: "#fff" }}>
      <CommonHeader />
      <Container>
        <Grid
          container
          sx={{
            border: "2px solid rgb(179, 179, 179)",
            borderRadius: 8,
            padding: 4,
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={7}>
            <Grid container>
              <Grid item xs={12} md={9}>
                <Box
                  component="img"
                  src={productsInfoDetail.product_photo}
                  alt="Product"
                  sx={{
                    height: 400,
                    width: "100%",
                    objectFit: "contain",
                    mixBlendMode: "darken",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.2 }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#000", fontWeight: 700, lineHeight: 1.3 }}
              >
                {productsInfoDetail?.product_title}
              </Typography>
              <Typography variant="body2">
                {truncate(productsInfoDetail.product_description, { length: 200 })}
              </Typography>
              {/* <Typography variant="body2">
                {renderStars(productsInfoDetail.product_star_rating)}
                <span className="mx-2">{productsInfoDetail.product_num_ratings}</span>
              </Typography> */}
              <Typography variant="h4" sx={{ color: "#000", fontWeight: 700 }}>
                {productsInfoDetail.product_price}
              </Typography>
              <Link
                href={`${productsInfoDetail.product_url}?id=customId`}
                className="all-btn"
                target="_blank"
              >
                Buy Now
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Typography variant="h4" sx={{ color: "#000", mt: 3 }}>
            Color
          </Typography>
          <Typography variant="body2" sx={{ color: "#000", fontWeight: 700 }}>
            {productsInfoDetail?.product_details?.Color}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ color: "#000", mt: 4 }}>
            About Product
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {truncate(productsInfoDetail?.about_product, { length: 1000 })}
          </Typography>
        </Box>
        <ReviewsComponent />
        <RelatedProducts />
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductDetails;
