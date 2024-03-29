import React, { useState } from "react";
import { UseTodo } from "../context";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, toggleComplete, deleteTodo } = UseTodo();

  const editTodo = () => {
    if (todoMsg.trim() !== "") {
      updateTodo(todo.id, { ...todo, todo: todoMsg });
      setIsTodoEditable(false);
    } else {
      setTodoMsg(todo.todo);
      setIsTodoEditable(false);
    }
  };

  const toggleCompleted = () => {
    if (todoMsg.trim() == "") {
      setTodoMsg(todo.todo);
      toggleComplete(todo.id, todo.todo);
    } else {
      toggleComplete(todo.id, todoMsg);
    }
  };

  window.addEventListener("keydown", (e) => {
    let todoInput = document.querySelector("#todo_msg_input");
    if (
      e.key == "Enter" &&
      document.activeElement == todoInput &&
      todoInput.readOnly == false
    ) {
      document.querySelector("#save_todo_msg_btn").click();
    }
  });

  return (
    <div
      className={`flex align-middle justify-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer todo_msg_checkbox self-center"
        checked={todo.completed}
        onChange={() => {
          if (isTodoEditable) {
            setIsTodoEditable(false);
          }
          toggleCompleted();
        }}
      />
      <input
        type="text"
        id="todo_msg_input"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        id="save_todo_msg_btn"
        className=" h-10 w-10 lg:h-8 lg:w-8 md:h-8 md:w-8 aspect-square inline-flex  rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex h-10 w-10 lg:h-8 lg:w-8 md:h-8 md:w-8 aspect-square rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
