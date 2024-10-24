import React, { useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Skeleton,
  List,
  ListItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommonHeader from "./common-header";
import Footer from "../second-page/footer";
import RelatedProducts from "./related-products";
import { truncate } from "lodash";
import { renderStars } from "services/utiles";
import { productDetailsSingle } from "redux/store/slice/dashboard/productSlice";

const ProductDetails = () => {
  const { asin } = useParams();
  const dispatch = useDispatch();
  const { productsInfoDetail, error, loading } = useSelector(
    (state) => state.product
  );
  const starRating = parseFloat(productsInfoDetail?.product_star_rating) || 0;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (asin) {
      dispatch(productDetailsSingle(asin));
    }
  }, [asin, dispatch]);
  if (error) return <div>{error.message}</div>;
  const productDetails = productsInfoDetail?.product_details || {};

  return (
    <Box sx={{ background: "#fff" }} id="top" >
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
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={400}
                    sx={{ borderRadius: 4 }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={productsInfoDetail?.product_photo}
                    alt="Product"
                    sx={{
                      height: 400,
                      width: "100%",
                      objectFit: "contain",
                      mixBlendMode: "darken",
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box
              sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.2 }}
            >
              {loading ? (
                <>
                  <Skeleton variant="text" width="80%" height={40} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={40} />
                  <Skeleton variant="text" width="60%" height={30} />
                </>
              ) : (
                <>
                  <Typography
                    variant="h5"
                    sx={{ color: "#000", fontWeight: 700, lineHeight: 1.3 }}
                  >
                    {productsInfoDetail?.product_title}
                  </Typography>
                  <Typography variant="body2">
                    {truncate(productsInfoDetail?.product_description, {
                      length: 200,
                    })}
                  </Typography>
                  <Typography variant="body2">
                    {renderStars(starRating)}
                    <span className="mx-4">
                      {productsInfoDetail?.product_num_ratings}
                    </span>
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "#000", fontWeight: 700 }}
                  >
                    {productsInfoDetail?.product_price}
                  </Typography>
                  <Link
                    href={`${productsInfoDetail?.product_url}?customId=${'gimmieai04-20'}`}
                    className="all-btn"
                    target="_blank"
                  >
                    Buy Now
                  </Link>
                  <Typography
                    variant="body2"
                    sx={{ color: "#375C65", fontWeight: 600 }}
                  >
                    As an Amazon Associate Gimmie earns from qualifying purchases.
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>



        <Box>
          <Typography variant="h4" sx={{ color: "#000", mt: 5 }}>
            Product Details
          </Typography>
          <List>
            {loading
              ? [...Array(5)].map((_, index) => (
                <ListItem key={index}>
                  <Skeleton variant="text" width="80%" height={20} />
                </ListItem>
              ))
              : Object.keys(productDetails).map((key) => (
                <ListItem
                  key={key}
                  sx={{ display: "flex", alignItems: "center", justifyContent: 'space-between', gap: 10 }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "black" }}
                  >
                    {key}
                  </Typography>
                  <Typography variant="body2">
                    {productDetails[key]}
                  </Typography>
                </ListItem>
              ))}
          </List>
        </Box>

        <Box>
          <Typography variant="h4" sx={{ color: "#000", mt: 4 }}>
            About Gift
          </Typography>
          {loading ? (
            <Skeleton variant="text" width="100%" height={60} />
          ) : (
            <Typography variant="body2" sx={{ mt: 2 }}>
              {truncate(productsInfoDetail?.about_product, { length: 1000 })}
            </Typography>
          )}
        </Box>

        {/* <ReviewsComponent /> */}
        <RelatedProducts />
      </Container>
      <Footer />
    </Box>
  );
};

export default ProductDetails;
