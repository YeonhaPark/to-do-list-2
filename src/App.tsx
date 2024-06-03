import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(todosFromStorage);
  }, []);
  return (
    <Flex maxW="560px" marginX={"auto"} flexDir={"column"} minH={"100vh"}>
      <CreateTodo setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </Flex>
  );
};

export default App;
