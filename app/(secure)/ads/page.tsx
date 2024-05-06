// "use client";

// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Chip,
//   Button
// } from "@mui/material";

// import DashboardCard from "@/app/_components/HomeComponent/DashboardCard";
// import AdCampaignModal from "@/app/_components/Ads/AdCampaignModal";
// import Navbar from "@/app/_components/Navbar";
// import { getAllCampaignsService } from "@/app/_services/adAccountService";
// import useAdStore from "@/app/_store/adStore";
// import { useRouter, useSearchParams } from "next/navigation";

// const typeColor = {
//   Facebook: "rgb(19, 222, 185)",
//   Instagram: "rgb(250, 137, 107)",
//   Google: "rgb(73, 190, 255)",
// };

// const Ads = () => {
//   const type = "Facebook";
//   const pbg = typeColor.Facebook;
//   const impressions = 0;
//   const clicks = 0;

//   const router = useRouter()
//   const searchParams = useSearchParams()

//   const { ads, setAds, removeAds } = useAdStore((state) => ({
//     ads: state.ads,
//     setAds: state.setAds,
//     removeAds: state.removeAds,
//   }));

//   useEffect(() => {
//     getCampaigns();
//   }, []);

//   const getCampaigns = async () => {
//     // try {
//     //   const response = await getAllCampaignsService();
//     //   if (response.statusCode == "200") {
//     //     setCampaigns(response.responseData);
//     //   }
//     // } catch (error) {
//     //   console.error(error);
//     // }
//   };

//   const CreateAdsets = useCallback(
//     // (name1: string, value: string, name2:string, value2: string) => {
//     //   const params = new URLSearchParams(searchParams.toString())
//     //   params.set(name1, value);
//     //   params.set(name2, value2);
  
//     //   return params.toString()
//     // },
//     // [searchParams]
//   )

//   return (
//     <>
//       <Navbar />
//       <Box sx={{ mt: 15 }}>
//         <DashboardCard>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexDirection: "row",
//             }}
//           >
//             <Typography variant="h5" fontWeight={550}>
//               Ad Campaigns
//             </Typography>
//             <div>
//               <AdCampaignModal />
//             </div>
//           </Box>

//           <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
//             <Table
//               aria-label="simple table"
//               sx={{
//                 whiteSpace: "nowrap",
//                 mt: 2,
//               }}
//             >
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       Campaign Name
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       Objective
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       Type
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       Status
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       Impressions
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="subtitle2" fontWeight={600}>
//                       Clicks
//                     </Typography>
//                   </TableCell>
//                   <TableCell align="right"></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {campaigns?.map((data, key) => (
//                   <TableRow key={data.campaignId}>
//                     <TableCell>
//                       <Typography
//                         sx={{
//                           fontSize: "15px",
//                           fontWeight: "500",
//                         }}
//                       >
//                         {data.campaignName}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           fontSize: "15px",
//                           fontWeight: "500",
//                         }}
//                       >
//                         {data.objective}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Chip
//                         sx={{
//                           px: "4px",
//                           backgroundColor: pbg,
//                           color: "#fff",
//                         }}
//                         size="small"
//                         label={type}
//                       ></Chip>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Box
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Typography variant="subtitle2" fontWeight={600}>
//                           {data.status}
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Typography
//                         color="textSecondary"
//                         variant="subtitle2"
//                         fontWeight={400}
//                       >
//                         {impressions}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Typography
//                         color="textSecondary"
//                         variant="subtitle2"
//                         fontWeight={400}
//                       >
//                         {clicks}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="right">
//                       <Button 
//                        onClick={() => {
//                         router.push('/adsets' + '?' + CreateAdsets('selectedCampaignId' ,data.campaignId, 'selectedObjective', data.objective))
//                       }}
//                       variant="contained"
//                       sx={{
//                         marginRight: "10px",
//                         backgroundColor: "#597FB5 !important",
//                         color: "#fff !important",
//                         "&:hover": {
//                           backgroundColor: "#405D80 !important",
//                         },
//                       }}>
//                         Create ad
//                       </Button>
//                     {/* <AdSetModal selectedCampaign={data.campaignId} selectedObjective={data.objective}/> */}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </Box>
//         </DashboardCard>
//       </Box>
//     </>
//   );
// };

// export default Ads;
