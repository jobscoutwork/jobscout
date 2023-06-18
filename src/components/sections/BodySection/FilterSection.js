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

	const handleDate = (date) => {
		const formattedDate = dayjs(date).format("YYYY-MM-DD");
        console.log("Formatted Date:", formattedDate);
		setSelectedDate(formattedDate);
		setCurrDate(formattedDate);
		// Perform any additional logic with the selected date
		console.log("Selected Date:", date);
	};

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
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Helper text example"
						slotProps={{
							textField: {
								//helperText: 'MM/DD/YYYY',
							},
						}}
						value={selectedDate}
						onChange={handleDate}
					/>
				</LocalizationProvider>
				<CustomSelectInput title="Salary Estimate" />
				<CustomSelectInput title="Job Type" />
				<CustomTextField title="Company Name" />
			</Box>
		</>
	);
};

export default FilterSection;
