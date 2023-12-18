import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useEffect , useState} from 'react';
import axios from 'axios';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import { Link } from '@mui/material';

const pages = [
  { label: 'Dashboard', link: '/dashboard' },
  { label: 'Calculate Fuel', link: `/profile/calculate-fuel` },
  { label: 'Get Fuel', link: '/profile/fuel-details' },
  {label:'Set Goal', link :'/profile/set-goal'},
  {label:'Monthly Fuel Details', link:'/profile/monthly-fuel'},
  {label :'Emission Tips', link :'/admin/emission-tips'},
];
const settings = [
  {label:'Leader Board', link:'/profile/leaderboard'},
  {label :'Goal Details', link:'/profile/goal-details'},
  {label:'Favourite Tips', link:'/profile/favourite-tips'},
  {label:'Profile', link:'/profile'},
  {label:'Edit Profile', link:'/profile/edit-profile'},
  {label: 'Logout',link:'/'} ];


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const [details, setDetails] = useState(null);

const fetchUsername = async () => {
  try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
                   
          return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/user/profiles/detail/", {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
      });

      setDetails(response.data);
      

  } catch (error) {
      console.error('Error occurred while fetching data', error);
     
  }
}

 useEffect(()=>{
fetchUsername();
 }, [])
  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(75 131 75)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EmojiNatureIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Carbon FootPrints
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link href={page.link} color="inherit" underline="none">
                  {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <EmojiNatureIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, fontSize: '50px' }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/dashboard"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Carbon FootPrints
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Link href={page.link} color="inherit" underline="none">

              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ px:2,my: 2, color: 'white', display: 'block',":hover" :{backgroundColor :'white', color:'black',fontWeight:'bold'} }}
              >
                  {page.label}
              </Button>
                </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               {details ?(
                <Avatar src={`http://127.0.0.1:8000/${details.profile_image}`}  />
               ):(
                <p>No Profile Image</p>
               )} 
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  
                   <Link href={setting.link} color="inherit" underline="none" >
                  {setting.label}
                </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import Logout from '@mui/icons-material/Logout';
// import { Link } from 'react-router-dom';
// import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
// import Typography from '@mui/material/Typography';
// import { AppBar, Container } from '@mui/material';


// export default function Navbar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: 'rgb(75 131 75)' }}>
        

//           <Box sx={{
//             display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'center ',
//             height: '60px'
//           }}>
//             <EmojiNatureIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px' }} />
//             <Typography
//               variant="h6"
//               noWrap
//               component="a"
//               href="/home"
//               sx={{
//                 mr: 2,
//                 display: { xs: 'none', md: 'flex' },
//                 fontFamily: 'monospace',
//                 fontWeight: 700,
//                 letterSpacing: '.2rem',
//                 color: 'inherit',
//                 textDecoration: 'none',
//               }}
//             >
//               Carbon FootPrints
//             </Typography>

//             <Link to='/dashboard' style={{ textDecoration: 'none' }}>

//               <h3 style={{ marginLeft: "35px", color: 'white' }}>Dashboard</h3>
//             </Link>


//             <Link to="/profile" style={{ textDecoration: 'none' }}>

//               <h3 style={{ marginLeft: "35px", color: 'white' }}>Profile</h3>
//             </Link>


//             <Link to="/profile/edit-profile" style={{ textDecoration: 'none' }}>

//               <h3 style={{ marginLeft: "35px", color: 'white' }}>Edit Profile</h3>
//             </Link>

//             <Link to="/profile/fuel-details" style={{ textDecoration: 'none' }}>

//               <h3 style={{ marginLeft: "35px", color: 'white' }}>Calculate Fuel</h3>
//             </Link>


//             <Link to="/profile/fuel" style={{ textDecoration: 'none' }}>

//               <h3 style={{ marginLeft: "35px", color: 'white' }}>See Fuel Used</h3>
//             </Link>

//             <Tooltip title="Account settings">
//               <IconButton
//                 onClick={handleClick}
//                 size="small"
//                 sx={{ ml: 2 }}
//                 aria-controls={open ? 'account-menu' : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? 'true' : undefined}
//               >
//                 <Avatar sx={{ width: 32, height: 32 }}></Avatar>
//               </IconButton>
//             </Tooltip>
//           </Box>
//           <Menu
//             anchorEl={anchorEl}
//             id="account-menu"
//             open={open}
//             onClose={handleClose}
//             onClick={handleClose}
//             PaperProps={{
//               elevation: 0,
//               sx: {
//                 overflow: 'visible',
//                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//                 mt: 1.5,
//                 '& .MuiAvatar-root': {
//                   width: 32,
//                   height: 32,
//                   ml: -0.5,
//                   mr: 1,
//                 },
//                 '&:before': {
//                   content: '""',
//                   display: 'block',
//                   position: 'absolute',
//                   top: 0,
//                   right: 14,
//                   width: 10,
//                   height: 10,
//                   bgcolor: 'background.paper',
//                   transform: 'translateY(-50%) rotate(45deg)',
//                   zIndex: 0,
//                 },
//               },
//             }}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//           >

//             <MenuItem onClick={handleClose}>
//               <Link to='/profile'>
//                 <Avatar /> My account</Link>
//             </MenuItem>
//             <Divider />

//             <MenuItem onClick={handleClose}>
//               <Link to='/'>
//                 <ListItemIcon>
//                   <Logout fontSize="small" />
//                 </ListItemIcon>
//                 Logout
//               </Link>
//             </MenuItem>

//           </Menu>
       
//       </AppBar>
//     </>
//   );
// }

