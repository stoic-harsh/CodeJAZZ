import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ConfigurationsDropdown from "@/components/Dropdown/ConfigurationsDropdown";


export default function CustomAppBar({ setOpen, setThemeIndex, setLanguageIndex, themeIndex, languageIndex }) {
    
    const handleDrawerOpen = ()=>{
      setOpen(true);
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

          <ConfigurationsDropdown setThemeIndex={setThemeIndex} setLanguageIndex={setLanguageIndex} themeIndex={themeIndex} languageIndex={languageIndex} />
        </Toolbar>
      </AppBar>
  );
}
