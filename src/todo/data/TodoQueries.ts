import gql from "graphql-tag";

const TODO_FRAGMENT = gql`
  fragment TodoFragment on Todo {
    id
    createdAt
    isDone
    type
    text
    title
  }
`;

export const ALL_TODOS = gql`
  query AllTodos($filters: TodoFiltersInput, $orderBy: Ordering) {
    todoList: getTodoList(filters: $filters, orderBy: $orderBy) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`;

export const ONE_TODO = gql`
  query OneTodo($id: ID!) {
    todo: getTodoById(id: $id) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`;

export const UPDATE_TODO_STATUS = gql`
  mutation updateTodoStatusById($id: ID!, $isDone: Boolean!) {
    updatedTodo: updateTodoStatusById(id: $id, isDone: $isDone) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`;
