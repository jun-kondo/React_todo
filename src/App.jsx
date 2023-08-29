import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/inputTodo";
import { IncompleteTodos } from "./components/incompleteTodos";
import { CompleteTodos } from "./components/completeTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // フォーム入力値を受け取る
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 入力された値を未完了TODOリストに追加
  const onClickAdd = () => {
    // 未入力の場合は終了
    if (todoText === "") return;
    // スプレッド構文を使って配列の要素を追加
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // フォームの内容を初期化
    setTodoText("");
    // alert(todoText);
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // 配列の要素のindexを第一引数、削除する個数を第二引数
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
    // alert(index);
  };

  const onClickComplete = (index) => {
    // 引数で指定されたTODOを未完了から削除して、完了リストに追加する処理
    const newIncompletTodos = [...incompleteTodos];
    newIncompletTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompletTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompletTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompletTodos);
  };
  // 処理を共通化したかったができなかった
  // const handleMoveTodo = (index, sourceList, targetList) => {
  //   const newSorceList = [...sourceList];
  //   const movedTodo = newSorceList.splice(index, 1);
  //   const newTargetList = [...targetList, movedTodo];

  //   setIncompleteTodos(newSorceList);
  //   setCompleteTodos(newTargetList);
  // };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるtodo5個までだよ。消化はよ!!</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
