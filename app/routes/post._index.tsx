import { type ActionArgs, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import {
  deletePost,
  getPostById,
  getPosts,
  isDone,
} from "~/modules/posts/posts.service";
import { Box, Button, Input, Spinner, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { AiFillCheckSquare } from "react-icons/ai";
export async function loader() {
  const posts = await getPosts();
  return posts;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  console.log(action);

  if (action === "create") {
    return redirect("/post/create");
  } else if (action === "delete") {
    const id = formData.get("id");
    await deletePost(id);
    return redirect("/post/create");
  } else if (action === "patch") {
    const id = formData.get("id");
    return redirect(`/post/update/${id}`);
  } else if (action === "toggleCheck") {
    const id = formData.get("id");
    const post = await getPostById(id); // Fetch the current post

    if (post) {
      const updatedIsDone = !post.isDone; // Toggle the isDone value

      await isDone(id, { isDone: updatedIsDone });
    }

    return redirect("/post");
  }
}

export default function PostsIndex() {
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
                  <th style={{ border: "2px solid black" }}>check</th>
                  <th style={{ border: "2px solid black" }}>Title</th>
                  <th style={{ border: "2px solid black" }}>created_at</th>
                  <th style={{ border: "2px solid black" }}>updated_at</th>
                  <th style={{ border: "2px solid black" }}>isDone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr
                    key={d.id}
                    style={{ width: "100%", border: "2px solid black" }}
                  >
                    <td>
                      {/* Inside the map function */}
                      <Form method="patch" style={{ marginRight: "1rem" }}>
                        <Input type="hidden" name="id" value={d.id} />
                        <Button type="submit" value="toggleCheck" name="action">
                          {d.isDone ? (
                            <>
                              <AiFillCheckSquare style={{ color: "green" }} />
                              <Text>{d.isDone ? "Uncheck" : "Check"}</Text>
                            </>
                          ) : (
                            <>
                              <AiFillCheckSquare style={{ color: "check" }} />
                              <Text>{d.isDone ? "Uncheck" : "Check"}</Text>
                            </>
                          )}
                        </Button>
                      </Form>
                    </td>
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {d.title}
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
                    <td style={{ width: "100%", border: "2px solid black" }}>
                      {d.isDone === false ? "False" : "True"}
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
