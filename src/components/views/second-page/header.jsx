import React, { useEffect, useState, useRef } from "react";
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import SecondPageBanner from "./banner";
import Deals from "./deals";
import TrendingProducts from "./trending-products";
import AllProduct from "./all-product";
import Footer from "./footer";
import imageurl from "services/images";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { productDetailsSearch } from "redux/store/slice/dashboard/productSlice";

const truncateTitle = (title, maxLength = 40) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
};

const HeaderSecond = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsInfoDetail, loading } = useSelector((state) => state.product);
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const products = productsInfoDetail?.products ?? [];
    setProductList(products);
  }, [productsInfoDetail]);

  const handleProductSelect = (event, newValue) => {
    if (newValue?.asin) {
      navigate(`/product/${newValue.asin}`);
    }
  };

  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchInput.trim()) {
      dispatch(productDetailsSearch(searchInput));
      setIsExpanded(true);

      if (searchBarRef.current) {
        searchBarRef.current.focus();
      }
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box sx={{ background: "#fff", position: "relative" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            flexDirection: { xs: "column", md: "row" }, // Column for small screens, row for larger screens
          }}
        >
          {/* Empty box for flexible space */}
          <Box className="empty" sx={{ flex: 1 }}></Box>

          {/* Logo and Title */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
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
                  fontWeight: 400,
                }}
                variant="h2"
              >
                Gimmie
              </Typography>
            </Box>
          </Box>

          {/* Search Bar Container */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: "center", md: "right" }, 
              marginRight: { md: "10px", xs: 0 },
              marginTop: { xs: 2, md: 0 }, 
            }}
          >
            {/* Search Icon */}
            {!isExpanded && (
              <IconButton onClick={handleIconClick} disableRipple={true}>
                <SearchIcon />
              </IconButton>
            )}
            <Box
              sx={{
                display: isExpanded ? "block" : "none",
                width: isExpanded ? { xs: "200px", md: "400px" } : "0px",
                opacity: isExpanded ? 1 : 0,
                position: { xs: "relative", md: "absolute" }, 
                right: { md: "20px" },
                top: { md: "50%" },
                transform: { md: "translateY(-50%)", xs: "translateY(-20%)" }, 
                transition: "width 0.5s ease-in-out, opacity 0.3s ease-in-out",
                overflow: "hidden",
                ml: 2,
                borderRadius: "25px",
                boxShadow: isExpanded
                  ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                  : "none",
              }}
            >
              <Autocomplete
                options={productList}
                getOptionLabel={(option) =>
                  truncateTitle(option.product_title || "Unknown Product")
                }
                onChange={handleProductSelect}
                renderOption={(props, option) => (
                  <li {...props} key={option.asin}>
                    {truncateTitle(option.product_title || "Unknown Product")}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Search for Gifts"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                    inputRef={searchBarRef}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "25px",
                      },
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                isOptionEqualToValue={(option, value) => option.asin === value}
              />
            </Box>
          </Box>
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
