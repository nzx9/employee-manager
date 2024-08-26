import { Box, CircularProgress } from "@mui/material";

const Progress = () => {
    return (  <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <CircularProgress />
      </Box>)
}

export default Progress;