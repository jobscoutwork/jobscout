import React, { useEffect, useState } from "react";
import JobDetailHeaderSection from "./JobDetailHeaderSection";
import { Box, Container } from "@mui/material";
import JobDetailDescriptionSection from "./JobDetailDescriptionSection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageLoader from "../../common/LoadingIndicators/PageLoader";

export default function JobDetailSection() {
  let { jobId } = useParams();
  console.log(jobId);
  //const apiUrl = 'http://13.126.41.77';
  const apiUrl = 'http://localhost';
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState(null);

  // http://localhost/data/jobDetail/3600839407
  useEffect(() => {
    (async function getAllJobsData() {
      const resp = await axios.get(`${apiUrl}/data/jobDetail/${jobId}`);
      setAllJobs(resp.data);
      console.log(resp.data);

      // Introduce a delay of 500 milliseconds (adjust as needed)
      await new Promise(resolve => setTimeout(resolve, 500));

      setLoading(false);
    })();
  }, []);

  console.log(allJobs, "detail page data");

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <Box
          sx={{
            backgroundColor: "#F6F8FA",
            p: 2,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              // border: "1px solid blue",
              borderRadius: "5px",
              backgroundColor: "white",
              mb: 2,
              // position: "sticky",
              // top: "62.5px",
            }}
          >
            {allJobs && (
              <JobDetailHeaderSection
                src={allJobs.value.logoUrl}
                title={allJobs.value.title}
                companyName={allJobs.value.companyName}
                locations={
                  allJobs.value.wfhType === "0"
                    ? allJobs.value.locations
                    : "Remote"
                }
                href={allJobs.value.applyLink}
                companyHref={allJobs.value.companyDetail.key}
              />
            )}
          </Container>
          <Container
            maxWidth="md"
            sx={{
              // border: "1px solid blue",
              borderRadius: "5px",
              backgroundColor: "white",
              mb: 2,
            }}
          >
            {allJobs && (
              <JobDetailDescriptionSection
                description={allJobs.value.description}
              />
            )}
          </Container>
          <Container
            maxWidth="md"
            sx={{
              // border: "1px solid blue",
              borderRadius: "5px",
              backgroundColor: "white",
            }}
          >
            {allJobs && <AdditionalInfoSection />}
          </Container>
        </Box>
      )}
    </>
  );
}
