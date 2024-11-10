import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs'
export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: 1,
        content: "買い物に行く",
        isEditing: false,
        timestamp:1730467545178,
        //3が最も高い数値,1が最も低い数値とする
        priority:1
      },{
        id: 2,
        content: "卵買う",
        isEditing: false,
        timestamp:1730467545178,
        priority:1
      },
      {
        id: 3,
        content: "郵便出す",
        isEditing: false,
        timestamp:1730467545178,
        priority:1
      }
    ],
    endedTodos:[]
  },
  reducers: {
    addTodo: (state, { type, payload }) => {
      state.todos.push(payload.todo);
    },
    deleteTodo: (state, { type, payload }) => {
      state.endedTodos.push({...payload.todo,timestamp:dayjs().valueOf()});
      state.todos = state.todos.filter((_todo) => {
        return _todo.id !== payload.todo.id;
      });
    },
    updateTodo: (state, { type, payload }) => {
      state.todos = state.todos.map((_todo) => {
        return _todo.id === payload.todo.id
          ? { ..._todo, ...payload.todo }
          : { ..._todo };
      });
    },
  },
});


export const { addTodo, deleteTodo, updateTodo,reorderTodos ,addDeletedTodos} = todoSlice.actions;

export default todoSlice.reducer;
