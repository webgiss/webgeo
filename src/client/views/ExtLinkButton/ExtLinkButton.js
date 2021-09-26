import React from 'react';
import { Button } from 'semantic-ui-react'

import './ExtLinkButton.css'

const ExtLinkButton = ({ text, url }) => {
    return <Button color='green' className='ExtLinkButton' as='a' target='_blank' href={url}>{text}</Button>
}

export default ExtLinkButton;