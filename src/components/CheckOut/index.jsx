import { Button, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { TextFirldInput } from "../TextField";

const ShipingDetails = ({ price }) => {
  const userProfile = useSelector((state) => state.UserReducer.userData);

  return (
    <>
      <Grid item xs={12} md={6} sx={{ px: "16px" }}>
        <Typography variant="h4" sx={{ mb: 2 ,fontSize:{xs:"28px",md:"34px"}}}>
          Checkout
        </Typography>
        <Typography variant="overline" sx={{ color: "#868686" }}>
          Shiping details
        </Typography>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column", py: 4 }}>
          <Box
            sx={{
              pb: 0.5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "600" }}>
              {userProfile?.userData?.username}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "600" }}>
              {userProfile?.userData?.email}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: "600", pb: 0.5 }}>
            Vasaatan 16{" "}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "600", pb: 0.5 }}>
            111 20 Stockholm{" "}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "600" }}>
            Sweden
          </Typography>
        </Box>

        <Typography variant="overline" sx={{ color: "#868686" }}>
          Shiping details
        </Typography>
        <Divider />
        <Box sx={{ py: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "row", pb: 3 }}>
            <TextFirldInput
              variant="outlined"
              label="Name on card"
              size="small"
              fullWidth
              sx={{ mr: "8px" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pb: 3 }}>
            <TextFirldInput
              variant="outlined"
              label="Card number"
              size="small"
              fullWidth
              sx={{ mr: "8px" }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pb: 3 }}>
            <TextFirldInput
              variant="outlined"
              label="Valid"
              size="small"
              fullWidth
              sx={{ mr: "8px" }}
            />
            <TextFirldInput
              variant="outlined"
              label="CVV Code"
              size="small"
              fullWidth
              sx={{ ml: "8px" }}
            />
          </Box>
          <Button
            fullWidth={true}
            variant={"contained"}
            size={"small"}
            sx={{ py: 1, borderRadius: "0px" }}
          >
            PURCHASE ₹ {price}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default ShipingDetails;
