import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func
};

PostFiltersForm.defaultProps = {
    onSubmit: null
}

function PostFiltersForm(props) {
    const {onSubmit} = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeoutRef = useRef(null);

    const handleSearchTempChange = (e) => {
        const value = e.target.value;
        
        setSearchTerm(value);
        if (!onSubmit) return;
        // clear timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value
            };
            onSubmit(formValues);
        }, 1000);
    }

    return (
        <form>
            <input type="text" value={searchTerm} onChange={handleSearchTempChange}/>
        </form>
    );
}

export default PostFiltersForm;