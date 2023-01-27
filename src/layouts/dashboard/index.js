// Material Dashboard 2 React components
import {
  Alert,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  Switch,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/dashboard/data/safetyCardData";
import { useEffect, useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  configThunk,
  createSafetyCardThunk,
  getAllSafetyThunk,
  updateSafetyCardThunk,
} from "redux/Thunks/Thunks";
import MDInput from "components/MDInput";

// const buttonStyle = {
//   color: "#ffffff",
//   backgroundColor: "#a6ca51",
//   "&:hover": {
//     backgroundColor: "#76a40c",
//   },
// };
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 0,
};

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [age, setAge] = useState({});
  const [safetyCard, setSafetyCard] = useState({});
  const [openSnackbar, setopenSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [updateSafetyCardId, setUpdateSafetyCardId] = useState("");
  const dispatch = useDispatch();
  const { config } = useSelector((state) => state.config);
  const safetCardList = useSelector((state) => state.safetCard.list);
  // const mongooseId = "_id";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = (item) => {
    const id = "_id";
    setUpdateSafetyCardId(item[id]);
    console.log(item[id]);
    console.log(item);
    const temp = {
      project: item.project[id],
      site: item.site[id],
      location: item.location,
      savingRule: item.savingRule[id],
      description: item.description,
      dynamicFields: item.dynamicFields ? item.dynamicFields : [],
      updateBy: config.length > 0 ? config[0].id : 0,
    };

    // const matchinging = config[0].screens[0].properties.forEach((val) => {});
    const tempAge = age;
    const dynamicFields = "dynamicFields";
    tempAge[dynamicFields] = [];

    setSafetyCard({ ...temp });
    setOpenEdit(true);
  };
  const handleEditClose = () => setOpenEdit(false);
  const { columns, rows } = authorsTableData(handleEditOpen);

  const handleChange = (name, value, id) => {
    console.log(name, value, id);
    const tempAge = age;
    const temp = safetyCard;
    // const { name, value, id } = event.target;
    const dynamicFields = "dynamicFields";
    if (
      name !== "project" &&
      name !== "site" &&
      name !== "location" &&
      name !== "savingRule" &&
      name !== "description"
    ) {
      const index = temp[dynamicFields].findIndex((val) => val.fieldId === id);
      if (index >= 0) {
        temp[dynamicFields][index].value = value;
        tempAge[dynamicFields][index].value = value;
        setAge({ ...tempAge });
        setSafetyCard({ ...temp });
      } else {
        const dynamicFieldValueObject = {
          title: name,
          value,
          fieldId: id,
        };
        temp[dynamicFields].push(dynamicFieldValueObject);
        tempAge[dynamicFields].push(dynamicFieldValueObject);
        setAge({ ...tempAge });
        setSafetyCard({ ...temp });
      }
    } else {
      temp[name] = value;
      tempAge[name] = value;
      setAge({ ...tempAge });
      setSafetyCard({ ...temp });
    }
  };

  const handleCheckBox = (name, id, value) => {
    console.log(name, id, value);

    const tempAge = age;
    const temp = safetyCard;
    const dynamicFields = "dynamicFields";
    const index = temp[dynamicFields].findIndex((val) => val.fieldId === id);
    if (index >= 0) {
      temp[dynamicFields][index].value = value.toString();
      tempAge[dynamicFields][index].value = value.toString();
      setAge({ ...tempAge });
      setSafetyCard({ ...temp });
    } else {
      const dynamicFieldValueObject = {
        title: name,
        value: value.toString(),
        fieldId: id,
      };
      temp[dynamicFields].push(dynamicFieldValueObject);
      tempAge[dynamicFields].push(dynamicFieldValueObject);
      setAge({ ...tempAge });
      setSafetyCard({ ...temp });
    }
    temp[name] = value;
    tempAge[name] = value;
    setAge({ ...tempAge });
    setSafetyCard({ ...temp });
  };

  useEffect(() => {
    dispatch(configThunk());
  }, []);

  useEffect(() => {
    console.log(config, safetyCard);
    const temp = {};
    const tempAge = age;
    const createdBy = "createdBy";
    temp[createdBy] = config.length > 0 ? config[0].id : 0;
    const dynamicFields = "dynamicFields";
    temp[dynamicFields] = [];
    tempAge[dynamicFields] = [];
    setSafetyCard({ ...temp });
    // config[0].screens[0].properties.forEach((item) => {
    //   setSafetyCard({ item });
    // });
    // setSafetyCard({ config });
  }, [config]);
  const dropdownIcon = () => <ArrowDropDownIcon fontSize="medium" />;

  // const handleSafetyCardChange = (e) => {
  //   console.log(e);
  //   const temp = safetyCard;
  //   const { name, id, value } = e.target;
  //   temp[name] = value;
  //   setSafetyCard({ ...temp });
  // };

  useEffect(() => {
    console.log(safetyCard);
  }, [safetyCard]);

  const createSafetycard = async () => {
    const res = await dispatch(createSafetyCardThunk(safetyCard));
    console.log(res);
    if (res.error === undefined) {
      setOpen(false);
      const res1 = await dispatch(getAllSafetyThunk());
      if (res1.error === undefined) {
        setopenSnackbar(true);
        setSnackbarContent(res.payload.message);
      }
    }
  };

  const updateSafetycard = async () => {
    console.log(updateSafetyCardId);
    const b = {
      body: safetyCard,
      id: updateSafetyCardId,
    };
    const res = await dispatch(updateSafetyCardThunk(b));
    if (res.error === undefined) {
      setOpenEdit(false);
      const res1 = await dispatch(getAllSafetyThunk());
      if (res1.error === undefined) {
        setopenSnackbar(true);
        setSnackbarContent(res.payload.message);
      }
    }
  };

  const handleSnackbarClose = () => setopenSnackbar(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Divider component="div" role="presentation" />
      <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <MDTypography variant="h4" textAlign="center">
          Safety Cards
        </MDTypography>
        <MDTypography variant="Overline" textAlign="center">
          Overview of {safetCardList.length} cards
        </MDTypography>
        <Grid container justifyContent="center" spacing={1} mt={2}>
          <Grid item xs={8} sm="auto">
            <MDButton variant="contained" color="success" onClick={handleOpen} disable>
              New Safe Card
            </MDButton>
          </Grid>
          <Grid item xs={8} sm="auto">
            <MDButton variant="contained" color="secondary" disable>
              New Unsafe Card
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
      <MDBox mt={20}>
        <Grid item xs={12}>
          <Card>
            <MDBox
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
                HSE Cards Table
              </MDTypography>
            </MDBox>
            <MDBox pt={2}>
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
      </MDBox>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDBox bgColor="info" p={3} mb={3} textAlign="center" borderRadius="8px">
            <MDTypography
              id="modal-modal-title"
              variant="h4"
              color="white"
              bgColor="info"
              fontWeight="regular"
            >
              HSE Card
            </MDTypography>
          </MDBox>
          <MDBox px={2} py={2} sx={{ maxHeight: 500, overflowY: "scroll" }}>
            {config.length > 0
              ? config[0].screens[0].properties.map((item) => (
                  <MDBox mb={1}>
                    {" "}
                    <MDBox display="flex" justifyContent="space-between">
                      <MDTypography id="modal-modal-description" display="flex">
                        <MDTypography color="error">{item.IsRequired ? "*" : null}</MDTypography>
                        {item.title}
                      </MDTypography>

                      {item.type === "text" ? (
                        <MDInput
                          sx={{ width: 400, m: 1 }}
                          size="small"
                          variant="outlined"
                          placeholder={`Please Enter ${item.title}`}
                          id={item.id}
                          name={item.id}
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              e.target.value,
                              item.questionId ? item.questionId : item.id
                            )
                          }
                        />
                      ) : null}
                      {item.type === "options" ? (
                        <FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
                          <InputLabel id={item.id}>{item.id}</InputLabel>
                          <Select
                            value={age[item.id]}
                            width="90%"
                            onChange={(e) =>
                              handleChange(
                                item.id,
                                item.questionId
                                  ? item.options[e.target.value - 1].title
                                  : e.target.value,
                                // item.options[e.target.value - 1].title,
                                item.questionId ? item.questionId : item.id
                              )
                            }
                            displayEmpty
                            IconComponent={dropdownIcon}
                            labelId={item.id}
                            id={item.questionId ? item.questionId : item.id}
                            name={item.id}
                            sx={{ color: "black", backgroundColor: "black", paddingY: "0.4rem" }}
                          >
                            {item.options.map((val) => (
                              <MenuItem value={val.id} id={val.id}>
                                <MDTypography id={val.id} variant="subtitle1">
                                  {val.title}
                                </MDTypography>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : null}
                      {/* {item.type === "checkbox" ? (
                        <FormGroup display="flex" sx={{ width: 400, flexDirection: "row" }}>
                          {item.options.map((val) => (
                            <FormControlLabel
                              control={<Checkbox onChange={handleCheckBox} />}
                              label={val.title}
                            />
                          ))}
                        </FormGroup>
                      ) : null} */}
                      {item.type === "checkbox" ? (
                        <MDBox sx={{ width: 400 }} display="flex" justifyContent="start">
                          <Switch
                            onChange={(e) =>
                              handleCheckBox(item.title, item.questionId, e.target.checked)
                            }
                          />
                        </MDBox>
                      ) : null}
                    </MDBox>
                    {item.type === "textarea" ? (
                      <MDInput
                        sx={{ width: 660 }}
                        multiline
                        rows={3}
                        id={item.id}
                        name={item.id}
                        placeholder={`Please Enter ${item.title}`}
                        onChange={(e) =>
                          handleChange(
                            item.id,
                            e.target.value,
                            item.questionId ? item.questionId : item.id
                          )
                        }
                      />
                    ) : null}
                  </MDBox>
                ))
              : null}
          </MDBox>
          <MDBox px={2} mb={2}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Grid xs={2}>
                <MDButton variant="outlined" color="error" onClick={handleClose}>
                  Close
                </MDButton>
              </Grid>
              <Grid xs={2}>
                <MDButton variant="contained" color="success" onClick={createSafetycard}>
                  Submit
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDBox bgColor="info" p={3} mb={3} textAlign="center" borderRadius="8px">
            <MDTypography
              id="modal-modal-title"
              variant="h4"
              color="white"
              bgColor="info"
              fontWeight="regular"
            >
              HSE Card Update
            </MDTypography>
          </MDBox>
          <MDBox px={2} py={2} sx={{ maxHeight: 500, overflowY: "scroll" }}>
            {config.length > 0
              ? config[0].screens[0].properties.map((item) => (
                  <MDBox mb={1}>
                    {" "}
                    <MDBox display="flex" justifyContent="space-between">
                      <MDTypography id="modal-modal-description" display="flex">
                        <MDTypography color="error">{item.IsRequired ? "*" : null}</MDTypography>
                        {item.title}
                      </MDTypography>

                      {item.type === "text" ? (
                        <MDInput
                          sx={{ width: 400, m: 1 }}
                          size="small"
                          variant="outlined"
                          placeholder={`Please Enter ${item.title}`}
                          id={item.id}
                          name={item.id}
                          value={safetyCard[item.id]}
                          onChange={(e) =>
                            handleChange(
                              item.id,
                              e.target.value,
                              item.questionId ? item.questionId : item.id
                            )
                          }
                        />
                      ) : null}
                      {item.type === "options" ? (
                        <FormControl sx={{ m: 1, minWidth: 120, width: 400 }}>
                          <InputLabel id={item.id}>{item.id}</InputLabel>
                          <Select
                            value={safetyCard[item.id]}
                            width="90%"
                            onChange={(e) =>
                              handleChange(
                                item.id,
                                item.questionId
                                  ? item.options[e.target.value - 1].title
                                  : e.target.value,
                                // item.options[e.target.value - 1].title,
                                item.questionId ? item.questionId : item.id
                              )
                            }
                            // defaultValue={safetyCard[item.id]}
                            displayEmpty
                            IconComponent={dropdownIcon}
                            labelId={item.id}
                            id={item.questionId ? item.questionId : item.id}
                            name={item.id}
                            sx={{ color: "black", backgroundColor: "black", paddingY: "0.4rem" }}
                          >
                            {item.options.map((val) => (
                              <MenuItem value={val.id} id={val.id}>
                                <MDTypography id={val.id} variant="subtitle1">
                                  {val.title}
                                </MDTypography>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : null}
                      {item.type === "checkbox" ? (
                        <MDBox sx={{ width: 400 }} display="flex" justifyContent="start">
                          <Switch
                            onChange={(e) =>
                              handleCheckBox(item.title, item.questionId, e.target.checked)
                            }
                          />
                        </MDBox>
                      ) : null}
                    </MDBox>
                    {item.type === "textarea" ? (
                      <MDInput
                        sx={{ width: 660 }}
                        multiline
                        rows={3}
                        id={item.id}
                        name={item.id}
                        placeholder={`Please Enter ${item.title}`}
                        value={safetyCard.description}
                        onChange={(e) =>
                          handleChange(
                            item.id,
                            e.target.value,
                            item.questionId ? item.questionId : item.id
                          )
                        }
                      />
                    ) : null}
                  </MDBox>
                ))
              : null}
          </MDBox>
          <MDBox px={2} mb={2}>
            <Grid container direction="row" justifyContent="flex-end" alignItems="center">
              <Grid xs={2}>
                <MDButton variant="outlined" color="error" onClick={handleEditClose}>
                  Close
                </MDButton>
              </Grid>
              <Grid xs={2}>
                <MDButton variant="contained" color="success" onClick={updateSafetycard}>
                  Update
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      </Modal>

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
    </DashboardLayout>
  );
}

export default Dashboard;
