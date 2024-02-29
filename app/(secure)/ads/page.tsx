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
import { getAllCampaignsService } from "@/app/_services/adAccountService";

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
  const [name, setName] = useState("");
  //const [type, setType] = useState("");
  const type = "Facebook";
  const  pbg= typeColor.Facebook;

  const  impressions= 0;
  const clicks = 0;

  const [objective, setObjective] = useState("");
  const [status, setStatus] = useState("");
  const store = useStore();
  const router = useRouter();


  const getCampaigns = async (e: any) => {
    e.preventDefault();
    try {
            const response = await getAllCampaignsService();
            
            if(response.statusCode=="200"){
              setObjective(response.responseData.ad_accountId)
              setName(response.responseData.campaignName)
              setStatus(response.responseData.status)

                // showSuccessToast("Account Verified Successfully!");
                
             //   setTimeout(() => {
             //     }, 3000);   
                // showSuccessToast("Please login again");
            }
            //check sttus code, if 200 then route to login page.        
        }
      
    catch (error) {
        //showErrorToast("Verification failed.");
         console.error(error);
    }
    }

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
                      Objective
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
                  {/* <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight={600}>
                      Budget Spent
                    </Typography>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {Campaigns.map((account) => ( */}
                  <TableRow >
                    {/* //key={account.id}> */}
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {/* {account.name} */}
                        {name}
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
                            {/* {account.accountName} */}
                            {objective}

                          </Typography>
                          <Typography
                            color="textSecondary"
                            sx={{
                              fontSize: "13px",
                            }}
                          >
                            {status}
                            {/* {account.status} */}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: pbg,
                          color: "#fff",
                        }}
                        size="small"
                        label={type}
                      ></Chip>
                    </TableCell>

                    <TableCell align="right">
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {impressions}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color="textSecondary"
                        variant="subtitle2"
                        fontWeight={400}
                      >
                        {clicks}
                      </Typography>
                    </TableCell>

                    {/* <TableCell align="right">
                      <Typography color="textSecondary" variant="subtitle2">
                        ${account.budget}k
                      </Typography>
                    </TableCell> */}
                  </TableRow>
                {/* ))} */}
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
