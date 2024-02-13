export enum TodoType {
  RH = "RH",
  Tech = "Tech",
  Marketing = "Marketing",
  Communication = "Communication",
}

export interface ITodo {
  id: string;
  createdAt: string;
  title: string;
  text: string;
  isDone: boolean;
  type: TodoType;
}

export interface IUpdateTodoVariables {
  id: string;
  isDone: boolean;
}

export interface ITodoFilters {
  filters?: { types?: TodoType[]; isDone?: boolean };
  orderBy?: OrderingDate;
}

export enum OrderingDate {
  DATE_DESC = "DATE_DESC",
  DATE_ASC = "DATE_ASC",
}
