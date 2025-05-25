import React from 'react'
import createComponent from '../helper/createComponent.jsx'
import './ActionButton.css'
import { Button } from 'semantic-ui-react'

export default createComponent(({ text, onClick }) => {
    return (
        <Button color='green' className='ActionButton' as='a' href='#' onClick={onClick}>{text}</Button>
    )
})
