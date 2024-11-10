import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../store/modules/todoSlice";
import dayjs from "dayjs";
import StarRating from "../Form/StarRating";
const Form = () => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const [priority, setPriority] = useState(1);
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Math.floor(Math.random() * 1e5),
      content: enteredTodo,
      isEditing: false,
      priority: priority,
      timestamp: dayjs().valueOf(),
    };
    dispatch(addTodo({ todo: newTodo }));
    setEnteredTodo("");
    setPriority(1);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md">
      <form onSubmit={add} className="flex flex-col">
        <input
          type="text"
          value={enteredTodo}
          onChange={(e) => setEnteredTodo(e.target.value)}
          placeholder="TODOを入力"
          className="p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <StarRating onRatingChange={(value) => setPriority(value)} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          送信
        </button>
      </form>
    </div>
  );
};

export default Form;
