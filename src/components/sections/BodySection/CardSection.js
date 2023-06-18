import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "../../common/CustomCard";
import axios from "axios";
import PageLoader from "../../common/LoadingIndicators/PageLoader";
import dayjs from "dayjs";

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
		let temp = 1;
    console.log(`currDate ${currDate}`)
		if(currDate.value=="today"){
			temp = 1;
		}else if(currDate.value="3_days_ago"){
			temp = 3;
		}else if(currDate.value="1_week_ago"){
			temp = 7;
		}
		const result = getPreviousDates(temp);
        const resp = await axios.get(`${apiUrl}/data/v2/${result}`);
		console.log(`got data for ${result}`)
        setAllJobs(resp.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching jobs data:", error);
      }
    })();
  }, [currDate]);

	const getPreviousDates = (value) => {
		const previousDates = [];
		const currentDate = dayjs().startOf("day"); // Get current date
    if(value>1){
      for (let i = 1; i < value; i++) {
        const date = currentDate.subtract(i, "day").format("YYYY-MM-DD");
        previousDates.push(date);
      }
    }else{
      const date = currentDate.subtract(0, "day").format("YYYY-MM-DD");
      previousDates.push(date);
    }

		return previousDates;
	};

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
