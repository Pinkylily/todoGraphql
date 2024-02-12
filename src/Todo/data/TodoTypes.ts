export type ITodoType = "RH" | "Tech" | "Marketing" | "Communication";

export interface ITodo {
  id: string;
  createdAt: string;
  title: string;
  text: string;
  isDone: boolean;
  type: ITodoType;
}

export interface IUpdateTodoVariables {
  id: string;
  isDone: boolean;
}
