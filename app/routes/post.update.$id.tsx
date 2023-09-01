import { Button, Input, Text } from "@chakra-ui/react";
import { type ActionArgs, redirect } from "@remix-run/node";
import { Form, useParams } from "@remix-run/react";
import { updatePost } from "~/modules/posts/posts.service";


export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "patch") {
    const id = formData.get("id");
    const updatedTitle = formData.get("updatedTitle");
    await updatePost(id, { title: updatedTitle} );
    return redirect(`/post/`);
  }
}


export default function Update() {
// {id} di dapat dari update.{id} <=
  const {id} = useParams()
// {
//   idname:8
// }

  return (
    <div>
      <Form method="patch">
        <Input type="hidden" name="id" value={id}/>
        <Input type="text" name="updatedTitle" placeholder="Updated Title" />
        <Button type="submit" value="patch" name="action">
          <Text>Update</Text>
        </Button>
      </Form>
    </div>
  );
}
