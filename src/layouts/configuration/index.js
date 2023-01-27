import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import MDInput from "components/MDInput";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { configThunk, createQuestionThunk } from "redux/Thunks/Thunks";

import DynamicFieldTableData from "layouts/configuration/data/DynamicField";
import DataTable from "examples/Tables/DataTable";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

function index() {
  const { config } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([
    { questionHeader: "", questionType: "", optionValue: [], createdBy: "" },
  ]);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isShortAnswer, setIsShortAnswer] = useState(false);
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tapPannel, setTapPannel] = useState("1");

  const handleChange = (event, newValue) => {
    console.log(event);
    setTapPannel(newValue);
  };

  const { columns, rows } = DynamicFieldTableData(setopenSnackbar, setSnackbarContent);

  const handleAddQuestion = () => {
    const questionFields = { questionHeader: "", questionType: "", optionValue: [], createdBy: "" };
    setQuestions((oldValue) => [...oldValue, questionFields]);
  };

  useEffect(() => {
    dispatch(configThunk());
  }, []);
  useEffect(() => {
    console.log(rows, columns);
    console.log(isDropdown, isShortAnswer);
  }, []);

  const handleQuestionText = (text, i) => {
    const questionsArr = [...questions];
    questionsArr[i].questionHeader = text;
    setQuestions(questionsArr);
  };

  const handleQuestionType = (value, i) => {
    const questionsArr = [...questions];
    console.log(value);
    if (value === "options") {
      setIsDropdown(true);
      questionsArr[i].questionType = value;
      questionsArr[i].optionValue = [{ optionText: "" }];
      questionsArr[i] = {
        ...questionsArr[i],
      };
      setQuestions(questionsArr);
    }

    if (value === "text") {
      setIsShortAnswer(true);
      questionsArr[i].questionType = value;
      questionsArr[i] = { ...questionsArr[i] };
      setQuestions(questionsArr);
    }

    if (value === "checkbox") {
      setIsCheckbox(true);
      questionsArr[i].questionType = value;
      questionsArr[i] = { ...questionsArr[i] };
      setQuestions(questionsArr);
    }
  };
  const dropdownIcon = () => <ArrowDropDownIcon fontSize="medium" />;

  //   const handleInputSave = async (i) => {
  //     console.log(questions);
  //     const body = {
  //       questionHeader: questions[i].questionHeader,
  //       questionType: questions[i].questionType,
  //       optionValue: {},
  //       createdBy: config[0].id,
  //     };
  //     const res = await dispatch(createQuestionThunk(body));
  //     console.log(res);
  //   };

  const handleSave = async (i) => {
    setLoading(true);
    console.log(questions);
    const body = {
      questionHeader: questions[i].questionHeader,
      questionType: questions[i].questionType,
      optionValue: questions[i].optionValue,
      createdBy: config[0].id,
    };
    const res = await dispatch(createQuestionThunk(body));
    if (res.error === undefined) {
      const questionsArr = [...questions];

      questionsArr.splice(index, 1);
      setQuestions(questionsArr);
      setopenSnackbar(true);
      setSnackbarContent(res.payload.message);
      setLoading(false);
    }
    setLoading(false);
    console.log(res);
  };

  const handleAddOptions = (i) => {
    const questionsArr = [...questions];

    questionsArr[i].optionValue.push({ optionText: "" });
    setQuestions(questionsArr);
  };

  //   const deleteQuestion = (i) => {
  //     const questionsArr = [...questions];

  //     questionsArr.splice(i, 1);
  //     setQuestions(questionsArr);
  //   };
  const handleDeleteOptions = (i, j) => {
    const questionsArr = [...questions];

    questionsArr[i].optionValue.splice(j, 1);
    setQuestions(questionsArr);
  };

  const handleOptionTextChange = (text, i, j) => {
    console.log(text, i, j);
    const questionsArr = [...questions];

    questionsArr[i].optionValue[j].optionText = text;

    setQuestions(questionsArr);
  };

  const handleSnackbarClose = () => setopenSnackbar(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDTypography variant="h4" textAlign="center">
          Configure HSE Card
        </MDTypography>
      </MDBox>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <Tabs
          value={tapPannel}
          onChange={handleChange}
          textColor="info"
          indicatorColor="info"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Safe Card" color="primary" />
          {/* <Tab value="two" label="Unsafe card" disabled sx={{ backgroundColor: "#959191" }} />
          <Tab value="three" label="NCR Card" disabled sx={{ backgroundColor: "#959191" }} /> */}
        </Tabs>
      </Box>

      <MDBox pt={2}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>

      <Root>
        <Divider />
      </Root>

      <MDBox
        mt={3}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {questions.map((question, i) => (
          <>
            <MDBox display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <MDBox
                mr={5}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                //   alignItems="center"
              >
                <MDTypography variant="body" textAlign="Left">
                  Field {i + 1}
                </MDTypography>
                <MDInput
                  label="Field Name"
                  value={question.questionHeader}
                  onChange={(e) => handleQuestionText(e.target.value, i)}
                />
              </MDBox>
              <MDBox display="flex" flexDirection="column" justifyContent="center">
                <MDTypography variant="body">Field Type</MDTypography>
                <FormControl sx={{ m: 1, minWidth: 120, width: 200 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    sx={{ p: "0.75rem" }}
                    IconComponent={dropdownIcon}
                    value={question.questionType}
                    label="Age"
                    onChange={(e) => handleQuestionType(e.target.value, i)}
                  >
                    <MenuItem value="options">Dropdown</MenuItem>
                    <MenuItem value="text">Short Answer</MenuItem>
                    <MenuItem value="checkbox">Checkbox</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </MDBox>

            {isDropdown && question.questionType === "options" ? (
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb={3}
              >
                {question.optionValue.map((item, j) => (
                  <MDBox mb={2} key="options">
                    <MDTypography variant="body" mr={2}>
                      {j + 1}
                    </MDTypography>
                    <MDInput
                      sx={{ width: 400 }}
                      label="Enter Optoon value"
                      value={item.optionText}
                      onChange={(e) => handleOptionTextChange(e.target.value, i, j)}
                    />
                    <MDButton
                      variant="text"
                      color="error"
                      onClick={() => handleDeleteOptions(i, j)}
                    >
                      <DeleteIcon color="error" />
                    </MDButton>
                  </MDBox>
                ))}

                <MDBox mt={3} display="flex" flexDirection="row" justifyContent="space-evenly">
                  <MDButton
                    variant="contained"
                    color="secondary"
                    sx={{ marginRight: "10px" }}
                    onClick={() => handleAddOptions(i)}
                  >
                    Add Option
                  </MDButton>
                  <MDButton
                    sx={{ marginRight: "10px" }}
                    variant="contained"
                    color="success"
                    onClick={() => handleSave(i)}
                  >
                    {loading ? "Loading..." : "Create Dropdown Field"}
                  </MDButton>
                  {/* <MDButton variant="contained" color="error" onClick={deleteQuestion(i)}>
                    Delete Field
                  </MDButton> */}
                </MDBox>
              </MDBox>
            ) : null}

            {isCheckbox && question.questionType === "checkbox" ? (
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb={3}
              >
                <MDBox mt={3} display="flex" flexDirection="row" justifyContent="space-evenly">
                  <MDButton
                    sx={{ marginRight: "10px" }}
                    variant="contained"
                    color="success"
                    onClick={() => handleSave(i)}
                  >
                    {loading ? "Loading..." : "Create Checkbox Field"}
                  </MDButton>
                  {/* <MDButton variant="contained" color="error" onClick={deleteQuestion(i)}>
                    Delete Field
                  </MDButton> */}
                </MDBox>
              </MDBox>
            ) : null}
            {isShortAnswer && question.questionType === "text" ? (
              <MDBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb={3}
              >
                <MDBox mt={3} display="flex" flexDirection="row" justifyContent="space-evenly">
                  <MDButton
                    sx={{ marginRight: "10px" }}
                    variant="contained"
                    color="success"
                    onClick={() => handleSave(i)}
                  >
                    {loading ? "Loading..." : "Create Short Field"}
                  </MDButton>
                  {/* <MDButton variant="contained" color="error" onClick={deleteQuestion(i)}>
                    Delete Field
                  </MDButton> */}
                </MDBox>
              </MDBox>
            ) : null}
          </>
        ))}
        <Root>
          <Divider />
        </Root>
        <MDButton mt={2} variant="outlined" color="info" onClick={handleAddQuestion}>
          <AddIcon mr={2} />
          <MDTypography ml={1} variant="body" color="info">
            Add a Field
          </MDTypography>
        </MDButton>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          bgColor="success"
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          color="light"
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%", backgroundColor: "green" }}
          >
            <MDTypography variant="body" color="light">
              {snackbarContent}
            </MDTypography>
          </Alert>
        </Snackbar>
      </MDBox>
    </DashboardLayout>
  );
}

export default index;
