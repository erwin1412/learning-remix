import React from 'react';
import { Link } from '@remix-run/react';
import {  Text, Flex } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
// import { AiOutlineHome, AiOutlineTransaction, AiOutlineUser } from 'react-icons/ai';

interface SidebarItemProps {
  to: string;
  label: string;
  icon: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, label, icon: Icon }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        cursor="pointer"
        _hover={{ background: 'gray.700' }}
        p={2}
        borderRadius="md"
        marginBottom={2}
      >
        <Icon size={20} />
        <Text fontSize={25} ml={2}>{label}</Text>
      </Flex>
    </Link>
  );
};

export default SidebarItem;
