import { IOnChangeStatus, ITodo } from "@/todo/data/TodoTypes";
import {
  Checkbox,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List as MUIList,
} from "@mui/material";
import Filters from "@todo/pages/list/components/filters/Filters";
import React from "react";
import { Link } from "react-router-dom";

interface IListPresenterProps {
  todoList: ITodo[];
  onChange: IOnChangeStatus;
}

const ListPresenter: React.FC<IListPresenterProps> = ({
  todoList,
  onChange,
}) => {
  return (
    <>
      <Filters />
      <MUIList>
        {todoList.map((todo, index) => (
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
            {index !== todoList.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </MUIList>
    </>
  );
};

export default ListPresenter;
