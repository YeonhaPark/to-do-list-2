import {
  Button,
  Checkbox,
  Flex,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { FiEdit3, FiTrash, FiCheck } from "react-icons/fi";
import DeleteModal from "./DeleteModal";

interface TodoProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoCard: FC<TodoProps> = ({ todo, setTodos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(todo.content);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setTodos((todos) => {
      const arr: ITodo[] = [];
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todo.id) {
          const obj = { ...todo, isDone: e.target.checked };
          arr.push(obj);
        } else {
          arr.push(todos[i]);
        }
      }
      localStorage.setItem("todos", JSON.stringify(arr));
      return arr;
    });
  };

  const handleDelete = () => {
    setTodos((todos) => {
      const filtered = todos.filter((el) => el.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(filtered));
      return filtered;
    });
    onClose();
  };

  const handleUpdate = () => {
    setIsUpdating((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleUpdateConfirm = () => {
    setIsUpdating((prev) => !prev);
    setTodos((todos) => {
      const arr = [];
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === todo.id) {
          const obj = { ...todo, content: inputValue };
          arr.push(obj);
        } else {
          arr.push(todos[i]);
        }
      }
      localStorage.setItem("todos", JSON.stringify(arr));

      return arr;
    });
  };
  return (
    <Flex gap={2} px={3} py={2} rounded="lg" alignItems={"center"}>
      <Checkbox
        size="lg"
        onChange={handleCheck}
        checked={todo.isDone}
      ></Checkbox>

      {isUpdating ? (
        <Input
          rounded={"lg"}
          p={2}
          border="solid"
          borderWidth={3}
          borderColor={"gray.100"}
          w={48}
          h={46}
          fontSize={16}
          value={inputValue}
          onChange={handleInputChange}
        />
      ) : (
        <Text
          rounded={"lg"}
          p={2}
          border="solid"
          borderWidth={3}
          borderColor={"gray.100"}
          w={48}
          isTruncated={true}
          textDecorationLine={todo.isDone ? "line-through" : "none"}
          fontSize={16}
        >
          {todo.content}
        </Text>
      )}

      {isUpdating ? (
        <Button colorScheme="green" onClick={handleUpdateConfirm}>
          <FiCheck />
        </Button>
      ) : (
        <Button colorScheme="blue" onClick={handleUpdate}>
          <FiEdit3 />
        </Button>
      )}
      <Button colorScheme="red" onClick={onOpen}>
        <FiTrash />
      </Button>
      <DeleteModal isOpen={isOpen} onClose={onClose} onDelete={handleDelete} />
    </Flex>
  );
};

export default TodoCard;
