import { IOnChangeStatus, ITodo } from "@/todo/data/TodoTypes";
import { Box, Checkbox, Stack, Typography } from "@mui/material";

interface IDetailsPresenterProps {
  todo: ITodo;
  onChange: IOnChangeStatus;
}

export const DetailsPresenter: React.FC<IDetailsPresenterProps> = ({
  todo,
  onChange,
}) => {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
      <Stack spacing={3} justifyContent={"center"}>
        <Stack direction="row" spacing={2}>
          <Typography typography="h4">{todo.title}</Typography>
          <Checkbox
            checked={todo.isDone}
            onChange={(e, checked) => onChange(todo, checked)}
          />
        </Stack>
        <Typography typography="body1">{todo.text}</Typography>
        <Stack direction="row" spacing={2}>
          <Typography typography="body2">{`Type: ${todo.type}`}</Typography>
          <Typography typography="body2">{`Crée le: ${new Date(todo.createdAt).toDateString()}`}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DetailsPresenter;
