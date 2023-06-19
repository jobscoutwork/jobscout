// import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//import TextField from "@mui/material/TextField";
import axios from "axios";
import { Autocomplete, MenuItem, TextField } from '@mui/material';

export default function BodyHeaderSection({setQuery,query}) {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [queryData,setQueryData] = useState([]);
  const [locationSearchQuery, setLocationSearchQuery] = useState(" ");
  const [queryLocationData,setLocationQueryData] = useState([]);
  const apiUrl = 'http://localhost';

/////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      // Perform the search operation here
	  if(searchQuery!=" " && searchQuery!=""){
		getSearchQuery({type : 'title', searchQuery : searchQuery},'title');
	  }
	  if(locationSearchQuery!=" " && locationSearchQuery!=""){
		getSearchQuery({type : 'location', searchQuery : searchQuery},'location');
	  }
      console.log("Searching for:", searchQuery);
    }, 50); // Adjust the debounce delay as needed (e.g., 500ms)

    return () => clearTimeout(debounceTimeout); // Cleanup the timeout on component unmount
  }, [searchQuery,locationSearchQuery]);

/////////////////////////////////////////////////////////////////////////////////////

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchLocation = (e) => {
    setLocationSearchQuery(e.target.value);
  };

/////////////////////////////////////////////////////////////////////////////////////

  async function getSearchQuery(searchQuery,type) {
	searchQuery = JSON.stringify(searchQuery);
	const resp = await axios.get(`${apiUrl}/data/searchQuery/${searchQuery}`);
	console.log(resp.data);
	if(type=='location'){
		setLocationQueryData(resp.data);
	}else{
		setQueryData(resp.data);
	}
	// Introduce a delay of 500 milliseconds (adjust as needed)
	await new Promise(resolve => setTimeout(resolve, 500));
  }

/////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
	setQuery(searchQuery);
    // Perform the search operation here
    console.log("Searching for:", searchQuery);
  };



	return (
		<>
			<Box display="flex" justifyContent="center" alignItems="center">
				<form
					onSubmit={handleSubmit}
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						marginTop: "24px",
						marginBottom: "24px"
					}}
				>
					{/* <TextField
            id="text-input-what"
            label="What"
            placeholder="Job title, keywords, or company"
            variant="outlined"
            size="small"
            style={{
              marginBottom: "8px",
              width: "300px",
              marginRight: "18px",
            }}
            InputProps={{
              endAdornment: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  fill="#767676"
                  viewBox="0 0 21 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4038 12.3048C10.7084 12.7451 9.88397 13 9 13c-2.48528 0-4.5-2.0147-4.5-4.5C4.5 6.01472 6.51472 4 9 4c2.4853 0 4.5 2.01472 4.5 4.5 0 .87711-.2509 1.6956-.6849 2.3876l3.5089 3.5089c.1952.1953.1952.5119 0 .7071l-.7071.7072c-.1953.1952-.5119.1952-.7071 0l-3.506-3.506zM11.5 8.5c0 1.38071-1.1193 2.5-2.5 2.5-1.38071 0-2.5-1.11929-2.5-2.5S7.61929 6 9 6c1.3807 0 2.5 1.11929 2.5 2.5z"
                  ></path>
                </svg>
              ),
            }}
            value={searchQuery}
            onChange={handleSearchInputChange}
          /> */}
					<Autocomplete
						freeSolo
						options={queryData}
						onInputChange={(_, value) => setSearchQuery(value)}
						renderInput={(queryData) => (
							<TextField
								id="text-input-what"
								//label="What"
								placeholder="Job title, keywords, or company"
								variant="outlined"
								size="small"
								style={{
									marginBottom: "8px",
									width: "300px",
									marginRight: "18px",
								}}
								InputProps={{
									endAdornment: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="21"
											height="20"
											fill="#767676"
											viewBox="0 0 21 20"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M11.4038 12.3048C10.7084 12.7451 9.88397 13 9 13c-2.48528 0-4.5-2.0147-4.5-4.5C4.5 6.01472 6.51472 4 9 4c2.4853 0 4.5 2.01472 4.5 4.5 0 .87711-.2509 1.6956-.6849 2.3876l3.5089 3.5089c.1952.1953.1952.5119 0 .7071l-.7071.7072c-.1953.1952-.5119.1952-.7071 0l-3.506-3.506zM11.5 8.5c0 1.38071-1.1193 2.5-2.5 2.5-1.38071 0-2.5-1.11929-2.5-2.5S7.61929 6 9 6c1.3807 0 2.5 1.11929 2.5 2.5z"
											></path>
										</svg>
									),
								}}
								{...queryData}
								//label="Search"
								//variant="outlined"
								value={searchQuery}
								onChange={handleSearchInputChange}
								//onKeyPress={handleKeyPress}
								sx={{ marginRight: '1rem' }}
							/>
						)}
					/>

					{/* <Autocomplete
						freeSolo
						options={queryLocationData}
						onInputChange={(_, value) => setLocationQueryData(value)}
						renderInput={(queryLocationData) => (
							<TextField
								id="text-input-what"
								//label="City"
								placeholder="Company"
								variant="outlined"
								size="small"
								style={{
									marginBottom: "8px",
									width: "300px",
									marginRight: "18px",
								}}
								InputProps={{
									endAdornment: (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="21"
											height="20"
											fill="#767676"
											viewBox="0 0 21 20"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M11.4038 12.3048C10.7084 12.7451 9.88397 13 9 13c-2.48528 0-4.5-2.0147-4.5-4.5C4.5 6.01472 6.51472 4 9 4c2.4853 0 4.5 2.01472 4.5 4.5 0 .87711-.2509 1.6956-.6849 2.3876l3.5089 3.5089c.1952.1953.1952.5119 0 .7071l-.7071.7072c-.1953.1952-.5119.1952-.7071 0l-3.506-3.506zM11.5 8.5c0 1.38071-1.1193 2.5-2.5 2.5-1.38071 0-2.5-1.11929-2.5-2.5S7.61929 6 9 6c1.3807 0 2.5 1.11929 2.5 2.5z"
											></path>
										</svg>
									),
								}}
								{...queryLocationData}
								//variant="outlined"
								value={searchQuery}
								onChange={handleSearchLocation}
								//onKeyPress={handleKeyPress}
								sx={{ marginRight: '1rem' }}
							/>
						)}
					/> */}

					<Button
						variant="contained"
						color="primary"
						type="submit"
						sx={{
							marginBottom: "8px",
							ml: 2,
						}}
						onClick={handleSubmit}
					>

						Find jobs
					</Button>
				</form>
			</Box>
		</>
	);
}
