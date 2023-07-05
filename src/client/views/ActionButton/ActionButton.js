import React from 'react';

import './ActionButton.css'
import { Button } from 'semantic-ui-react';

const ActionButton = ({ text, onClick }) => {
    return <Button color='green' className='ActionButton' as='a' href='#' onClick={onClick}>{text}</Button>
}

export default ActionButton;