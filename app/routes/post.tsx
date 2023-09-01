import { type ActionArgs, redirect } from "@remix-run/node";
import {  Outlet,  useNavigation } from "@remix-run/react";
import {
  deletePost,
  
  getPosts,
} from "~/modules/posts/posts.service";
import { Layout } from "./layouts";
import { Box,Spinner } from "@chakra-ui/react";


export async function loader() {
  const posts = await getPosts();
  return posts;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "create") {
    // const title = formData.get("title");

    // // await createPost({
    // //   title: title as string,
    // // });
    redirect("/post/create")
  } else if (action === "delete") {
    const id = formData.get("id");
    await deletePost(id);
  } else if (action === "update") {
    const id = formData.get("id");
    redirect(`/post/update/${id}`);
  }
  return redirect("/posts");
}

export default function PostsIndex() {
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
        <Layout>
  <Box marginLeft={5} marginTop={50} width={"95%"}>
            <Outlet/>
          </Box>
        </Layout>
      )}
    </>
  );
}
