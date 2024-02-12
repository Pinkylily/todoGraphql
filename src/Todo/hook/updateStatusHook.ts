import { MutationResult, useMutation } from "@apollo/client";
import { ALL_TODOS, UPDATE_TODO_STATUS } from "../data/TodoQueries";
import { ITodo, IUpdateTodoVariables } from "../data/TodoTypes";

type IOnChange = (todo: ITodo, checked: boolean) => void;
type IUpdateResult = { updatedTodo: ITodo };

export const useUpdateOneTodoStatus = (): [
  IOnChange,
  MutationResult<IUpdateResult>,
] => {
  const [updateTodoStatus, result] = useMutation<
    IUpdateResult,
    IUpdateTodoVariables
  >(UPDATE_TODO_STATUS);

  const onChange: IOnChange = (todo, checked) => {
    void updateTodoStatus({
      variables: { id: todo.id, isDone: checked },
      optimisticResponse: {
        updatedTodo: {
          ...todo,
          isDone: checked,
        },
      },
    });
  };

  return [onChange, result];
};

export const useUpdateAllTodoStatus = (): [
  IOnChange,
  MutationResult<IUpdateResult>,
] => {
  const [updateTodoStatus, result] = useMutation<
    IUpdateResult,
    IUpdateTodoVariables
  >(UPDATE_TODO_STATUS, {
    update(cache, { data: { updatedTodo } }) {
      const { todoList } = cache.readQuery<{ todoList: ITodo[] }>({
        query: ALL_TODOS,
      });
      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todoList: todoList.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        },
      });
    },
  });

  const onChange: IOnChange = (todo, checked) => {
    void updateTodoStatus({
      variables: { id: todo.id, isDone: checked },
      optimisticResponse: {
        updatedTodo: {
          ...todo,
          isDone: checked,
        },
      },
    });
  };

  return [onChange, result];
};
