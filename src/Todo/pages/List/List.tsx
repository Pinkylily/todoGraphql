import ErrorBoundary from "@/common/components/errorBoundary/ErrorBoundary";
import ErrorFallback from "@/common/components/errorFallback/ErrorFallback";
import { useQuery } from "@apollo/client";
import {
  Checkbox,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List as MUIList,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TodoContext from "@todo/data/TodoContext";
import { ALL_TODOS } from "@todo/data/TodoQueries";
import { ITodo, ITodoFilters } from "@todo/data/TodoTypes";
import { useUpdateAllTodoStatus } from "@todo/hook/updateStatusHooks";
import Filters from "@todo/pages/list/components/filters/Filters";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

interface IListProps {}

export const FallbackList: React.FC = () => (
  <ErrorFallback message="La liste n'a pas pu être récupérée." />
);

const List: React.FC<IListProps> = () => {
  const [todoFilters] = useContext(TodoContext);
  const { data, error, loading } = useQuery<
    { todoList: ITodo[] },
    ITodoFilters
  >(ALL_TODOS, {
    variables: todoFilters,
  });
  const [onChange, updateResult] = useUpdateAllTodoStatus();

  if (loading) {
    return <CircularProgress />;
  }

  if (error || updateResult.error) {
    <FallbackList />;
  }

  return (
    <>
      <Filters />
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
    </>
  );
};

export default function ListErrorBoundary(props: IListProps) {
  return (
    <ErrorBoundary fallback={<FallbackList />}>
      <List {...props} />
    </ErrorBoundary>
  );
}
