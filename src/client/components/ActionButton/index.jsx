import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './ActionButton.css'
import { Button } from 'semantic-ui-react'

export default createComponent(({ text, onClick }) => {

    return (
        <Button color='green' className='ActionButton' as='a' onClick={onClick}>{text}</Button>
    )
})
