import React from 'react'
import createComponent from '@/tools/components/createComponent';
import './AboutButton.css'
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { actions } from '@/redux/slices'
import { getOnClick } from '@/tools/components/helper';

export default createComponent(({ text }) => {
    const dispatch = useDispatch()

    const onClick = getOnClick(dispatch, actions.geomap.openAboutWindow);

    return <Button color='green' className='AboutButton' as='a' onClick={onClick}>{text}</Button>
})
