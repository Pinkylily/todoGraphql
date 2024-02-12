import { useUpdateAllTodoStatus } from "@/Todo/hook/updateStatusHook";
import ErrorBoundary from "@/common/components/errorBoundary/ErrorBoundary";
import { useQuery } from "@apollo/client";
import ErrorFallback from "@common/components/errorFallback/ErrorFallback";
import {
  Box,
  Checkbox,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List as MUIList,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Link } from "react-router-dom";
import { ALL_TODOS } from "../../data/TodoQueries";
import { ITodo } from "../../data/TodoTypes";

interface IListProps {}

export const FallbackList: React.FC = () => (
  <ErrorFallback message="La liste n'a pas pu être récupérée." />
);

const List: React.FC<IListProps> = () => {
  const { data, error, loading } = useQuery<{ todoList: ITodo[] }>(ALL_TODOS);
  const [onChange, updateResult] = useUpdateAllTodoStatus();

  if (loading) {
    return <CircularProgress />;
  }

  if (error || updateResult.error) {
    <FallbackList />;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 760, bgcolor: "background.paper" }}>
      <MUIList>
        {data.todoList.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <ListItem disablePadding>
              <ListItemIcon>
                <Checkbox
                  checked={todo.isDone}
                  onChange={(e, checked) => onChange(todo, checked)}
                />
              </ListItemIcon>
              <ListItemButton component={Link} to={`/details/${todo.id}`}>
                <ListItemText
                  primary={todo.title}
                  secondary={`Type: ${todo.type} Crée le: ${new Date(todo.createdAt).toDateString()}`}
                />
              </ListItemButton>
            </ListItem>
            {index !== data.todoList.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </MUIList>
    </Box>
  );
};

export default function ListErrorBoundary(props: IListProps) {
  return (
    <ErrorBoundary fallback={<FallbackList />}>
      <List {...props} />
    </ErrorBoundary>
  );
}
