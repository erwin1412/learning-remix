// import { type ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";

import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { getProducts } from "~/modules/products/products";
import {redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
export async function loader() {
  const posts = await getProducts();
  return posts;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  console.log(action);

  if (action === "create") {
    return redirect("/products/create");
  } 
  // else if (action === "delete") {
  //   const id = formData.get("id");
  //   await deletePost(id);
  //   return redirect("/post/create");
  // } else if (action === "patch") {
  //   const id = formData.get("id");
  //   return redirect(`/post/update/${id}`);
  // } else if (action === "toggleCheck") {
  //   const id = formData.get("id");
  //   const post = await getPostById(id); // Fetch the current post

  //   if (post) {
  //     const updatedIsDone = !post.isDone; // Toggle the isDone value

  //     await isDone(id, { isDone: updatedIsDone });
  //   }

  //   return redirect("/post");
  // }
}

export default function ProductsIndex() {
  const data = useLoaderData<typeof loader>();
  const { state } = useNavigation();

  return (
    <>
      {state === "loading" ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box marginLeft={5} marginTop={50} width={"95%"}>
          
          <Form method="post">
            <Button type="submit" value="create" name="action">
              Create
            </Button>
          </Form>

          <Box width={"100%"}>
            <table style={{ width: "100%", border: "2px solid black" }}>
              <thead style={{ width: "100%", border: "2px solid black" }}>
                <tr style={{ border: "2px solid black" }}>
                  <th style={{ border: "2px solid black" }}>Product Name</th>
                  <th style={{ border: "2px solid black" }}>Description</th>
                  <th style={{ border: "2px solid black" }}>Price</th>
                  <th style={{ border: "2px solid black" }}>created_at</th>
                  <th style={{ border: "2px solid black" }}>updated_at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr
                    key={d.id}
                    style={{ width: "100%", border: "2px solid black" }}
                  >
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {d.name}
                    </td>
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {d.description}
                    </td>
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {d.price}
                    </td>
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {formatDistanceToNow(new Date(d.createdAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {formatDistanceToNow(new Date(d.updatedAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td style={{ display: "flex" }}>
                      <Form method="patch" style={{ marginRight: "1rem" }}>
                        <Input type="hidden" name="id" value={d.id} />
                        <Button type="submit" value="patch" name="action">
                          <Text>Update</Text>
                        </Button>
                      </Form>
                      <Form method="post">
                        <input type="hidden" name="id" value={d.id} />
                        <Button type="submit" value="delete" name="action">
                          Delete
                        </Button>
                      </Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </>
  );
}
