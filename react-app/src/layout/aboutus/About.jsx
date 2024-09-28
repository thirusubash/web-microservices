import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Fab,
  Link,
  Button,
} from "@mui/material";
import {
  useSpring,
  animated,
  useTrail,
} from "@react-spring/web";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";

// Images
import graniteMarbleImg from "./granite-marble.webp";
import concreteBricks from "./concrete-bricks.webp";
import contactUs from "./contact-us.webp";
import msand from "./msand.webp";
import graniteQuarry from "./granite-quarry.webp";

const About = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1500 },
  });

  const trail = useTrail(4, {
    config: { tension: 200, friction: 20 },
    opacity: 1,
    transform: "translate3d(0,0,0)",
    from: { opacity: 0, transform: "translate3d(0,40px,0)" },
  });

  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 400) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Parallax pages={5} style={{ top: "0", left: "0" }}>
        <ParallaxLayer offset={0} speed={0.5}>
          <Container sx={{ paddingTop: 10 }}>
            <animated.div style={fadeIn}>
              {trail.map((props, index) => (
                <animated.div key={index} style={props}>
                  {index === 0 && (
                    <Typography
                      align="center"
                      variant="h2"
                      component="h1"
                      gutterBottom
                      sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                      Welcome to GKSVP
                    </Typography>
                  )}
                  {index === 1 && (
                    <Typography variant="h5" component="p" paragraph>
                      Since 1996, GKSVP has been a cornerstone in the construction industry, renowned for providing top-tier granite, marble, and an extensive array of construction materials. Over the past two decades, our unwavering commitment to quality and customer satisfaction has cemented our reputation as a trusted partner for homeowners, builders, and contractors alike.
                    </Typography>
                  )}
                  {index === 2 && (
                    <>
                      <Typography variant="h6" component="h2" gutterBottom>
                        Our Story
                      </Typography>
                      <Typography paragraph>
                        GKSVP was born in 1996 from a simple idea: to make high-quality construction materials accessible to everyone, regardless of project size. Our founder envisioned a world where premium materials like granite and marble were within reach for every builder and homeowner. With a passion for natural stone and construction, and a drive to make a difference, they embarked on a journey that would lead to the creation of GKSVP.
                      </Typography>
                      <Typography paragraph>
                        Our early days were filled with challenges, learning experiences, and early successes. We bootstrapped our way to success, fueled by the support of our early customers and the unwavering belief in our mission. Today, we're proud to be a leading provider of granite, marble, and a wide range of construction materials, serving customers across the region.
                      </Typography>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <Typography variant="h6" component="h2" gutterBottom>
                        Our Values
                      </Typography>
                      <Typography paragraph>
                        At GKSVP, we're guided by a set of core values that shape everything we do:
                      </Typography>
                      <Typography component="ul" sx={{ pl: 2 }}>
                        <li>Customer-Centricity: We put our customers at the heart of everything we do. Your satisfaction is our top priority.</li>
                        <li>Integrity & Transparency: We believe in honest and transparent communication, both with our customers and within our team.</li>
                        <li>Quality & Excellence: We are committed to providing products and services of the highest quality, exceeding industry standards.</li>
                        <li>Innovation & Continuous Improvement: We constantly strive to innovate and improve our products, services, and processes.</li>
                      </Typography>
                    </>
                  )}
                </animated.div>
              ))}
            </animated.div>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.7}>
          <Container sx={{ paddingY: 10 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box
                  component="img"
                  src={graniteMarbleImg}
                  alt="Granite and Marble"
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <animated.div style={fadeIn}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Exquisite Granite and Marble
                  </Typography>
                  <Typography variant="body1" component="p">
                    Discover the finest selection of granite and marble slabs that add a touch of elegance and durability to any project. Our premium stones, sourced from the best quarries, are perfect for countertops, flooring, and bespoke architectural designs. With over 800 manufacturers in our network, we offer a diverse and expansive range of colors, patterns, and textures, all available at a single place. This collaboration ensures that you have access to the best materials for your specific needs.
                  </Typography>
                </animated.div>
              </Grid>
            </Grid>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.8}>
          <Container sx={{ paddingY: 10 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <animated.div style={fadeIn}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Our Premier Services
                  </Typography>
                  <Typography variant="body1" component="p">
                    We offer high-quality construction materials and professional machinery services to meet all your building needs:
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>M-Sand and P-Sand:</strong> Engineered for superior strength and workability, our manufactured and plastering sand is perfect for every construction requirement.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Hollow Bricks (4" and 6"):</strong> These lightweight yet sturdy bricks are ideal for cost-effective and efficient building solutions.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Solid Bricks (8"):</strong> Perfect for load-bearing walls, our solid bricks offer unmatched durability and strength.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Crane Service:</strong> Our reliable and efficient crane services ensure safe and precise lifting and movement of heavy materials.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Tipper Rental:</strong> Flexible tipper rental options on a per-load basis guarantee timely and efficient material transport.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Excavator Works (using CAT):</strong> Utilizing the latest CAT machinery, our skilled operators provide expert digging, grading, and earthmoving services.
                  </Typography>
                </animated.div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={msand}
                  alt="M-Sand and P-Sand"
                  sx={{ width: "100%", borderRadius: 2 }}
                />
                <Box
                  component="img"
                  src={concreteBricks}
                  alt="Concrete Bricks"
                  sx={{ width: "100%", borderRadius: 2, mt: 2 }}
                />
              </Grid>
            </Grid>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.9}>
          <Container sx={{ paddingY: 10 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box
                  component="img"
                  src={graniteQuarry}
                  alt="Granite Quarry"
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <animated.div style={fadeIn}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Why Choose GKSVP?
                  </Typography>
                  <Typography variant="body1" component="p">
                    At GKSVP, our goal is to deliver exceptional quality and service on every project. Here's why we stand out:
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Expertise:</strong> With over two decades of industry experience, we have the knowledge and skills to meet your construction needs.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Quality Assurance:</strong> Our products and services are meticulously curated and executed to ensure the highest standards of quality.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Customer Satisfaction:</strong> Your satisfaction is our priority. We work closely with you to understand and fulfill your specific requirements.
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Granite and Marble Consultation Services:</strong> Our consultation services are designed to help you choose the perfect stone for your project. Whether you're looking for a timeless marble countertop or a stunning granite feature wall, our experts are here to guide you through the selection process.
                  </Typography>
                </animated.div>
              </Grid>
            </Grid>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={1.0}>
          <Container sx={{ paddingY: 10 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <Box
                  component="img"
                  src={contactUs}
                  alt="Contact Us"
                  sx={{ width: "100%", borderRadius: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <animated.div style={fadeIn}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Get in Touch
                  </Typography>
                  <Typography variant="body1" component="p">
                    We invite you to explore our offerings and see how we can contribute to the success of your next project. Contact us today to discuss your needs and get expert advice from our team.
                  </Typography>

                  <Typography variant="body1" component="p">
                    <strong>Phone:</strong>{" "}
                    <Link href="tel:+919787048122" underline="none">
                      9787048122
                    </Link>
                  </Typography>
                  <Typography variant="body1" component="p">
                    <strong>Email:</strong>{" "}
                    <Link href="mailto:thiruhcl2016@gmail.com" underline="none">
                      thiruhcl2016@gmail.com
                    </Link>
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/contactus")}
                    sx={{
                      mt: 2,
                      transition: "transform 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Go to Contact Us
                  </Button>
                </animated.div>
              </Grid>
            </Grid>
          </Container>
        </ParallaxLayer>
      </Parallax>

      <Fab
        color="primary"
        size="small"
        onClick={scrollTop}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: showScroll ? "flex" : "none",
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </div>
  );
};

export default About;
