import { ITodoFilters } from "@todo/data/TodoTypes";
import { createContext } from "react";

const TodoContext = createContext<
  [ITodoFilters, (todoFilters: ITodoFilters) => void]
>([{}, () => {}]);

export default TodoContext;
