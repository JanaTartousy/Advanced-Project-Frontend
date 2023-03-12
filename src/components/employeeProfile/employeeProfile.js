import "./employeeProfile.css";
import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function EmployeeProfile(props) {
  const fullName = `${props.firstName} ${props.lastName}`;
  const [imageUrl, setImageUrl] = React.useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  React.useEffect(() => {
    // fetch('/api/get-profile-image-url')
    //   .then(response => response.json())
    //   .then(data => setImageUrl(data.imageUrl))
    //   .catch(error => console.log(error))
    setImageUrl("/path/to/image.jpg");
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f4f9fc", minHeight: "100vh", margin: "5%" }}>
      <Box sx={{ backgroundColor: "#369fff", py: 3 }}>
        <Typography variant="h5" align="center" color="white">
          Employee Full Name: {fullName}
        </Typography>
      </Box>
      <Box className="input" sx={{ py: 3 }}>
        <Card
          className="card"
          sx={{ maxWidth: 345, backgroundColor: "#F6F8FA" }}
        >
          <CardMedia
            component="img"
            height="150"
            image={imageUrl}
            alt="Profile Image"
          />
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              endIcon={<PhotoCamera />}
              variant="contained"
              size="small"
              component="label"
              sx={{
                mt: "9%",
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
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </Button>
          </CardContent>
        </Card>

        <div className="right-section">
          <div>
            <h3>ID: {props.id}</h3>
            <h3>First Name: {props.firstName}</h3>
            <h3>Email: {props.email}</h3>
            <h3>Phone Number: {props.phoneNumber}</h3>
          </div>
          <div>
            <h3>Team: {props.team}</h3>
            <h3>Last Name: {props.lastName}</h3>
            <h3>Date of Birth: {props.dateOfBirth}</h3>
            <h3>Latest KPI Evaluation: {props.latestKpiEvaluation}</h3>
          </div>
        </div>
      </Box>
    </Box>
  );
}
