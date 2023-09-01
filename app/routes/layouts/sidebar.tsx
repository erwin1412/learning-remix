import React from 'react';
import { Box } from '@chakra-ui/react';
import { AiOutlineDropbox, AiOutlineLogout, AiOutlinePaperClip, AiOutlineTransaction, AiOutlineUser } from 'react-icons/ai';
import SidebarItem from './sidebaritem';


export function SideBar() {
  return (
    <Box as="nav" h="100vh" w="250px" bg="gray.800" color="white" boxShadow="md">
      <SidebarItem to="/post" label="Posts" icon={AiOutlinePaperClip} />
      <SidebarItem to="/products" label="Products" icon={AiOutlineDropbox} />
      <SidebarItem to="/transactions" label="Transactions" icon={AiOutlineTransaction} />
      <SidebarItem to="/user" label="Users" icon={AiOutlineUser} />
      <SidebarItem to="/logout" label="Logout" icon={AiOutlineLogout} />
    </Box>
  );
}
