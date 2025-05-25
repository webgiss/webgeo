import React from 'react'
import createComponent from '../helper/createComponent.jsx'
import './AboutButton.css'
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/slices/index.js'

export default createComponent(({ text }) => {
    const dispatch = useDispatch()

    const onClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(actions.geomap.openAboutWindow())
    }

    return <Button color='green' className='AboutButton' as='a' href='#' onClick={onClick}>{text}</Button>
})
