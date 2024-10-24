/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import {useEffect, useState} from "react"
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import api from "../../../api/api"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
export default function data() {
  // Add edit and delete functionality (replace this with your actual logic)
const handleEdit = (roomId) => {
  console.log(`Edit room with ID: ${roomId}`);
};

const handleDelete = (roomId) => {
  console.log(`Delete room with ID: ${roomId}`);
};
  const [ rooms , setRooms]  = useState([])
  console.log(rooms) 
  useEffect(() => {
    // Fetch room data from the API
    api.get('rooms')
      .then( response => {
        const fetchedRooms =  response.data.data;
        // Map through rooms and add a hotelName property directly to each room
        const updatedRooms = fetchedRooms.map(room => ({
          ...room,
          hotelName: room.hotelName?.name || 'Unknown Hotel', // Adding name directly
        }));
        setRooms(updatedRooms);
      })
      .catch(error => console.error(error));
  }, []);
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );
  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "hotelName", accessor: "hotelName", align: "left" },
      { Header: "pricePerNight", accessor: "pricePerNight", align: "left" },
      { Header: "bedCount", accessor: "bedCount", align: "center" },
      { Header: "bathroomCount", accessor: "bathroomCount", align: "center" },
      { Header: "maxOccupancy", accessor: "maxOccupancy", align: "center" },
      { Header: "isAvailable", accessor: "isAvailable", align: "center" },
      {
        Header: "Actions", 
        accessor: "actions", 
        align: "center", 
        Cell: ({ row }) => (
          <>
            <IconButton onClick={() => handleEdit(row.original._id)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original._id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    rows: rooms
  };
}
