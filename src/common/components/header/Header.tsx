import ChecklistIcon from "@mui/icons-material/Checklist";
import { AppBar, Toolbar, Typography } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <ChecklistIcon sx={{ display: "flex", mr: 2 }} />
        <Typography
          variant="h6"
          component={Link}
          to={"/"}
          noWrap
          sx={{
            flexGrow: 1,
            display: "flex",
            fontFamily: "monospace",
          }}
        >
          Ma liste de choses à faire
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
