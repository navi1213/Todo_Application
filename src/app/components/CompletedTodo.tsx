import { useSelector } from "react-redux";
import dayjs from 'dayjs'
import { RootState } from "../../store/index"
const CompletedTodo = () => {

  const endedTodos = useSelector((state:RootState) => state.todos.endedTodos);
  interface Todo {
    id:number;
    content: string;
    timestamp: number;
    isEditing:boolean;
    priority:number;
  }
  return (
    <>
      <h2>完了したTodo</h2>
      {endedTodos.length
        ? endedTodos.map((todo:Todo, index:number) => (
            <div key={index}>
              <span>{todo.content}---完了した時間:{dayjs(todo.timestamp).format("YYYY-MM-DD HH:mm dd")}</span>
            </div>
          ))
        : "完了したTodoはありません"}
    </>
  );
};

export default CompletedTodo;