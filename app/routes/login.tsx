import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { login } from "~/modules/auth/login";
import { createUserSession } from "~/utils/session.server";
import {  type ActionArgs } from "@remix-run/node";
import { loginUserSchema } from "~/modules/auth/auth.schema";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const authLogin = loginUserSchema.parse({
      email,
      password,
    });

    const user = await login(authLogin);

    if (user) {
      await createUserSession(user.id, "/post");
    } else {
      throw new Error("Invalid email or password");
    }

    return await createUserSession(user.id, "/post");
  } catch (error) {
    console.error("Login error:", error);
    return new Response("Login failed", { status: 401 });
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Text textAlign={"center"}>Login</Text>
      <Form method="post" style={{ width: "100%" }}>
        <Box width={"100%"}>
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
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            border={"black 2px solid"}
          />
          <Button type="submit">Login</Button>
        </Box>
      </Form>
    </>
  );
}
