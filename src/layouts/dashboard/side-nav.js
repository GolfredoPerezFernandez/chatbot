/* eslint-disable complexity */
/* eslint-disable arrow-spacing */
/* eslint-disable no-await-in-loop */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-spacing */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-console */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-template */
/* eslint-disable arrow-spacing */
/* eslint-disable prefer-template */
/* eslint-disable no-dupe-keys */
/* eslint-disable prefer-template */

/* eslint-disable eqeqeq */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable array-callback-return */


/* eslint-disable no-loop-func */
/* eslint-disable no-inline-comments */
/* eslint-disable no-inline-comments */

import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from '../../components/logo';
import { Scrollbar } from '../../components/scrollbar';
import { itemsTeacher,itemsRegular,itemsStudent,itemsManagerMoveOn, itemsAfterSchool, itemsMoveOnSchool, itemsTeacherMoveOn, itemsChatbot, itemsCoordinator, itemsAdministration } from './config';
import { itemsAdmin } from './config';
import { itemsManagers } from './config';
import { itemsAdminPro } from './config';
import { itemsSupport } from './config';
import {  useEffect, useState } from 'react';

import { SideNavItem } from './side-nav-item';
import {useMoralis} from "react-moralis"

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
 
 const {Moralis,isAuthenticated,user}=useMoralis()
 const [isManager,setIsManager]=useState(false)
 const [isAdmin,setIsAdmin]=useState(false)
 const [isAdministrator,setIsAdministrator]=useState(false)

 const [isTeacher,setIsTeacher]=useState(false)
 const [isTeacherMoveOn,setIsTeacherMoveOn]=useState(false)
 const [isSupport,setIsSupport]=useState(false)
 const [isChatbot,isSetChatbot]=useState(false)

 const [isStudent,setIsStudent]=useState(false)
 const [isAfterSchool,setIsAfterSchool]=useState(false)
 const [isMoveOnSchool,setIsMoveOnSchool]=useState(false)
 const [isRegular,setIsRegular]=useState(false)
 const [isCoordinator,setIsCoordinator]=useState(false)

const [,setEmail]=useState("")
  useEffect(
    () => {
async function init(){
  let user=await Moralis.User.current()

 }


      init()
      },
    []
  );

  const content = (
    <Scrollbar
      sx={{
        
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            href="/"
            sx={{
              display: 'inline-flex',
              height: 60,
              width: 300
            }}
          >
        <Box
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
            </Box>          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: '#F45252',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                DAIOFF
              </Typography>
              <Typography
                color="neutral.400"
                variant="body2"
              >
                CHATBOT IA
              </Typography>
            </div>
          
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {itemsAdminPro.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
      
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};