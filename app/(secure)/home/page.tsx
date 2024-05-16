"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/app/_store/authStore";

import { Grid, Box, Container, CircularProgress } from "@mui/material";
import PageContainer from "@/app/_components/HomeComponent/PageContainer";
import ContactsToLead from "@/app/_components/HomeComponent/ContactsToLead";
import AmountSpent from "@/app/_components/HomeComponent/AmountSpent";
import RecentActivity from "@/app/_components/HomeComponent/RecentActivity";
import MonthlyEarnings from "@/app/_components/HomeComponent/MonthlyEarnings";
import AdAccountsSummary from "@/app/_components/HomeComponent/AdAccountsSummary";
import ContactsCreated from "@/app/_components/HomeComponent/ContactsCreated";
import Navbar from "@/app/_components/Navbar/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import SelectManagerAccModal from "@/app/_components/GoogleAds/SelectManagerAccModal";
import { GetRefreshToken } from "@/app/_services/googleService";
import SuccessSnackbar from "@/app/_components/SuccessSnackbarComponent";
import FailureSnackbar from "@/app/_components/FailureSnackbarComponent";

// interface HomeProps {
//   clickToGetManagerId: boolean ;
// }

export default function Home() {
  // const Home: React.FC<HomeProps> = ({ clickToGetManagerId= false }) => {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [failure, setFailure] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { loggedIn, setLoggedIn, setLoggedOut } = useStore((state) => ({
    loggedIn: state.loggedIn,
    setLoggedIn: state.setLoggedIn,
    setLoggedOut: state.setLoggedOut,
  }));
  const [openManagerAccModal, setOpenManagerAccModal] =
    useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    getAccessTokenFromURL();

    if (!loggedIn) {
      console.log("loggedout");
      // router.push('/account/login');
    }
  }, []);

  const searchParams = useSearchParams();

  const getRefreshToken = async (accessTokenGoogle: string) => {
    try {
      setLoader(true);
      const response = await GetRefreshToken(accessTokenGoogle);
      if (response.statusCode == "200") {
        localStorage.setItem("accesstoken_Google", response.responseData);
        setLoader(false);
        const accesstoken_Google =
          localStorage?.getItem("accesstoken_Google") ?? "";
        const managerId = localStorage?.getItem("g_ManagerId");
        const clientId = localStorage?.getItem("g_ClientId");

        if (!accesstoken_Google || !managerId || !clientId) {
          setOpenManagerAccModal(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessTokenFromURL = () => {
    const accesstoken_Google = localStorage?.getItem("accesstoken_Google");
    if (!accesstoken_Google) {
      const accessTokenGoogle: string | null = searchParams.get("code");
      console.log("acc: ", accessTokenGoogle);
      if (accessTokenGoogle) {
        getRefreshToken(decodeURIComponent(accessTokenGoogle));
        console.log("acc: ", accessTokenGoogle);
      }
    } else {
      const g_ManagerId = localStorage?.getItem("g_ManagerId");
      const g_ClientId = localStorage?.getItem("g_ClientId");
      // if(clickToGetManagerId){
      if (!g_ManagerId || !g_ClientId) setOpenManagerAccModal(true);
    }
    // }
  };

  return (
    <>
      {/* {checkLogin && ( */}
      <div>
        <Navbar />
        {loader ? (
          <Container
            maxWidth={false}
            sx={{ display: "flex", width: "fit-content", mt: "20%" }}
          >
            <CircularProgress size={"70px"} />
          </Container>
        ) :
          <>
            {openManagerAccModal ? <SelectManagerAccModal /> : ""}

            <PageContainer title="Dashboard" description="this is Dashboard">
              <Box sx={{ mt: 15 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <AdAccountsSummary />
                  </Grid>

                  <Grid item xs={12} lg={7}>
                    <ContactsCreated />
                  </Grid>

                <Grid item xs={12} lg={5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <AmountSpent />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <AmountSpent />
                    </Grid> */}
                    <Grid item xs={12}>
                      <MonthlyEarnings />
                    </Grid>
                  </Grid>
                </Grid>

                  <Grid item xs={12} lg={5}>
                    <RecentActivity />
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <ContactsToLead />
                  </Grid>
                </Grid>
              </Box>
            </PageContainer>
          </>
        }
      {success ? <SuccessSnackbar openBar={success} message={message} /> : ""}
      {failure ? <FailureSnackbar openBar={failure} message={message} /> : ""}
      </div>
    </>
  );
}
