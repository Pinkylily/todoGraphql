import { useQuery } from "@apollo/client";
import ErrorFallback from "@common/components/errorFallback/ErrorFallback";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List as MUIList,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { Link } from "react-router-dom";
import { TODO_LIST } from "../../data/TodoQueries";
import { ITodo } from "../../data/TodoTypes";

interface IListProps {}

export const FallbackList: React.FC = () => (
  <ErrorFallback message="La liste n'a pas pu être récupérée." />
);

const List: React.FC<IListProps> = () => {
  const { data, error, loading } = useQuery<{ todoList: ITodo[] }>(TODO_LIST);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    <FallbackList />;
  }

  return (
    <MUIList>
      {data.todoList.map((todo) => (
        <Link key={todo.id} to={`/details/${todo.id}`} className="pet">
          <ListItem>
            <ListItemIcon>
              {todo.isDone ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </ListItemIcon>
            <ListItemText
              primary={todo.title}
              secondary={`Type: ${todo.type} Crée le: ${new Date(todo.createdAt).toDateString()}`}
            />
          </ListItem>
        </Link>
      ))}
    </MUIList>
  );
};

export default List;
