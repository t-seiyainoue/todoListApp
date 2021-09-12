import React, { useRef} from "react";

import { Container } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import { useTodo } from "../hooks/useTodo";

import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

function App() {
  const {
    todoList, // TODOの現在の状態
    addTodoListItem, // 新規TODOを追加する関数
    toggleTodoListItemStatus, // doneを反転させて更新する関数
    deleteTodoListItem // TODOを削除する関数
    } = useTodo();

  // useRefでrefオブジェクトを作成
  const inputEl = useRef(null);

  const handleAddTodoListItem = () => {
    if (inputEl.current.value === "") return;
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = "";
  };

  // filter()を利用して「TODOの状態が未完了」の要素を持つ新しい配列を作成
  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  // filter()を利用して「TODOの状態が完了」の要素を持つ新しい配列を作成
  const completedList = todoList.filter((todo) => {
    return todo.done;
  });

  return (
    <Container centerContent p={{base: "4", md: "6"}} maxWidth="3xl">

      <TodoTitle 
        title="TODO進捗管理" 
        as="h1"
        fontSize={{base: "2xl", md: "3xl"}}
      />
      
      <TodoAdd 
        placeholder="ADD TODO"
        leftIcon={<AddIcon />}
        buttonText="+ TODOを追加"
        inputEl={inputEl} 
        handleAddTodoListItem={handleAddTodoListItem} 
      />

      <TodoList 
        todoList={inCompletedList} 
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title="未完了TODOリスト" 
        as="h2"
        fontSize={{base: "xl", md: "2xl"}}
      />

      <TodoList 
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem} 
        title="完了TODOリスト" 
        as="h2"
        fontSize={{base: "xl", md: "2xl"}}
      />

    </Container>
  );
}

export default App;