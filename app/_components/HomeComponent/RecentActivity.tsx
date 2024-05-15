"use client";

import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { InsightsData } from "@/app/_models/insight.model";
import { GetRecentActivityService } from "@/app/_services/insightsService";
import { Typography } from "@mui/material";

const RecentActivity = () => {
  const [insights, setInsights] = useState<InsightsData[]>([]);

  useEffect(() => {
    getRecentActivity();
  }, []);

  const getRecentActivity = async () => {
    try {
      const response = await GetRecentActivityService();
      if (response.statusCode === "200") {
        setInsights(response.responseData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const colors = ['primary', 'secondary', 'success', 'warning', 'info'];
  return (
    <DashboardCard title="Recent Activity">
      <>
        <Timeline
          className="theme-timeline"
          // nonce={undefined}
          // onResize={undefined}
          // onResizeCapture={undefined}
          sx={{
            p: 0,
            // mb: "-40px",
            "& .MuiTimelineConnector-root": {
              width: "1px",
              backgroundColor: "#efefef",
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {insights?.map((data, key) => (
            <TimelineItem key={data.id} sx={{ alignItems: "center" }}>
              <TimelineOppositeContent>
                {data.dateTime.split(" ")[0]} <br />
                {data.dateTime.slice(data.dateTime.indexOf(" ") + 1)}
              </TimelineOppositeContent>

              <TimelineSeparator>                
              <TimelineDot color={colors[key % colors.length] as 
                "primary" | "secondary" | "success" | "warning" | "info"} variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ fontWeight: (key % 2 !== 0) ? 'bold' : 'normal' }}>
{data.activity}</TimelineContent>
            </TimelineItem>
          ))}

          {/* <TimelineItem>
            <TimelineOppositeContent>10:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New lead recorded</Typography>{' '}
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Ads viewed by lead</TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning" variant="outlined" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography fontWeight="600">New clicks</Typography>
            </TimelineContent>
          </TimelineItem>
          
          <TimelineItem>
            <TimelineOppositeContent>12:00 am</TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success" variant="outlined" />
            </TimelineSeparator>
            <TimelineContent>Anlytics Updated</TimelineContent>
          </TimelineItem> */}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default RecentActivity;
