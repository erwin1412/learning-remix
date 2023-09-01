import { type ActionArgs, redirect } from "@remix-run/node";
import { createPost } from "~/modules/posts/posts.service";
import { PostForm } from "./posts/PostForm";
import { getUserId } from "~/utils/session.server";

export async function action({ request }: ActionArgs) {


  const formData = await request.formData();
  const action = formData.get("action");
  const userId = await getUserId(request);
  console.log("user id : " , userId);
  if (!userId) {
    // Handle the case where the user ID is not available
    return new Response("User ID not available", { status: 401 });
  }

  if (action === "create") {
    console.log("masuk sini gak3");

    const title = formData.get("title");
    const isDone = false;

    console.log("masuk sini gak 4 :", userId);


    console.log("masuk sini gak 5");

    await createPost({
      title: title as string,
      isDone,
      userId: parseInt(userId),
    });
    console.log("masuk sini gak 6");

    return redirect(`/post`);
  }
}

export default function Create() {
  return (
    <>
      <PostForm />
    </>
  );
}
