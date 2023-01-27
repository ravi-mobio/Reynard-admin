/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Images
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSafetyThunk } from "redux/Thunks/Thunks";
import moment from "moment";
import MDButton from "components/MDButton";

export default function data(handleEditOpen) {
  const [rows, setRows] = useState([]);
  const safetyCards = useSelector((state) => state.safetCard.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSafetyThunk());
  }, []);

  useEffect(() => {
    console.log("refresh ", safetyCards);
    if (safetyCards.length > 0) {
      console.log(safetyCards);
      const list = safetyCards.map((item) => {
        const temp = {
          project: <Author name={item.project.title} />,
          created: (
            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
              {moment(item.createdAt).format("MMMM Do YYYY")}
            </MDTypography>
          ),
          type: <Author name={item.type} />,
          site: <Author name={item.site.title} />,
          location: <Author name={item.location} />,
          // severity: <Author name={item.severity} />,
          // likelihood: <Author name={item.likelihood} />,
          status: (
            <MDBox ml={-1}>
              <MDBadge badgeContent="Open" color="success" variant="gradient" size="sm" />
            </MDBox>
          ),
          by: <Author name={item.createdBy.fullName} />,
          // attachement: <Author name="" />,
          action: (
            <MDButton
              component="a"
              href="#"
              variant="caption"
              color="info"
              fontWeight="medium"
              onClick={() => handleEditOpen(item)}
            >
              Review
            </MDButton>
          ),
        };
        return temp;
      });
      setRows([...list]);
    }
  }, [safetyCards]);

  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Project", accessor: "project", align: "left" },
      { Header: "Created", accessor: "created", align: "left" },
      { Header: "Type", accessor: "type", align: "center" },
      { Header: "Site", accessor: "site", align: "center" },
      { Header: "Location", accessor: "location", align: "center" },
      // { Header: "Severity", accessor: "severity", align: "center" },
      // { Header: "Likelihood", accessor: "likelihood", align: "center" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "By", accessor: "by", align: "center" },
      // { Header: "Atachement", accessor: "attachement", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
