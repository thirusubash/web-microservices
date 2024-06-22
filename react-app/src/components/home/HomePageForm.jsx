import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import usePost from "hooks/usePost";

function HomePageForm({ initialData, onSuccess, notification }) {
  const defaultData = {
    id: null,
    title: "",
    type: "",
    primaryButtonTitle: null,
    secondaryButtonTitle: null,
    primaryButtonRedirectUrl: null,
    secondaryButtonRedirectUrl: null,
    postHeadline: null,
    websiteTitle: null,
    sortOrder: 0,
    detailedDescription: null,
    notificationMessage: null,
    imageUuids: [null, null],
    visible: false,
  };

  const [formData, setFormData] = useState(initialData || defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const { post } = usePost("/homepage-service/v1");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await post(formData);
      notification({
        open: true,
        message: "Successfully saved!",
        severity: "success",
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      notification({
        open: true,
        message: "Error: " + error.message,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Type"
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Primary Button Title"
              name="primaryButtonTitle"
              value={formData.primaryButtonTitle || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Secondary Button Title"
              name="secondaryButtonTitle"
              value={formData.secondaryButtonTitle || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Primary Button Redirect URL"
              name="primaryButtonRedirectUrl"
              value={formData.primaryButtonRedirectUrl || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Secondary Button Redirect URL"
              name="secondaryButtonRedirectUrl"
              value={formData.secondaryButtonRedirectUrl || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Post Headline"
              name="postHeadline"
              value={formData.postHeadline || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notification Message"
              name="notificationMessage"
              value={formData.notificationMessage || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website Title"
              name="websiteTitle"
              value={formData.websiteTitle || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Detailed Description"
              name="detailedDescription"
              value={formData.detailedDescription || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sort Order"
              name="sortOrder"
              value={formData.sortOrder || ""}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              endIcon={isLoading && <Typography> Loading </Typography>}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default HomePageForm;
