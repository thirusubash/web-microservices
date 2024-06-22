import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled, keyframes } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
    experienceColors: ["#f44336", "#9c27b0", "#3f51b5", "#4caf50", "#ff9800"],
  },
  typography: {
    h2: {
      color: "#1976d2",
    },
    h4: {
      color: "#dc004e",
    },
    body1: {
      color: "#333",
    },
  },
});

const slideInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const slideInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const slideInFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const slideInFromBottom = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledContainer = styled(Container)({
  padding: "2rem",
  backgroundColor: theme.palette.background.default,
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const StyledSection = styled("section")({
  marginBottom: "2rem",
});

const StyledCard = styled(Card)(({ animation }) => ({
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
  animation: `${animation} 1s ease-in-out`,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0)",
  marginBottom: "1.5rem",
  "&:hover": {
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledButton = styled(Button)({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
});

function Portfolio() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "HCLTechnologies Pvt Ltd, Bangalore",
      period: "March 2022 - March 2024",
      description: [
        "Migrated SharePoint server to cloud-based architecture utilizing Nuxeo web app.",
        "Engineered RESTful web services using Java Spring Boot.",
        "Designed and developed user interface using React.js with Material-UI.",
      ],
      animation: slideInFromLeft,
    },
    {
      title: "Technical Support Engineer",
      company: "Finbro Technologies Pvt Ltd, Bangalore",
      period: "October 2019 - September 2021",
      description: [
        "Developed and maintained enterprise-level web applications using Java, Spring framework, and React.js with Material-UI.",
        "Deployed applications on EC2 servers and managed Linux servers.",
      ],
      animation: slideInFromRight,
    },
    {
      title: "System Expert",
      company: "VALUE POINT SYSTEMS PVT LTD, Bangalore",
      period: "April 2018 - October 2019",
      description: [
        "Conducted in-depth troubleshooting of server hardware and network issues.",
        "Installed and configured Linux servers.",
      ],
      animation: slideInFromLeft,
    },
    {
      title: "Desktop Support Engineer",
      company: "PROGRESSIVE INFOTECH PRIVATE LIMITED, Bangalore",
      period: "June 2017 - March 2018",
      description: [
        "Administration desktop and laptop server hardware & network issues.",
        "Troubleshooting hardware network devices.",
      ],
      animation: slideInFromRight,
    },
    {
      title: "Associate Technical Support Engineer",
      company: "HCL Infosystem Ltd, Bangalore",
      period: "March 2016 - June 2017",
      description: [
        "Administration desktop and laptop server hardware & network issues.",
        "Installing and configuring server and VPN.",
      ],
      animation: slideInFromLeft,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <Typography variant="h2" component="h1" gutterBottom>
          My Portfolio
        </Typography>

        {/* About Me Section */}
        <StyledSection>
          <Typography variant="h4" component="h2" gutterBottom>
            About Me
          </Typography>
          <Typography paragraph>
            Hello! I'm a passionate developer with over 7 years of experience in
            Java, Spring Boot, React.js, JavaScript, and cloud platforms (AWS,
            GCP). I am highly motivated and results-oriented, eager to leverage
            my skills to make a positive impact.
          </Typography>
        </StyledSection>

        {/* Skills Section */}
        <StyledSection>
          <Typography variant="h4" component="h2" gutterBottom>
            Skills
          </Typography>
          <Typography paragraph>
            - Programming Languages: Java, JavaScript
            <br />
            - Frameworks: Spring Boot, Nuxeo
            <br />
            - Database Management: MySQL
            <br />
            - Web Technologies: React, Material UI, Monolithic & Microservices
            Architecture
            <br />
            - Version Control: Git, GitHub, GitLab
            <br />
            - DevOps: EC2, VPC, S3, Lambda, Compute Engine, Cloud Storage, Cloud
            Functions, CI/CD Deployment
            <br />
            - Cloud Platforms: AWS, GCP
            <br />- Tools: JIRA, GitLab, POSTMAN, IntelliJ IDEA, VS Code
          </Typography>
        </StyledSection>

        {/* Experience Sections */}
        {experiences.map((experience, index) => (
          <StyledSection key={index}>
            <StyledCard animation={experience.animation}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  {experience.title}
                </Typography>
                <Typography variant="h5" component="h3">
                  {experience.company} ({experience.period})
                </Typography>
                {experience.description.map((desc, i) => (
                  <Typography key={i} paragraph>
                    {desc}
                  </Typography>
                ))}
              </CardContent>
            </StyledCard>
          </StyledSection>
        ))}

        {/* Contact Information Section */}
        <StyledSection>
          <Typography variant="h4" component="h2" gutterBottom>
            Contact Information
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledButton variant="contained" color="primary" type="submit">
                  Send
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </StyledSection>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default Portfolio;
