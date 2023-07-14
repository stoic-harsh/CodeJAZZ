import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function CustomAppBar({ setOpen }) {
    
    const handleDrawerOpen = ()=>{
      setOpen(true);

      document.getElementById("editor_textArea").style.width = window.innerWidth - 175 +"px";
      document.getElementById("editor_textArea").style.translate = "275px 0";
      document.getElementById("menu_icon").style.display = "none";
    }


  return (
      <AppBar className="bar-gradient" position="static">
        <Toolbar className="justify-center">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open dashboard"
            onClick={ handleDrawerOpen }
            id="menu_icon"
          >
            <MenuIcon className="text-[33px]"/>
          </IconButton>
          
          <div className="grow text-center text-[23px]">Code Editor</div>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
  );
}
