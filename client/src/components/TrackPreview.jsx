import PropTypes from 'prop-types';

export default function TrackPreview({ previewURL}) {
    return (
        <div>
            {previewURL? 
            (
                <audio controls>
                    <source src={previewURL} type="audio/mpeg"/>
                    Your browswer does not support this audio tag.
                </audio>
            ) : (
                <p></p>
            )}            
        </div>
    )
}

TrackPreview.propTypes = { previewURL: PropTypes.string.isRequired};