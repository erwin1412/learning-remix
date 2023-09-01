import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useState } from "react";

export function PostForm() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };
  const handleFormSubmit = () => {
    setInputValue("");
  };

  return (
    <>
      <Text textAlign={"center"}>Create Post</Text>

      <Form method="post" onSubmit={handleFormSubmit} style={{ width: "100%" }}>
        <Box display={"flex"} width={"100%"}>
          <Input
            type="text"
            name="title"
            value={inputValue}
            onChange={handleInputChange}
            border={"black 2px solid"}
          />
          <Button type="submit" name="action" value="create">
            Add 😊:3
          </Button>
        </Box>
      </Form>
    </>
  );
}
