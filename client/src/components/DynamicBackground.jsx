import { useEffect, useState } from 'react';
import useColorThief from 'use-color-thief';
import PropTypes from 'prop-types';

export default function DynamicBackground({ image, children }) {
    const [background, setBackground] = useState('#ffffff');
    const [mainColor, setMainColor] = useState('');

    const { color, palette } = useColorThief(image, {
        format: 'hex',
        colorCount: 10,
        quality: 10,
      });

    useEffect(() => {
        if (palette && palette.length > 0) {
            setBackground(`linear-gradient(to bottom, ${palette[0]}, ${palette[1]})`);
            setMainColor(color);
        }
    }, [palette, color, mainColor]);


    return (
        <div style={{             
            background: background, 
        }}>
            {children}
        </div>
    )
}

DynamicBackground.propTypes = { image: PropTypes.string, children: PropTypes.node };