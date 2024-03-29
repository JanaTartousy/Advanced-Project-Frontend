import "./employeeProfile.css";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import EmployeeChart from "./../../components/employeeChart/employeeChart";
import TextField from "@mui/material/TextField";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { UserContext } from "../../userContext";
import { toast } from "react-toastify";

export default function EmployeeProfile(props) {
  const { token } = React.useContext(UserContext);
  const { id } = useParams();
  const fullName = `${props.firstName} ${props.lastName}`;
  const [imageUrl, setImageUrl] = React.useState("");
  const history = useNavigate();
  const [employee, setEmployee] = React.useState();
  const [firstName, setFirstName] = React.useState(props.firstName);
  const [lastName, setLastName] = React.useState(props.lastName);
  const [email, setEmail] = React.useState(props.email);
  const [phoneNumber, setPhoneNumber] = React.useState(props.phoneNumber);
  const [team, setTeam] = React.useState(props.team);
  const [dateOfBirth, setDateOfBirth] = React.useState(props.dateOfBirth);
  const [latestKpiEvaluation, setLatestKpiEvaluation] = React.useState(
    props.latestKpiEvaluation
  );

  const [isEditable, setIsEditable] = React.useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "team":
        setTeam(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "latestKpiEvaluation":
        setLatestKpiEvaluation(value);
        break;
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveButtonClick = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/employees/${id}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          team: team,
          date_of_birth: dateOfBirth,
          _method: "patch",
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setIsEditable(false);
        toast.success("Employee data updated successfully.");
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const statusCode = error.response.status;
          const message =
            statusCode === 404
              ? "Employee not found."
              : "An error occurred while updating employee data.";
          toast.error(message);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An error occurred while updating employee data.");
        }
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleBackButtonClick = () => {
    history("/employees");
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setEmployee(response.data.employee);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [id, token]);

  return (
    <>
      <div className="back-container">
        <Button
          className="backward-button"
          onClick={handleBackButtonClick}
          variant="contained"
          sx={{ backgroundColor: "#369fff", color: "#F6F8FA" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
      </div>
      <div className="employee-profile-page">
        <Box
          sx={{ backgroundColor: "#e8f2fd", minHeight: "110vh", margin: "5%" }}
        >
          <Box
            className="header-employee-fullname"
            sx={{
              backgroundColor: "#369fff",
              py: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="first-item-in-the-header"></div>
            <Typography
              // className="editicon-and-fullname"
              variant="h5"
              align="center"
              color="white"
              sx={{ fontSize: "2rem", fontWeight: "600" }}
            >
              {employee && `${employee.first_name} ${employee.last_name}`}
            </Typography>
            <FaEdit
              className="employee-editicon"
              onClick={handleEditClick}
              color="white"
              sx={{
                alignSelf: "flex-end",
              }}
            ></FaEdit>
          </Box>
          <Box
            className="textfield"
            sx={{ py: 3, "& .MuiTextField-root": { m: 1 } }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <Card
              className="card"
              sx={{
                maxWidth: 360,
                backgroundColor: "transparent",
                display: "flex",
                boxShadow: "none",
                minHeight: 350,
              }}
            >
              <label htmlFor="file-input">
                {employee && (
                  <CardMedia
                    component="img"
                    height="250"
                    image={employee.picture}
                    alt="Profile Image"
                    sx={{ display: "block", margin: "auto" }}
                  />
                )}
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={handleImageChange}
                    endIcon={<PhotoCamera />}
                    variant="contained"
                    size="small"
                    sx={{
                      m: "auto",
                      backgroundColor: "#4caf50",
                      color: "#F6F8FA",
                      "&:hover": {
                        transform: "scale(1.05)",
                        transition: "0.3s ease-out",
                        backgroundColor: "#388e3c",
                      },
                    }}
                  >
                    Change
                  </Button>
                </CardContent>
                <Button></Button>
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                // onChange={handleImageChange}
              />
            </Card>
            {employee && (
              <>
                <div className="right-section-1">
                  <TextField
                    id="employeeId"
                    label="ID"
                    defaultValue={id}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                  />
                  <TextField
                    id="firstName"
                    label="First Name"
                    defaultValue={employee.first_name}
                    disabled={!isEditable}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    defaultValue={employee.email}
                    disabled={!isEditable}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    defaultValue={employee.phone_number}
                    disabled={!isEditable}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                </div>
                <div className="right-section-2">
                  <TextField
                    id="team"
                    label="Team"
                    defaultValue={employee.team?.name || "Not Assigned"}
                    disabled={!isEditable}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    id="lastName"
                    label="Last Name"
                    defaultValue={employee.last_name}
                    disabled={!isEditable}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    id="dateOfBirth"
                    type="date"
                    defaultValue={employee.dob}
                    disabled={!isEditable}
                    onChange={handleInputChange}
                    variant="outlined"
                  />
                  <TextField
                    id="latestKpiEvaluation"
                    label="Latest KPI Evaluation"
                    type="number"
                    defaultValue={latestKpiEvaluation}
                    onChange={handleInputChange}
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>
              </>
            )}
            <Button
              className="save-button"
              variant="contained"
              onClick={() => handleSaveButtonClick(id)}
              disabled={!isEditable}
              sx={{
                color: "#F6F8FA",
                backgroundColor: "#4caf50",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "0.2s ease-out",
                  color: "#F6F8FA",
                  backgroundColor: " #388e3c",
                },
              }}
            >
              Save
            </Button>
          </Box>
          <EmployeeChart />
        </Box>
      </div>
    </>
  );
}
