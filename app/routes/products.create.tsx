import { type ActionArgs, redirect } from "@remix-run/node";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { createProduct } from "~/modules/products/products";
// import bcrypt from 'bcrypt';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "create") {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");

    await createProduct({
      name: name as string,
      description: description as string,
      price: parseInt(price as string),
    });

    return redirect(`/post`);
  }
}

export default function Create() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");

  const handlenameChange = (event : any) => {
    setname(event.target.value);
  };
  
  const handledescriptionChange = (event : any) => {
    setdescription(event.target.value);
  };
  
  const handlepriceChange = (event : any) => {
    setprice(event.target.value);
  };
  


  return (
    <>
      <Text textAlign={"center"}>Create Product</Text>

      <Form method="post" style={{ width: "100%" }}>
        <Box width={"100%"}>
            <label>name</label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handlenameChange}
              border={"black 2px solid"}
            />
            <label>description</label>
            <Input
              type="text"
              name="description"
              value={description}
              onChange={handledescriptionChange}
              border={"black 2px solid"}
            />
            <label>price</label>
            <Input
              type="text"
              name="price"
              value={price}
              onChange={handlepriceChange}
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
