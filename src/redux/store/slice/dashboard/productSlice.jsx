import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "services/Api";
import AxiosDefault from "services/AxiosDefault";

const product = localStorage.getItem("productsInfo");
const productunder50 = localStorage.getItem("productsInfo50");

const productData = JSON.parse(product);
const productData50 = JSON.parse(productunder50);

const initialState = {
  loading: false,
  productsInfo: productData ?? {},
  productsInfo50: productData50 ?? {},
  error: null,
};

export const productDetails = createAsyncThunk(
  "product/details",
  async ({ rejectWithValue }) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.PRODUCT_DETAILS,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        status: err.response?.data?.status || "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  }
);
export const productDetailsUnder50 = createAsyncThunk(
  "product/details/under50",
  async ({ rejectWithValue }) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: Api.PRODUCT_DETAILS_UNDER_50,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        status: err.response?.data?.status || "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  }
);
export const productDetailsSingle = createAsyncThunk(
  "product/details/single",
  async (asin, { rejectWithValue }) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.PRODUCT_DETAILS_SINGLE}?asin=${asin}`,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        status: err.response?.data?.status || "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  }
);
export const productDetailsSearch = createAsyncThunk(
  "product/details/search",
  async (search, { rejectWithValue }) => {
    try {
      const response = await AxiosDefault({
        method: "GET",
        url: `${Api.PRODUCT_DETAILS_SEARCH}${search}`,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        status: err.response?.data?.status || "error",
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productDetails.fulfilled, (state, { payload }) => {
        console.log("this is a pending product", payload);
        state.loading = false;
        state.productsInfo = payload?.data ?? {};
        state.error = null;
        if (payload?.status === "OK") {
          localStorage.setItem("productsInfo", JSON.stringify(payload?.data));
        }
      })
      .addCase(productDetails.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(productDetailsUnder50.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productDetailsUnder50.fulfilled, (state, { payload }) => {
        console.log("this is a pending product", payload);
        state.loading = false;
        state.productsInfo50 = payload?.data ?? {};
        state.error = null;
        if (payload?.status === "OK") {
          localStorage.setItem("productsInfo50", JSON.stringify(payload?.data));
        }
      })
      .addCase(productDetailsUnder50.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(productDetailsSingle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productDetailsSingle.fulfilled, (state, { payload }) => {
        console.log("this is a pending product", payload);
        state.loading = false;
        state.productsInfoDetail = payload?.data ?? {};
        state.error = null;
      })
      .addCase(productDetailsSingle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(productDetailsSearch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productsInfoDetail = payload?.data ?? {};
        state.error = null;
      });
  },
});

export default productSlice.reducer;
