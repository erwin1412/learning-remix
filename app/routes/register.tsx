import { type ActionArgs, redirect } from "@remix-run/node";
import { register } from "~/modules/auth/register";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useState } from "react";
import * as bcrypt from "bcryptjs"

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "create") {
    const fullname = formData.get("fullname");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const roles = "user";
    const profile = "testing.png";

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password as string, saltRounds);

    await register({
      fullname: fullname as string,
      username: username as string,
      email: email as string,
      password: hashedPassword,
      roles,
      profile,
    });

    return redirect(`/post`);
  }
}

export default function Create() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFullnameChange = (event : any) => {
    setFullname(event.target.value);
  };
  
  const handleUsernameChange = (event : any) => {
    setUsername(event.target.value);
  };
  
  const handleEmailChange = (event : any) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event : any) => {
    setPassword(event.target.value);
  };



  return (
    <>
      <Text textAlign={"center"}>Create Post</Text>

      <Form method="post" style={{ width: "100%" }}>
        <Box width={"100%"}>
            <label>Fullname</label>
            <Input
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleFullnameChange}
              border={"black 2px solid"}
            />
            <label>Username</label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              border={"black 2px solid"}
            />
            <label>Email</label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
              border={"black 2px solid"}
            />
            <label>Password</label>
            <Input
              type="text"
              name="password"
              value={password}
              onChange={handlePasswordChange}
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
