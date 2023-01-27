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

// Images
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFieldsThunk, deleteFieldsThunk } from "redux/Thunks/Thunks";
import MDButton from "components/MDButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function data(setopenSnackbar, setSnackbarContent) {
  const [rows, setRows] = useState([]);
  const [refreshFields, setRefreshFields] = useState(false);
  const mongooseId = "_id";
  const fieldList = useSelector((state) => state.dynamicFields.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFieldsThunk());
  }, [refreshFields]);

  const handleDeleteField = async (id) => {
    const res = await dispatch(deleteFieldsThunk(id));
    console.log(res);
    // if (res.error === undefined) {
    console.log(res);
    setopenSnackbar(true);
    setSnackbarContent(res.payload.message);
    setRefreshFields(!refreshFields);
    // }
  };

  useEffect(() => {
    console.log("refresh ", fieldList);
    if (fieldList.staticField.length > 0) {
      const list = fieldList.staticField.map((item) => {
        const temp = {
          fieldName: <Author name={item.questionHeader} />,
          option:
            item.optionValue.length > 0 ? (
              <Dropdown questionType={item.questionType} optionValue={item.optionValue} />
            ) : (
              "---"
            ),
          action: (
            <MDButton variant="contained" fontWeight="medium">
              ---
            </MDButton>
          ),
        };
        return temp;
      });
      setRows([...list]);
    }
    if (fieldList.dyamicField.length > 0) {
      console.log(fieldList);
      const list = fieldList.dyamicField.map((item) => {
        const temp = {
          fieldName: <Author name={item.questionHeader} />,
          option:
            item.optionValue.length > 0 ? (
              <Dropdown questionType={item.questionType} optionValue={item.optionValue} />
            ) : (
              "---"
            ),
          action: (
            <MDButton
              variant="contained"
              color="error"
              fontWeight="medium"
              onClick={() => handleDeleteField(item[mongooseId])}
            >
              Delete
            </MDButton>
          ),
        };
        return temp;
      });
      setRows((oldValue) => [...oldValue, ...list]);
    }
  }, [fieldList]);

  const dropdownIcon = () => <ArrowDropDownIcon fontSize="medium" />;
  const Author = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const Dropdown = ({ questionType, optionValue }) => (
    <FormControl sx={{ m: 1, minWidth: 120, width: 200 }}>
      <InputLabel id="demo-simple-select-label">{questionType}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{ p: "0.75rem" }}
        IconComponent={dropdownIcon}
        value={optionValue[0].optionText}
        displayEmpty
      >
        {optionValue.map((val) => (
          <MenuItem value={val.optionText}>{val.optionText}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return {
    columns: [
      { Header: "Field Name", accessor: "fieldName", align: "left" },
      { Header: "Options", accessor: "option", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows,
  };
}
