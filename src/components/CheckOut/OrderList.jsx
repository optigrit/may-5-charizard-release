import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { courseOrderAPI } from "../../api/requests/courses/courseOrderAPI";

const OrderList = ({ yourOrder, price, getAppliedCouponIds }) => {
  const [coupon, setCoupon] = useState("");
  const [couponValidate, setCouponValidate] = useState(true);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [promoCodeRes, setPromoCodeRes] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [totalCal, setTotalCal] = useState({
    Total: 0,
    discountPrice: 0,
  });

  const GetPromoCode = async () => {
    setIsLoading(true);
    await courseOrderAPI.getPromoCode(coupon)
      .then((data) => {
        setIsLoading(false);
        data?.length ? setCouponValidate(true) : setCouponValidate(false);
        setPromoCodeRes(data && data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (yourOrder?.length) {
      var subTotalTemp = 0;
      var discountTemp = 0;
      // new Set(postData)
      promoCodeRes?.map((item) => {
        subTotalTemp = price - item?.discountPrice;
        discountTemp = item?.discountPrice;
      });

      setTotalCal((prevState) => ({
        ...prevState,
        Total: Math.floor(subTotalTemp),
        discountPrice: Math.floor(discountTemp),
      }));
    }
  }, [promoCodeRes]);

  return (
    <>
      <Grid item xs={12} md={6} sx={{ px: "16px", mt: {xs:0,md:7 }}}>
        <Typography variant="overline" sx={{ color: "#868686" }}>
          Your orders
        </Typography>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", py: 4 }}>
          {yourOrder?.map((item, index) => {
            return (
              <OrderItem item={item} key={index} promoCodeRes={promoCodeRes} />
            );
          })}
          <Typography variant="overline" sx={{ color: "#868686" }}>
            Apply Coupon
          </Typography>

          <Divider sx={{ mb: 4 }} />
          {appliedCoupon ? (
            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
              <Typography
                // display="inline"
                variant="caption"
                textAlign={"right"}
                sx={{
                  color: "#888888",
                  lineHeight: "18px",
                }}
              >
                Applied coupon {coupon}
              </Typography>
            </Box>
          ) : null}
          <form>
            <Box sx={{ display: "flex" }}>
              <TextField
                error={!couponValidate ? true : false}
                helperText={!couponValidate ? "invalid coupon." : null}
                variant="standard"
                placeholder="Enter Coupon"
                fullWidth={true}
                sx={{ display: "inline" }}
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value);
                  // setCouponValidate(true);
                }}
              />
              <LoadingButton
                variant={"contained"}
                loadingPosition="start"
                size={"small"}
                display="inline"
                sx={{ borderRadius: "0px", height: "32px", width: "120px" }}
                color={!couponValidate ? "ErrorBtn" : "primary"}
                onClick={() => {
                  GetPromoCode();
                }}
                loading={isLoading}
                disabled={!coupon}
              >
                apply
              </LoadingButton>
            </Box>
          </form>

          <Divider sx={{ pt: 4 }} />

          {promoCodeRes?.length ? (
            <Box>
              <Box
                sx={{
                  pt: 4,
                  pb: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "18px" }}
                >
                  Sub Total
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "18px" }}
                >
                  {price}
                </Typography>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "18px" }}
                >
                  Discount Amount
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", fontSize: "18px" }}
                >
                  ₹ {totalCal?.discountPrice}
                </Typography>
              </Box>
            </Box>
          ) : null}

          <Box
            sx={{
              pb: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", fontSize: "18px" }}
            >
              Total
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", fontSize: "18px" }}
            >
              ₹ {promoCodeRes?.length ? totalCal?.Total : price}
            </Typography>
          </Box>
        </Box>
        <Divider />
      </Grid>
    </>
  );
};

export default OrderList;
