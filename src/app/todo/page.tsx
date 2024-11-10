"use client";
import { Provider } from "react-redux";
import store from "../../store";
import TodoItem from "../components/TodoItem";
import Form from "../components/Form/Form";
import CompletedTodo from "../components/CompletedTodo";
export default function Todo() {
  return (
    <>
      <Provider store={store}>
        <div className="flex h-screen">
          {/* 左側のTodoエリア */}
          <div className="w-3/4 p-4 bg-gray-100">
            <TodoItem />
          </div>
          {/* 右側の入力パネル */}
          <div className="w-1/4 p-6 bg-white border-l border-gray-300 flex flex-col justify-start relative">
            <Form />
            <div className="mt-6">
              <CompletedTodo />
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}
