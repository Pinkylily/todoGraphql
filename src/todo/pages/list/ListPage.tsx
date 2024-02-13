import ErrorBoundary from "@/common/components/errorBoundary/ErrorBoundary";
import Filters from "@todo/pages/list/components/filters/Filters";
import ListContainer from "@todo/pages/list/components/listContainer/ListContainer";
import React from "react";
import { FallbackList } from "./components/fallback/FallbackList";

interface IListPageProps {}

const ListPage: React.FC<IListPageProps> = () => {
  return (
    <ErrorBoundary fallback={<FallbackList />}>
      <Filters />
      <ListContainer />
    </ErrorBoundary>
  );
};

export default ListPage;
