import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomTextField from "../../common/CustomTextField";
import CustomSelectInput from "../../common/CustomSelectInput";
import dayjs from "dayjs";

const FilterSection = ({ currDate, setCurrDate }) => {
	const [selectedDate, setSelectedDate] = useState(null);
    const [temp, setTemp] = useState(0);
	const handleDate = (value) => {
		setSelectedDate(value);
		console.log(value, "result")
		setCurrDate(value); // Example: updating the currDate state
	};
	// const handleDate = (days) => {
	// 	//let temp ;
	// 	if(days=="today"){
	// 		setTemp(0);
	// 	}else if(days="3_days_ago"){
	// 		setTemp(3);
	// 	}else if(days="1_week_ago"){
	// 		setTemp(7);
	// 	}
	// 	const result = getPreviousDates(temp);
	// 	console.log(days,result, "result")
	// 	//setSelectedDate(formattedDate);
	// };
	
	// const getPreviousDates = (value) => {
	// 	const previousDates = [];
	// 	const currentDate = dayjs().startOf("day"); // Get current date

	// 	for (let i = 0; i < value; i++) {
	// 		const date = currentDate.subtract(i, "day").format("YYYY-MM-DD");
	// 		previousDates.push(date);
	// 	}

	// 	return previousDates;
	// };

	return (
		<>
			<Box
				sx={{
					// border:"1px solid red",
					marginRight: "16px",
				}}
			>
				<div>
					<Typography variant="body1" gutterBottom>
						Refine your search using the following filters:
					</Typography>
				</div>

				<CustomSelectInput
					title="Date Posted"
					options={[
						{ label: "Today", value: "today" },
						{ label: "Last 3 days ", value: "3_days_ago" },
						{ label: "Last 1 week ", value: "1_week_ago" },
					]}
					onChange={handleDate}
				/>

				<CustomSelectInput title="Salary Estimate" />
				<CustomSelectInput title="Job Type" />
				<CustomTextField title="Company Name" />
			</Box>
		</>
	);
};

export default FilterSection;
