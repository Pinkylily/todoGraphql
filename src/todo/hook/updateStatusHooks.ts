import { MutationResult, useMutation } from "@apollo/client";
import { UPDATE_TODO_STATUS } from "@todo/data/TodoQueries";
import {
  IOnChangeStatus,
  IUpdateResult,
  IUpdateTodoVariables,
} from "@todo/data/TodoTypes";

export const useUpdateOneTodoStatus = (): [
  IOnChangeStatus,
  MutationResult<IUpdateResult>,
] => {
  const [updateTodoStatus, result] = useMutation<
    IUpdateResult,
    IUpdateTodoVariables
  >(UPDATE_TODO_STATUS);

  const onChange: IOnChangeStatus = (todo, checked) => {
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
  IOnChangeStatus,
  MutationResult<IUpdateResult>,
] => {
  const [updateTodoStatus, result] = useMutation<
    IUpdateResult,
    IUpdateTodoVariables
  >(UPDATE_TODO_STATUS);

  const onChange: IOnChangeStatus = (todo, checked) => {
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
