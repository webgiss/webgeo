import React from 'react'
import createComponent from '../helper/createComponent.jsx'
import './ExtLinkButton.css'
import { Button } from 'semantic-ui-react'

export default createComponent(({ text, url }) => {
    return (
        <Button color='green' className='ExtLinkButton' as='a' target='_blank' href={url}>{text}</Button>
    )
})
