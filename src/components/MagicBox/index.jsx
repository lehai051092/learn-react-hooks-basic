import React from 'react';
import UseMagicColor from '../../hooks/useMagicColor';
import './magic-box.scss';

MagicBox.propTypes = {};

function MagicBox() {
    const color = UseMagicColor();
    return (
        <div className='magic-box' style={{backgroundColor: color}}>

        </div>
    );
}

export default MagicBox;