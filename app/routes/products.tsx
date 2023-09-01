import {  Outlet,  useNavigation } from "@remix-run/react";
import { Layout } from "./layouts";
import { Box,Spinner } from "@chakra-ui/react";


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
