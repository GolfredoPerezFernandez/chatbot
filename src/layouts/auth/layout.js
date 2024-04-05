import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Box, Typography,CardMedia, Unstable_Grid2 as Grid } from '@mui/material';
// TODO: Change subtitle text
import logo from './logo.png';

import { useMediaQuery } from 'react-responsive'
export const Layout = (props) => {
  const { children } = props;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1200px)' })

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flex: '1 1 auto'
      }}
    >
      <Grid
        container
        sx={{ flex: '1 1 auto' }}
      >
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          <Box
            component="header"
            sx={{
              left: 0,
              p: 3,
              position: 'fixed',
              top: 0,
              width: '100%'
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 320
              }}
            >
               <img
              alt=""
              
              src={"https://res.cloudinary.com/dug5cohaj/image/upload/v1712292239/mew2whjo7m3oemqpd7za.png"}
            />
            </Box>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #C11616 0%, #7A0C0C 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%'
            }
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1
              }}
              variant="h1"
            >
              Welcome to{' '}
              <Box
                component="a"
                sx={{ color: '#15B79E' }}
                target="_blank"
              >
                DAIOFF
              </Box>
            </Typography>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="subtitle1"
            >
              “Making the world more accessible”
            </Typography>
         {/*    <img
              alt=""
              src="/assets/auth-illustration.svg"
            /> */}
          </Box>
        </Grid>
        </Grid>
    </Box>
  );
};

Layout.prototypes = {
  children: PropTypes.node
};