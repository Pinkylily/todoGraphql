import gql from "graphql-tag";

export const TODO_LIST = gql`
  query AllTodos($filters: TodoFiltersInput, $orderBy: Ordering) {
    todoList: getTodoList(filters: $filters, orderBy: $orderBy) {
      id
      createdAt
      isDone
      type
      text
      title
    }
  }
`;
