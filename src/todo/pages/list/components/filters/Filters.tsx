import {
  Button,
  Checkbox,
  FormControl,
  FormGroup,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import TodoContext from "@todo/data/TodoContext";
import { ITodoFilters, OrderingDate, TodoType } from "@todo/data/TodoTypes";
import React, { useContext } from "react";

interface IFiltersProps {}

enum StatusTodo {
  ALL = "",
  DONE = "DONE",
  TO_DO = "TO_DO",
}

const getStatusFromFilter = (todoFilters: ITodoFilters) => {
  if (todoFilters.filters?.isDone === undefined) {
    return StatusTodo.ALL;
  }

  if (todoFilters.filters.isDone === false) {
    return StatusTodo.TO_DO;
  }

  return StatusTodo.DONE;
};

const isDoneFromStatus = (status: StatusTodo): boolean | undefined => {
  if (status === StatusTodo.ALL) {
    return undefined;
  }

  return status === StatusTodo.DONE;
};

const Filters: React.FC<IFiltersProps> = () => {
  const [todoFilters, setTodoFilters] = useContext(TodoContext);

  const { filters, orderBy } = todoFilters;
  const typesSelected = filters?.types?.map((type) => type.toString()) ?? [];

  const onChangeOrder = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setTodoFilters({
      ...todoFilters,
      orderBy: value === "" ? undefined : (value as OrderingDate),
    });
  };

  const onChangeStatus = (e: SelectChangeEvent) => {
    setTodoFilters({
      ...todoFilters,
      filters: {
        ...filters,
        isDone: isDoneFromStatus(e.target.value as StatusTodo),
      },
    });
  };

  const onChangeTypes = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target;
    const newTypes = typeof value === "string" ? value.split(",") : value;

    setTodoFilters({
      ...todoFilters,
      filters: {
        ...filters,
        types: newTypes.length === 0 ? undefined : (newTypes as TodoType[]),
      },
    });
  };

  const onBusinessClick = () =>
    setTodoFilters({
      ...todoFilters,
      filters: {
        ...filters,
        types: [TodoType.Marketing, TodoType.Communication],
      },
    });

  const onResetClick = () => setTodoFilters({});

  return (
    <FormGroup row sx={{ alignItems: "center" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="orderByLabel">Trier par</InputLabel>
        <Select
          id="orderByFilter"
          labelId="orderByLabel"
          label="Trier par"
          value={orderBy}
          onChange={onChangeOrder}
        >
          <MenuItem>Tri standard</MenuItem>
          <MenuItem value={OrderingDate.DATE_ASC}>Les plus récents</MenuItem>
          <MenuItem value={OrderingDate.DATE_DESC}>Les plus anciens</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="statusLabel">Status</InputLabel>
        <Select
          id="statusFilter"
          labelId="statusLabel"
          label="Status"
          value={getStatusFromFilter(todoFilters)}
          onChange={onChangeStatus}
        >
          <MenuItem value={StatusTodo.ALL}>Tout</MenuItem>
          <MenuItem value={StatusTodo.DONE}>Fait</MenuItem>
          <MenuItem value={StatusTodo.TO_DO}>À faire</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 260 }} size="small">
        <InputLabel id="typeLabel">Type</InputLabel>
        <Select
          labelId="typeLabel"
          label="Type"
          id="typeFilter"
          multiple
          value={typesSelected}
          onChange={onChangeTypes}
          renderValue={(selected) => selected.join(", ")}
        >
          {Object.values(TodoType).map((type) => (
            <MenuItem key={`filter_${type}`} value={type}>
              <Checkbox
                checked={filters?.types?.includes(type)}
                name={type.toString()}
              />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormGroup sx={{ m: 1 }}>
        <Button variant="outlined" onClick={onBusinessClick}>
          Todos business
        </Button>
      </FormGroup>
      <FormGroup sx={{ m: 1 }}>
        <Button onClick={onResetClick}>Réinitialiser</Button>
      </FormGroup>
    </FormGroup>
  );
};

export default Filters;
