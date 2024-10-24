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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "./index.css"
import React, { useEffect, useState } from 'react';
// Material Dashboard 2 React components
import IconButton from '@mui/material/IconButton';



import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Button from '@mui/material/Button';
import AddRoomDialog from "./Dialog/rooms/AddRoomDialog"
function Tables() {
  function HandleRooms() {}
//Dialog logic
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

  const { columns, rows,  } = authorsTableData();
   const { columns: pColumns, rows: pRows } = projectsTableData();


  
  const handleAddRoom = () => {
    // Add room logic here, such as opening a modal or redirecting to a form
    console.log("Add Room button clicked");
  };
  return (
    <DashboardLayout>
   
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
              className = "Mdbox"
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Rooms Tables
                </MDTypography>
                <Button 
                color="white"
                  variant="contained"
                  onClick={handleClickOpen}  
                  
                  >add romms</Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
              className = "Mdbox"
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Booking Tables
                </MDTypography>
                <Button 
                color="white"
                  variant="contained"
                  onClick={handleClickOpen}  
                  
                  >add Booking</Button>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
               table={{ columns : pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      
      </MDBox>
      
      <Footer />
    <AddRoomDialog  open ={open} setOpen={setOpen} />
    </DashboardLayout>
    
    
  );
}

export default Tables;
