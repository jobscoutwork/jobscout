import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "../../common/CustomCard";
import axios from "axios";
import PageLoader from "../../common/LoadingIndicators/PageLoader";

export default function CardSection({ currDate }) {
  //const apiUrl = 'http://13.126.41.77';
  const apiUrl = 'http://localhost';
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    (async function getAllJobsData() {
      try {
        const resp = await axios.get(`${apiUrl}/data/v1/${currDate}`);
		console.log(`got data for ${currDate}`)
        setAllJobs(resp.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching jobs data:", error);
      }
    })();
  }, [currDate]);

  // Calculate index of the first and last item to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {loading && <PageLoader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {currentJobs.map((e) => (
            <CustomCard key={e.key} jobData={e.value} />
          ))}
        </Grid>
        <Grid item xs={12} mt={2}>
          <Container maxWidth="sm" align="center">
            <Pagination
              count={Math.ceil(allJobs.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
