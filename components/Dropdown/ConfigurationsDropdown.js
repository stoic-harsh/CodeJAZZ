import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Chip, Divider } from '@mui/material';


import available_languages from "@/utils/AvailableConfigurations/AvailableLanguages";
import available_themes from "@/utils/AvailableConfigurations/AvailableThemes";



export default function ConfigurationsDropdownMenu({ setThemeIndex, setLanguageIndex, themeIndex, languageIndex }) {
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className="py-2 px-3 rounded-md dropdown-gradient text-white normal-case ">
          {(themeIndex ? available_themes[themeIndex].value : "Light")} | {(languageIndex ? available_languages[languageIndex].name : "Javascript")}
        </span>
      </Button>
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Chip label="Themes" sx={{ backgroundColor: "rgb(249 115 22)", color: 'white', margin: '15px 0 7px 10px' }} />
        <Divider sx={{ backgroundColor: 'rgb(251 146 60)', borderWidth: '2px' }} />
        {
          available_themes.map((theme, index)=>{
            return( 
              <MenuItem key={index}
              onClick= { (event)=>{
                setThemeIndex(index);
                handleClose(event);
              }}
              >{theme.value}</MenuItem>
            )}
          )
        }
        
        <Chip label="Languages" sx={{ backgroundColor: "rgb(19 78 74)", color: 'white', margin: '28px 0 7px 10px' }} />
        <Divider sx={{ backgroundColor: 'rgb(17 94 89)', borderWidth: '2px' }} />
        {
          available_languages.map((language, index)=>{
            return( 
              <MenuItem key={index}
              onClick= { (event)=>{
                setLanguageIndex(index);
                handleClose(event);
              }}
              >{language.name}</MenuItem>
            )}
          )
        }

      </Menu>
    </div>
  );
}
