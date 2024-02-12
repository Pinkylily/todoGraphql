import { ONE_TODO } from "@/Todo/data/TodoQueries";
import { ITodo } from "@/Todo/data/TodoTypes";
import { useUpdateOneTodoStatus } from "@/Todo/hook/updateStatusHook";
import ErrorBoundary from "@/common/components/errorBoundary/ErrorBoundary";
import ErrorFallback from "@/common/components/errorFallback/ErrorFallback";
import { useQuery } from "@apollo/client";
import {
  Box,
  Checkbox,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

interface IDetailsProps {}

const FallbackDetails: React.FC = () => (
  <ErrorFallback message="La todo n'a pas pu être récupérée." />
);

const Details: React.FC<IDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const todoResult = useQuery<{ todo: ITodo }>(ONE_TODO, {
    variables: { id },
  });
  const [onChange, updateResult] = useUpdateOneTodoStatus();

  if (todoResult.loading) {
    return <CircularProgress />;
  }

  if (todoResult.error || updateResult.error) {
    return <FallbackDetails />;
  }

  const { todo } = todoResult.data;

  return (
    <Box sx={{ width: "100%", maxWidth: 760, bgcolor: "background.paper" }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <Typography typography="h4">{todo.title}</Typography>
          <Checkbox
            checked={todo.isDone}
            onChange={(e, checked) => onChange(todo, checked)}
          />
        </Stack>
        <Typography typography="body1">{todo.text}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography typography="body2">{`Type: ${todo.type}`}</Typography>
          <Typography typography="body2">{`Crée le: ${new Date(todo.createdAt).toDateString()}`}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default function DetailsErrorBoundary(props: IDetailsProps) {
  return (
    <ErrorBoundary fallback={<FallbackDetails />}>
      <Details {...props} />
    </ErrorBoundary>
  );
}
