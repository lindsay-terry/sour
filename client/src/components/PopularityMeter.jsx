import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

export default function PopularityMeter({ popularity, name }) {


    return (
        <div className=''>
            <CircularProgressbarWithChildren value={popularity}
            styles={{
                path: {
                    stroke: `rgba(34, 12, 97, ${popularity / 100})`,
                    strokeLinecap: 'butt',
                  },

            }}
            >
                <h4>{name}</h4>
                <h5>Popularity: {popularity}%</h5>
            </CircularProgressbarWithChildren>
        </div>
    )
}

PopularityMeter.propTypes = { popularity: PropTypes.number.isRequired, name: PropTypes.string.isRequired };