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

// @mui material components
import Icon from "@mui/material/Icon";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"
// Material Dashboard 2 React components

import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  // const Project = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" variant="rounded" />
  //     <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
       { Header: "project", accessor: "project", width: "30%", align: "left" },
      { Header: "budget", accessor: "budget", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "completion", accessor: "completion", align: "center" },
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

    rows: [
      {
        project: "Website Redesign",
        budget: "$3,000",
        status: "In Progress",
        completion: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress value={75} color="info" />
          </MDBox>
        ),
        action: (
          <IconButton variant="contained" color="info">
            Edit
          </IconButton>
        ),
      },
      {
        project: "Mobile App Launch",
        budget: "$8,500",
        status: "Completed",
        completion: (
          <IconButton width="8rem" textAlign="left">
            <MDProgress value={100} color="success" />
          </IconButton>
        ),
        action: (
          <IconButton variant="contained" color="success">
            View
          </IconButton>
        ),
      },
      {
        project: "SEO Campaign",
        budget: "$2,000",
        status: "On Hold",
        completion: (
          <IconButton width="8rem" textAlign="left">
            <MDProgress value={50} color="warning" />
          </IconButton>
        ),
        action: (
          <IconButton variant="contained" color="warning">
            Resume
          </IconButton>
        ),
      },
      {
        project: "New Landing Page",
        budget: "$1,500",
        status: "In Progress",
        completion: (
          <IconButton width="8rem" textAlign="left">
            <MDProgress value={40} color="info" />
          </IconButton>
        ),
        action: (
          <IconButton variant="contained" color="info">
            Edit
          </IconButton>
        ),
      },
    ],
  };
}
