import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { animated, useSpring, useTrail } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

const Careers = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  // Memoized job listings data for performance optimization
  const memoizedJobs = useMemo(
    () => [
      {
        title: "Senior Software Engineer",
        location: "Remote (India)",
        type: "Full-time",
        description:
          "Join our team of talented engineers and work on cutting-edge projects in a dynamic and collaborative environment.",
        imageUrl:
          "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      {
        title: "UX/UI Designer",
        location: "Hybrid (Krishnagiri, India)",
        type: "Contract",
        description:
          "We are looking for a creative and experienced UX/UI Designer to lead design projects for our innovative products.",
        imageUrl:
          "https://images.pexels.com/photos/3184334/pexels-photo-3184334.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      {
        title: "Product Manager",
        location: "Remote (India)",
        type: "Full-time",
        description:
          "As a Product Manager, you'll drive the strategy and execution of product development, working closely with cross-functional teams.",
        imageUrl:
          "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      {
        title: "Sales Executive",
        location: "Krishnagiri, India",
        type: "Full-time",
        description:
          "We are seeking a motivated Sales Executive to help drive our sales team and contribute to our growth strategy.",
        imageUrl:
          "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      {
        title: "Sales Representative",
        location: "Krishnagiri, India",
        type: "Part-time",
        description:
          "Join our sales team as a Sales Representative and play a key role in expanding our customer base.",
        imageUrl:
          "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      {
        title: "Customer Support Executive",
        location: "Remote (India)",
        type: "Full-time",
        description:
          "We are looking for a Customer Support Executive to provide exceptional customer service and ensure customer satisfaction.",
        imageUrl:
          "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
      {
        title: "Receptionist",
        location: "Krishnagiri, India",
        type: "Full-time",
        description:
          "As a Receptionist, you will be the first point of contact for our company, providing administrative support across the organization.",
        imageUrl:
          "https://images.pexels.com/photos/3184305/pexels-photo-3184305.jpeg?auto=compress&cs=tinysrgb&w=1600",
      },
    ],
    []
  );

  // Animations for job cards
  const jobsSprings = useTrail(memoizedJobs.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  // Animated entrance for the hero section
  const heroSpring = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <Box
      component="section"
      aria-labelledby="careers-section-heading"
      sx={{ mt: 4, mb: 4, p: 2 }}
    >
      {/* Hero Section */}
      <animated.div style={heroSpring}>
        <Paper
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.common.white,
            textAlign: "center",
            p: { xs: 4, md: 6 },
            borderRadius: 2,
            boxShadow: 4,
            backgroundImage: `url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
            }}
          ></Box>
          <Typography
            id="careers-section-heading"
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ position: "relative", fontWeight: "bold" }}
          >
            Join Our Team
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              position: "relative",
              mb: 4,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            We’re always looking for passionate and talented individuals to grow
            with us. Explore our open positions and apply to become a part of
            our dynamic team.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            aria-label="Explore Open Positions"
            sx={{
              mt: 2,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
              zIndex: 1,
              position: "relative",
            }}
            onClick={() => {
              document.getElementById("open-positions").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Explore Open Positions
          </Button>
        </Paper>
      </animated.div>

      {/* Open Positions */}
      <Box sx={{ mt: 6 }} id="open-positions">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
          }}
        >
          Current Job Openings
        </Typography>
        <Grid container spacing={4}>
          {jobsSprings.map((style, index) => (
            <Grid item xs={12} md={4} key={index}>
              <animated.div style={style}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: theme.shadows[4],
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={memoizedJobs[index].imageUrl}
                    alt={`${memoizedJobs[index].title} - ${memoizedJobs[index].location}`}
                    sx={{
                      filter: "brightness(0.75)",
                      transition: "filter 0.3s",
                      "&:hover": {
                        filter: "brightness(1)",
                      },
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {memoizedJobs[index].title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <LocationOnIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />
                        <Typography variant="subtitle2">
                          {memoizedJobs[index].location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <AccessTimeIcon
                          sx={{ mr: 1, color: theme.palette.primary.main }}
                        />
                        <Typography variant="subtitle2">
                          {memoizedJobs[index].type}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {memoizedJobs[index].description}
                      </Typography>
                    </Box>
                    <CardActions sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => navigate(`/careers/${index + 1}`)}
                        aria-label={`Apply for ${memoizedJobs[index].title}`}
                        sx={{
                          transition: "transform 0.2s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        Apply Now
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </animated.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Join Us Section */}
      <Box
        sx={{
          mt: 6,
          p: 4,
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[100],
          borderRadius: 2,
          boxShadow: theme.shadows[4],
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 4,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
          }}
        >
          Why Join Us?
        </Typography>
        <Accordion
          sx={{
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[300]
            }`,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">
              Competitive Salaries & Benefits
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We offer industry-leading compensation packages and a wide range
              of benefits, including health insurance, retirement plans, and
              generous vacation policies.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[300]
            }`,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">
              Growth & Development Opportunities
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              We believe in fostering a culture of continuous learning. Our team
              members have access to professional development courses,
              mentorship programs, and career advancement opportunities.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? theme.palette.grey[700]
                : theme.palette.grey[300]
            }`,
            borderRadius: 2,
            mb: 2,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">
              Innovative & Inclusive Work Environment
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              Our work environment is designed to encourage creativity,
              collaboration, and innovation. We embrace diversity and strive to
              create an inclusive space where everyone feels valued and
              empowered.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Careers;
