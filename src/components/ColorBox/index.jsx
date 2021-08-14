import React, {useState} from 'react';
import './color-box.scss';

ColorBox.propTypes = {};

const getRandomColor = () => {
    const COLOR_LIST = ['deeppink', 'green', 'yellow', 'black', 'blue'];
    const randomIndex = Math.trunc(Math.random() * 5);
    return COLOR_LIST[randomIndex];
}

function ColorBox() {
    const [color, setColor] = useState(() => {
        return localStorage.getItem('box_color') || 'deeppink';
    });

    const handleBoxClick = () => {
        // get random color -> set color
        const  newColor = getRandomColor();
        setColor(newColor);
        // save new color to local storage
        localStorage.setItem('box_color', newColor);
    }

    return (
        <div className="color-box"
             style={{backgroundColor: color}}
             onClick={handleBoxClick}
        >
        </div>
    );
}

export default ColorBox;