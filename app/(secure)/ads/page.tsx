"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/app/_store/authStore";

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import DashboardCard from "@/app/_components/HomeComponent/DashboardCard";
import AdCampaignModal from "@/app/_components/AdModal";
import Navbar from "@/app/_components/Navbar";
import { useRouter } from "next/navigation";

const typeColor = {
  Facebook: "rgb(19, 222, 185)",
  Instagram: "rgb(250, 137, 107)",
  Google: "rgb(73, 190, 255)",
};

const Campaigns = [
  {
    id: "1",
    name: "Promoting Biglytics post",
    accountName: "Biglytics Ad Account",
    status: "Completed",
    type: "Facebook",
    impressions: 0,
    clicks: 0,
    pbg: typeColor.Facebook,
    budget: 3.9,
  }
];

const Ads = () => {
  const [checkLogin, setcheckLogin] = useState<boolean>(false);
  const store = useStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (!store.authUser) {
  //     setcheckLogin(false);
  //     router.push("/account/login");
  //   } else {
  //     setcheckLogin(true);
  //   }
  // }, []);
  return (
    <>
      {/* {checkLogin && (
        <div> */}
      <Navbar />
      <Box sx={{ mt: 15 }}>
        <DashboardCard>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography variant="h5" fontWeight={550}>
              Dashboard
            </Typography>
            <div>
              <AdCampaignModal/>
            </div>
          </Box>

          <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
                mt: 2,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Campaign Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Account Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Impressions
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Clicks
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Budget Spent
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Campaigns.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {account.name}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {account.accountName}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {account.status}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: account.pbg,
                          color: "#fff",
                        }}
                        size="small"
                        label={account.type}
                      ></Chip>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {account.impressions}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {account.clicks}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography color="textSecondary" variant="subtitle2">
                        ${account.budget}k
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </DashboardCard>
      </Box>
      {/* </div>
      )} */}
    </>
  );
};

export default Ads;
