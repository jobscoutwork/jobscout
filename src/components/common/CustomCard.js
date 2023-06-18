import { Link } from "react-router-dom";
import {
	ArrowForwardOutlined,
	Info,
	WatchLater,
	Work,
} from "@mui/icons-material";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";
import React from "react";
import OutlinedButton from "./OutlinedButton";
import CircularImage from "./CircularImage";

export default function CustomCard({ jobData }) {
	//console.log(jobData, "jobdata");

	const handleClick = () => {
		console.log("click");
	};

	const currentDate = new Date(); // Get the current date

	// Assuming the given date is in the format YYYY-MM-DD
	const givenDate = new Date(jobData?.createdDate);

	// Calculate the time difference in milliseconds
	const timeDiff = currentDate.getTime() - givenDate.getTime();

	// Calculate the number of days
	const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

	// Output the result
	console.log(`${daysDiff} days ago`);

	let dateOutput = `${daysDiff} days ago`;

	if (daysDiff <= 0) {
		dateOutput = "Today";
	}

	return (
		<>
			<Card
				sx={{
					maxWidth: 480,
					// minHeight:250,
					marginBottom: 2,
				}}
			
			>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mb: 2,
						}}
					>
						<Box>
							<img
								width="70"
								height="70"
								style={{
									objectFit: "contain",
									border: "1px solid #808080",
									borderRadius: "10px",
								}}
								alt="Business Operations Analyst / jobs"
								src={jobData?.logoUrl}
							/>
						</Box>

						<Box>
						<Link target="_blank" to={`/details/${jobData.id}`}>
							<OutlinedButton
								sx={{
									mr: 1,
								}}
					>            View Detail
							</OutlinedButton>
							</Link>
							{/* <OutlinedButton>Apply Now</OutlinedButton> */}
						</Box>
					</Box>

					<Box
						sx={{
							ml: 0.3,
							mb: 2,
						}}
					>
						<Typography variant="body2" color="text.secondary">
							{jobData?.companyName}
						</Typography>
						<Typography>{jobData?.title}</Typography>
						<Typography variant="body2" color="text.secondary">
							{jobData?.locations}
						</Typography>
						{/* <Typography variant="body2" color="text.secondary"> */}
						{/* <b>Skills : </b> */}
						{/* Albert Lia */}
						{/* </Typography> */}
					</Box>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								display: "flex",
							}}
						>
							<span
								style={{
									marginRight: "4px",
								}}
							>
								<WatchLater fontSize="small" />
							</span>
							{/* {jobData?.createdDate} */}
							{dateOutput}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								display: "flex",
							}}
						>
							<span
								style={{
									marginRight: "4px",
								}}
							>
								<Work fontSize="small" />
							</span>
							{jobData?.label}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								display: "flex",
							}}
						>
							<span
								style={{
									marginRight: "4px",
								}}
							>
								<Info fontSize="small" />
							</span>
							{/* {jobData?.applyCount} applicants */}
							{jobData?.applyCount
								? jobData?.applyCount + " applicants"
								: "N/A"}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</>
	);
}
