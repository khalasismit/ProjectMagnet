import { Box, Typography } from "@mui/material";
import Form from "./Form.jsx";

const LoginPage = () => {
  const plateformName = "TweetVerse"
  return <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Box
      width="100%" bgcolor="white" boxShadow="0px 0px 10px 0px black"
      borderRadius="0.5rem"
      textAlign="center"
    >
      <Typography fontWeight="bold" fontFamily="monospace" fontSize="2rem" color="Black">
        {plateformName}
      </Typography>
    </Box>

    <Box display="flex" justifyContent="center" flexDirection="column">
      <Typography width="auto" p="1rem" textAlign="center" fontWeight="500" fontFamily="monospace" fontSize="1.2rem" marginBottom="1.2rem">
        Welcome to {plateformName}, the Social Media Application!
      </Typography>
      <Form />
    </Box>
  </Box>
};

export default LoginPage;