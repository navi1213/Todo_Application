import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface Todo {
  id: number;
  content: string;
  isEditing: boolean;
  timestamp: number;
  priority: number;
}

interface TodoState {
  todos: Todo[];
  endedTodos: Todo[];
}

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: 1,
        content: "買い物に行く",
        isEditing: false,
        timestamp: 1730467545178,
        priority: 1,
      },
      {
        id: 2,
        content: "卵買う",
        isEditing: false,
        timestamp: 1730467545178,
        priority: 1,
      },
      {
        id: 3,
        content: "郵便出す",
        isEditing: false,
        timestamp: 1730467545178,
        priority: 1,
      },
    ],
    endedTodos: [],
  } as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.todos.push(action.payload.todo);
    },
    deleteTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.endedTodos.push({ ...action.payload.todo, timestamp: dayjs().valueOf() });
      state.todos = state.todos.filter((_todo) => _todo.id !== action.payload.todo.id);
    },
    updateTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.todos = state.todos.map((_todo) =>
        _todo.id === action.payload.todo.id
          ? { ..._todo, ...action.payload.todo }
          : _todo
      );
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;

