import React from "react";
import { Grid, Paper } from "@mui/material";
import ThemePreview from "./ThemePreview";
import MaterialUIThemeGenerator from "./MaterialUIThemeGenerator";
import ImageCrud from "components/users/admin/ImageContoller";

function Settings() {
  return (
    <Paper style={{ padding: 16 }}>
      <ImageCrud />
      {/* <MaterialUIThemeGenerator /> */}
    </Paper>
  );
}

export default Settings;
