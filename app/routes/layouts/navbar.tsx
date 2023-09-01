import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInUTF7());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentTimeInUTF7());
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);



  return (
    <Flex as="nav" align="center" justify="space-between" p={4} bg="blue.500" color="white">
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          My Remix App
        </Text>
      </Box>
      <Box>
      <Text  color="white">
          {`Jam : ${currentTime}`}
        </Text>
      </Box>
    </Flex>
  );
};


function getCurrentTimeInUTF7() {
  const currentTime = new Date();
  const offset = 7; // UTC +7
  currentTime.setUTCHours(currentTime.getUTCHours() + offset);
  
  const hours = currentTime.getUTCHours().toString().padStart(2, '0');
  const minutes = currentTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getUTCSeconds().toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}`;
}


export default Navbar;
