import React from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Container, Typography, Card, CardContent, Box } from '@mui/material';
import beforeImage from "../../logo.svg"; // Replace with actual paths
import afterImage from "../../logo.svg"; // Replace with actual paths

const Section = ({ title, content, imageSrc, reverse }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: reverse ? "row-reverse" : "row",
      alignItems: "center",
      height: '100vh',
      margin: 0,
      gap: 2,
      padding: 2,
    }}
  >
    <img
      src={imageSrc}
      style={{ width: "50%", height: "auto", objectFit: "cover" }}
      alt={title}
    />
    <Card style={{ width: "50%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const AboutUs = () => (
  <Parallax pages={8} style={{ height: '100vh' }}>
    {/* Sticky Header Layer */}
    <ParallaxLayer
      offset={0}
      speed={0.5}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Typography variant="h3" gutterBottom align="center">
        About Us
      </Typography>
      <Typography align="center">Welcome to our website! Learn more about our products, services, and values.</Typography>
    </ParallaxLayer>

    {/* Section Layers */}
    <ParallaxLayer
      offset={0}
      speed={0.2}
    >
      <Section
        title="About gksvp.com"
        content="Welcome to gksvp.com, your go-to platform for exceptional products and services. We are committed to delivering high-quality experiences tailored to your needs."
        imageSrc={beforeImage}
        reverse={false}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={1}
      speed={0.4}
    >
      <Section
        title="Our Products"
        content="Explore our wide range of products, carefully curated to meet all your needs. From innovative tech to everyday essentials, we have something for everyone."
        imageSrc={afterImage}
        reverse={true}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={2}
      speed={0.6}
    >
      <Section
        title="Our Services"
        content="We offer a variety of services designed to make your life easier. Whether you need expert advice, customer support, or a custom solution, we're here to help."
        imageSrc={beforeImage}
        reverse={false}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={3}
      speed={0.8}
    >
      <Section
        title="What We Do"
        content="At gksvp.com, we specialize in delivering tailored solutions and top-notch products that cater to your unique needs. Our team is dedicated to providing the best experience possible."
        imageSrc={afterImage}
        reverse={true}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={4}
      speed={1.0}
    >
      <Section
        title="Our Values"
        content="Integrity, innovation, and customer satisfaction are at the heart of everything we do. We strive to maintain the highest standards and continually improve our offerings."
        imageSrc={beforeImage}
        reverse={false}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={5}
      speed={1.2}
    >
      <Section
        title="Our Commitment"
        content="We are committed to providing exceptional products and services that exceed your expectations. Our focus is on delivering quality and value in every aspect of our business."
        imageSrc={afterImage}
        reverse={true}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={6}
      speed={1.4}
    >
      <Section
        title="Why Choose Us"
        content="Choose us for our expertise, dedication, and commitment to delivering results. We prioritize your needs and work diligently to ensure your satisfaction with every interaction."
        imageSrc={beforeImage}
        reverse={false}
      />
    </ParallaxLayer>

    <ParallaxLayer
      offset={7}
      speed={1.6}
    >
      <Section
        title="Our Stories"
        content="Discover the stories behind our success and the people who make our company great. Learn about our journey, milestones, and the impact we've made along the way."
        imageSrc={afterImage}
        reverse={true}
      />
    </ParallaxLayer>

    {/* Final Sticky Layer */}
    <ParallaxLayer
      offset={7.5}
      speed={0.2}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <div style={{ width: '100%', textAlign: 'center', padding: '20px' }}>
        <Typography variant="h4">End of the Journey</Typography>
        <Typography variant="body1">You have reached the end of the parallax scroll. Thank you for exploring our story!</Typography>
      </div>
    </ParallaxLayer>
  </Parallax>
);

export default AboutUs;
