import { Typography, Link } from '@material-ui/core';
import Box from '@material-ui/core/Box';

function Copyright() {
    return (
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://www.compnet.co.id/about-us">
            Compnet
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    );
}

export default Copyright;