import { Typography } from "@mui/material";
import React from "react";

interface IErrorFallbackProps {
  message: string;
}

const ErrorFallback: React.FC<IErrorFallbackProps> = ({ message }) => {
  return (
    <div>
      <Typography variant="h4">{"Oups une erreur est survenue !"}</Typography>
      <Typography variant="body1">{message}</Typography>
    </div>
  );
};

export default ErrorFallback;
