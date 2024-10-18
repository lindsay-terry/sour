import { useEffect, useState } from 'react';
import useColorThief from 'use-color-thief';
import PropTypes from 'prop-types';

export default function DynamicBackground({ image, children }) {
    const [background, setBackground] = useState('#ffffff');
    // eslint-disable-next-line no-unused-vars
    const [mainColor, setMainColor] = useState('');

    const { color, palette } = useColorThief(image, {
        format: 'hex',
        colorCount: 10,
        quality: 10,
      });

    useEffect(() => {
        if (palette && palette.length > 1) {
            setBackground(`linear-gradient(to bottom, ${palette[0]}, ${palette[1]})`);
            setMainColor(color);
        }
    }, [palette, color]);

    // Convert hex to RGB to get brightness to find out which text color to use
    let r = 0, g = 0, b = 0;

    if (palette && palette.length > 0) {
        r = parseInt(palette[0].slice(1, 3), 16);
        g = parseInt(palette[0].slice(3, 5), 16);
        b = parseInt(palette[0].slice(5, 7), 16);
    }

    // Calculate luminance
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    let textColor;
    let textShadow
    if (brightness < 250) {
        // Very dark background
        textColor = 'var(--linen';
        textShadow = '1px 1px 1px var(--smoky-black';
    } else if  (brightness < 450) {
        textColor = 'var(--prussian-blue';
        textShadow = '0px 0px 1px var(--linen)';
    } else {
        textColor = 'var(--smoky-black)';
        textShadow = '1px 1px 1px var(--linen)';
    }

    return (
        <div style={{             
            background: background,
            color: textColor,
            textShadow: textShadow,  
        }}>
            {children}
        </div>
    )
}

DynamicBackground.propTypes = { image: PropTypes.string, children: PropTypes.node };