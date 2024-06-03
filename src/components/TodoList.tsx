import { Flex } from "@chakra-ui/react";
import TodoCard from "./TodoCard";
import { FC } from "react";

interface TodoList {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoList: FC<TodoList> = ({ todos, setTodos }) => {
  return (
    <Flex flexDir={"column"} gap={2} pt={8} alignItems={"center"} flexGrow={1}>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </Flex>
  );
};

export default TodoList;
