import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DraggableResizableWrapper from "../components/Wrapper/DraggableItem";
import { deleteTodo, updateTodo } from "../../store/modules/todoSlice";
import { RootState } from "../../store/index";
import dayjs from "dayjs";
import "dayjs/locale/ja";

interface Todo {
  id: number;
  content: string;
  timestamp: number;
  isEditing: boolean;
  priority: number;
}

dayjs.locale("ja");

const TodoItem = () => {
  const todos = useSelector((state: RootState) => state.todos.todos as Todo[]);
  const [editingContentMap, setEditingContentMap] = useState<Record<number, string>>({});
  const dispatch = useDispatch();

  const complete = (todo: Todo) => {
    dispatch(deleteTodo({ todo }));
  };

  const toggleEditMode = (todo: Todo) => {
    const newTodo = { ...todo, isEditing: !todo.isEditing };
    dispatch(updateTodo({ todo: newTodo }));
    if (!todo.isEditing) {
      setEditingContentMap((prev) => ({
        ...prev,
        [todo.id]: todo.content,
      }));
    }
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>, todo: Todo) => {
    setEditingContentMap((prev) => ({
      ...prev,
      [todo.id]: e.target.value,
    }));
  };

  const confirmContent = (todo: Todo) => {
    const newTodo = {
      ...todo,
      content: editingContentMap[todo.id] || todo.content,
      isEditing: false,
    };
    dispatch(updateTodo({ todo: newTodo }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, todo: Todo) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Shift + Enter の場合は無視して改行を許可
      confirmContent(todo); // Enterが押されたときにconfirmContentを呼び出す
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <DraggableResizableWrapper key={todo.id}>
          <div>
            <button
              onClick={() => complete(todo)}
              className="absolute top-2 right-2 bg-red-500 text-white font-bold rounded-full p-1"
            >
              ×
            </button>
            <form onSubmit={(e) => confirmContent(todo)} className="h-full">
              {todo.isEditing ? (
                <textarea
                  value={editingContentMap[todo.id] || ""}
                  onChange={(e) => changeContent(e, todo)}
                  onKeyDown={(e) => handleKeyDown(e, todo)}
                  className="w-full h-full p-2 border rounded resize-none overflow-auto"
                  style={{ minHeight: "100px", maxHeight: "300px" }}
                />
              ) : (
                <div
                  className="h-full w-full p-2"
                  onDoubleClick={() => toggleEditMode(todo)}
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "Zen Kurenaido, sans-serif",
                  }}
                >
                  {todo.content}
                  <div>{dayjs(todo.timestamp).format("YYYY-MM-DD HH:mm")}</div>
                  <div>優先度: {todo.priority}</div>
                </div>
              )}
            </form>
          </div>
        </DraggableResizableWrapper>
      ))}
    </div>
  );
};

export default TodoItem;

