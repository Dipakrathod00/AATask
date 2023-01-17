import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import { data, schema, initialValue } from "../Enum/Enum";

export default function Home() {
  const [filterdData, setfilterdData] = useState("");
  const [searchValue, setsearchValue] = useState("");
  const [intVal, setintVal] = useState("");

  const employeeData = useMemo(
    () =>
      data?.find((item) => {
        return item.team == filterdData;
      }),
    [filterdData]
  );

  return (
    <Box>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ marginTop: 10 }}>
              <Formik
                validationSchema={schema}
                enableReinitialize
                initialValues={initialValue}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  setintVal(values);
                  JSON.stringify(values);
                  setsearchValue("");
                  resetForm();
                }}
              >
                {(props) => {
                  return (
                    <>
                      <form onSubmit={props.handleSubmit}>
                        <Card>
                          <CardContent>
                            <Typography
                              sx={{ fontSize: 30 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Teams
                            </Typography>
                            <FormControl fullWidth>
                              <InputLabel>Team</InputLabel>
                              <Select
                                name="team"
                                id="team"
                                onBlur={props.handleBlur}
                                value={props.values.team}
                                onChange={(e) => {
                                  props.values.employee = "";
                                  setsearchValue("");
                                  props.setFieldValue("team", e.target.value);
                                }}
                                label="Team"
                              >
                                {data?.map((item) => {
                                  return (
                                    <MenuItem
                                      value={item?.team}
                                      key={item?.team}
                                    >
                                      {item?.team}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {props.errors.team && props.touched.team ? (
                                <div style={{ color: "red" }}>
                                  {props.errors.team}
                                </div>
                              ) : null}
                            </FormControl>

                            {props.values.team
                              ? setfilterdData(props.values.team)
                              : null}
                            <br />
                            <br />
                            <FormControl fullWidth>
                              <InputLabel>Employee</InputLabel>
                              <Select
                                name="employee"
                                onBlur={props.handleBlur}
                                value={props.values.employee}
                                onChange={(e) => {
                                  setsearchValue("");
                                  props.setFieldValue(
                                    "employee",
                                    e.target.value
                                  );
                                }}
                                label="Employee"
                              >
                                {props.values?.team?.length ? (
                                  <TextField
                                    onClickCapture={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                    }}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    style={{
                                      marginLeft: "12px",
                                      width: "95%",
                                    }}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      setsearchValue(e.target.value);
                                    }}
                                    value={props.values.employee}
                                    placeholder="Search employee"
                                  />
                                ) : (
                                  <MenuItem disabled>No Data Found</MenuItem>
                                )}
                                {props.values?.team?.length &&
                                  employeeData?.employees
                                    ?.filter((value) => {
                                      if (searchValue === "") {
                                        return value;
                                      } else if (
                                        value
                                          .toLocaleLowerCase()
                                          .includes(
                                            searchValue.toLocaleLowerCase()
                                          )
                                      ) {
                                        return value;
                                      }
                                    })
                                    .map((item) => {
                                      return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                      );
                                    })}
                              </Select>
                              {props.errors.employee &&
                              props.touched.employee ? (
                                <div style={{ color: "red" }}>
                                  {props.errors.employee}
                                </div>
                              ) : null}
                            </FormControl>
                            <br />
                            <br />

                            <Button
                              type="submit"
                              variant="contained"
                              size="medium"
                            >
                              Submit
                            </Button>
                          </CardContent>
                        </Card>
                      </form>
                    </>
                  );
                }}
              </Formik>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ marginTop: "80px" }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 30 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Preview
                </Typography>
                <div>
                  <strong>Team:</strong> {intVal?.team}
                </div>
                <br />
                <strong>Employee: </strong> {intVal?.employee}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
