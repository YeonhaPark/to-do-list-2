import { Button, Box, Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";

interface CreateTodo {
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const CreateTodo: FC<CreateTodo> = ({ setTodos }) => {
  const [content, setContent] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const handleClick = () => {
    if (!content) return;
    const now = Date.now();
    setTodos((todos) => {
      const arr = [...todos, { id: now, content, isDone: false }];
      localStorage.setItem("todos", JSON.stringify(arr));
      return arr;
    });
    setContent("");
  };
  return (
    <Box bgColor="gray.300" pt={4} paddingX={4} textAlign={"center"}>
      <Text fontSize="28" color="gray.800">
        <strong>To Do List</strong>
      </Text>

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        padding={4}
        gap={2}
        h={32}
      >
        <Input bgColor={"white"} value={content} onChange={handleChange} />
        <Button bgColor={"gray.400"} onClick={handleClick}>
          &#43;
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateTodo;
