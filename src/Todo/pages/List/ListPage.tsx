import ErrorBoundary from "@/common/components/errorBoundary/ErrorBoundary";
import ErrorFallback from "@/common/components/errorFallback/ErrorFallback";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import TodoContext from "@todo/data/TodoContext";
import { ALL_TODOS } from "@todo/data/TodoQueries";
import { ITodo, ITodoFilters } from "@todo/data/TodoTypes";
import { useUpdateAllTodoStatus } from "@todo/hook/updateStatusHooks";
import ListPresenter from "@todo/pages/list/components/listPresenter/ListPresenter";
import React, { useContext } from "react";

interface IListPageProps {}

export const FallbackList: React.FC = () => (
  <ErrorFallback message="La liste n'a pas pu être récupérée." />
);

const ListPage: React.FC<IListPageProps> = () => {
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

  return <ListPresenter todoList={data.todoList} onChange={onChange} />;
};

export default function ListPageErrorBoundary(props: IListPageProps) {
  return (
    <ErrorBoundary fallback={<FallbackList />}>
      <ListPage {...props} />
    </ErrorBoundary>
  );
}
