import ErrorBoundary from "@/common/components/errorBoundary/ErrorBoundary";
import ErrorFallback from "@/common/components/errorFallback/ErrorFallback";
import { useQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { ONE_TODO } from "@todo/data/TodoQueries";
import { ITodo } from "@todo/data/TodoTypes";
import { useUpdateOneTodoStatus } from "@todo/hook/updateStatusHooks";
import DetailsPresenter from "@todo/pages/details/components/detailsPresenter/DetailsPresenter";
import React from "react";
import { useParams } from "react-router-dom";

interface IDetailsPageProps {}

const FallbackDetails: React.FC = () => (
  <ErrorFallback message="La todo n'a pas pu être récupérée." />
);

const DetailsPage: React.FC<IDetailsPageProps> = () => {
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

  return <DetailsPresenter todo={todoResult.data.todo} onChange={onChange} />;
};

export default function DetailsPageErrorBoundary(props: IDetailsPageProps) {
  return (
    <ErrorBoundary fallback={<FallbackDetails />}>
      <DetailsPage {...props} />
    </ErrorBoundary>
  );
}
