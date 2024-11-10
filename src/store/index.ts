import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./modules/todoSlice"
export default configureStore({
  reducer: {
    todos: todoReducer
  },
})