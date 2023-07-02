import React from 'react';

import './AboutButton.css'
import { Button } from 'semantic-ui-react';

const AboutButton = ({ text, onClick }) => {
    return <Button color='green' className='AboutButton' as='a' href='#' onClick={onClick}>{text}</Button>
}

export default AboutButton;