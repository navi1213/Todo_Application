import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import DraggableResizableWrapper from "../components/Wrapper/DraggableItem";
import { deleteTodo, updateTodo } from "../../store/modules/todoSlice";
import dayjs from "dayjs";
import "dayjs/locale/ja";
const TodoItem = () => {
  dayjs.locale("ja");
  const todos = useSelector((state) => state.todos.todos);
  const [editingContentMap, setEditingContentMap] = useState({});
  const dispatch = useDispatch();

  const complete = (todo) => {
    dispatch(deleteTodo({ todo }));
  };

  const toggleEditMode = (todo) => {
    const newTodo = { ...todo, isEditing: !todo.isEditing };
    dispatch(updateTodo({ todo: newTodo }));
    if (!todo.isEditing) {
      setEditingContentMap((prev) => ({
        ...prev,
        [todo.id]: todo.content,
      }));
    }
  };

  const changeContent = (e, todo) => {
    setEditingContentMap((prev) => ({
      ...prev,
      [todo.id]: e.target.value,
    }));
  };

  const confirmContent = (e, todo) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      content: editingContentMap[todo.id] || todo.content,
      isEditing: false,
    };
    dispatch(updateTodo({ todo: newTodo }));
  };

  const handleKeyDown = (e, todo) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Shift + Enter の場合は無視して改行を許可
      confirmContent(e, todo); // Enterが押されたときにconfirmContentを呼び出す
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
            <form onSubmit={(e) => confirmContent(e, todo)} className="h-full">
              {todo.isEditing ? (
                <textarea
                  value={editingContentMap[todo.id] || ""}
                  onChange={(e) => changeContent(e, todo)}
                  onKeyDown={(e) => handleKeyDown(e, todo)}
                  className="w-full h-full p-2 border rounded resize-none overflow-auto"
                  style={{ minHeight: "100px", maxHeight: "300px" }} // 最小・最大の高さを設定
                />
              ) : (
                <div
                  className="h-full w-full p-2"
                  onDoubleClick={() => toggleEditMode(todo)}
                  style={{
                    whiteSpace: "pre-wrap",
                    fontFamily: " Zen Kurenaido, sans-serif",
                  }}
                >
                  {todo.content}
                  <div>{dayjs(todo.timestamp).format("YYYY-MM-DD HH:mm dd")}</div>
                  <div>優先度:{todo.priority}</div>
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
