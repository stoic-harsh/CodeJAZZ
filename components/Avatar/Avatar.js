import Avatar from '@mui/material/Avatar';

// function randomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }


function randomColor(name) {
    // Convert name to a unique numeric value
    let numericValue = 0;
    for (let i = 0; i < name.length; i++) {
      numericValue += name.charCodeAt(i);
    }
    
    // Generate a dark shade color based on the numeric value
    const hue = numericValue % 360;  // Use modulus operator to limit the hue value
    const saturation = 60;  // Adjust the saturation value as desired
    const lightness = Math.random() * 20 + 30;  // Generate a random lightness between 20 and 50
    
    // Convert HSL color to RGB color
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;
    if (h < 1 / 6) {
      [r, g, b] = [c, x, 0];
    } else if (h < 2 / 6) {
      [r, g, b] = [x, c, 0];
    } else if (h < 3 / 6) {
      [r, g, b] = [0, c, x];
    } else if (h < 4 / 6) {
      [r, g, b] = [0, x, c];
    } else if (h < 5 / 6) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);
    
    // Return the generated color as a CSS color value
    return `rgb(${red}, ${green}, ${blue})`;
  }
  


function extractName(inputString) {
    var words = inputString.split(' ');
    var firstLetters = [];
  
    for (var i = 0; i < words.length; i++) {
      var word = words[i].trim();
      if (word !== '') {
        var firstLetter = word.charAt(0).toUpperCase();
        firstLetters.push(firstLetter);
      }
    }
  
    var finalList = firstLetters.join('');
    
    if(finalList.length <= 2)
    return finalList;

    else
    return finalList[0]+finalList[finalList.length-1];
  }
  


function stringAvatar(name) {
  return {
    sx: {
      bgcolor: randomColor(name),
      width: '50px',
      height: '50px',
    },
    children: extractName(name)
  };
}

function shortenName(name){
    if(name.length === 0)
    return "Unknown";

    let arr = name.trim().split(' ');

    if(arr.length == 1)
    return arr[0];

    else
    return arr[0] + " "+ arr[1][0];
}


export default function NamedAvatar({name}) {
  return <div className="flex flex-col mr-[25px] mb-[15px] items-center">
    <Avatar {...stringAvatar(name)} />
    <span>{shortenName(name)}</span>
  </div>
}