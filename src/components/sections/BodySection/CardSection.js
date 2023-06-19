import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomCard from "../../common/CustomCard";
import axios from "axios";
import PageLoader from "../../common/LoadingIndicators/PageLoader";
import dayjs from "dayjs";

export default function CardSection({ currDate ,query}) {
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
        if (currDate.value == "today") {
          temp = 1;
        } else if (currDate.value = "3_days_ago") {
          temp = 3;
        } else if (currDate.value = "1_week_ago") {
          temp = 7;
        }
        const result = getPreviousDates(temp);
        console.log(`got query ${query}`);
        let resp;
        if(query==' '||query==''){
          resp = await axios.get(`${apiUrl}/data/v1/1`);
        }else{
          resp = await axios.get(`${apiUrl}/data/v3/${query}`);
        }
        // const resp = await axios.get(`${apiUrl}/data/v2/${result}`);
        //const resp = await axios.get(`${apiUrl}/data/v1/1`);
        console.log('resp',resp.data);
        // let filterData = [];
        // for(let i=0;i<result.length;i++){
        //   for(let i=0;i<resp.data.length;i++){
        //     if(resp.data[i].value.createdDate==result[i]){
        //       console.log('resp i',resp.data[i],result[i],resp.data.length);
        //       filterData.push(resp.data[i].value);
        //     }
        //   }
        // }
        console.log(`got data for ${result}`);

        let respData = resp.data;
        console.log('resp',resp.data);
        setAllJobs(resp.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching jobs data:", error);
      }
    })();
  }, [currDate,query]);



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
            <CustomCard key={e.key} jobData={e.value} currDate={currDate} setAllJobs={setAllJobs}/>
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
