import TodoContext from "@/todo/data/TodoContext";
import { ALL_TODOS } from "@/todo/data/TodoQueries";
import { ITodo, ITodoFilters } from "@/todo/data/TodoTypes";
import { useUpdateAllTodoStatus } from "@/todo/hook/updateStatusHooks";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { FallbackList } from "@todo/pages/list/components/fallback/FallbackList";
import ListPresenter from "@todo/pages/list/components/listPresenter/ListPresenter";
import React, { useContext } from "react";

interface IListContainerProps {}

const ListContainer: React.FC<IListContainerProps> = () => {
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

  console.log("ListContainer");

  return <ListPresenter todoList={data.todoList} onChange={onChange} />;
};

export default ListContainer;
