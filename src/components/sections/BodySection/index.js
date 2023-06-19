import React from "react";
import BodyHeaderSection from "./BodyHeaderSection";
import CardSection from "./CardSection";
import FilterSection from "./FilterSection";
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";

export default function BodySection() {
	const [currDate, setCurrDate] = useState({label: 'Today', value: 'today'});
	const [query,setQuery] = useState('');
	return (
		<div>
			<BodyHeaderSection setQuery={setQuery} query={query}/>

			<Container
				maxWidth="md"
				sx={{
					display: "flex",
				}}
			>
				<Box
					sx={{
						width: "40%",
						position: "sticky",
						top: 110,
						maxHeight: "80vh",
						// overflowY: "scroll",
						zIndex: 999,
						marginRight: 10,
					}}
				>
					<FilterSection currDate={currDate}  setCurrDate={setCurrDate } />
				</Box>
				<Box sx={{ width: "60%" }}>
					<CardSection currDate={currDate} query={query} />
				</Box>
			</Container>
		</div>
	);
}
