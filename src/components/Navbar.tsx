import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'
import {useRecoilState } from 'recoil'
import { userState } from '../store/atoms/userstate';


export function Navbar() {
  const [username, setUsername] =  useRecoilState(userState)
  function refreshState(){
      localStorage.setItem('token', "");
      setUsername(null);

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={Link} to='/'  color='inherit'>App</Button>

          </Typography>
          { username  ? 
          <>
          <Button   color='inherit' onClick={refreshState} >LogOut</Button>
          </>
          : 
          <>
          <Button component={Link} to='/login'  color='inherit'>Login</Button>
          <Button component={Link} to='/signup' color='inherit' >SignUp</Button>

          </>
        }
          <Button component={Link} to='/courses' color='inherit' >Courses</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
