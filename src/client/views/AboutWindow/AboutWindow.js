import React from 'react';

import './AboutWindow.css'
import { Button, Header, Modal } from 'semantic-ui-react';

const AboutWindow = ({ open, onClose }) => {
    return <Modal
        className='AboutWindow'
        open={open}
        onClose={onClose}
    >
        <Header icon='info circle' content='About WebGeo' />
        <Modal.Content>
            <p>
                This application is a map viewer with a focus on displaying latitude and longitude coordinates in both technical and classical formats.
            </p>
            <p>
                URLs for the project:
            </p>
            <ul>
                <li><b>Site</b> : <a href='https://webgiss.github.io/webgeo/'>https://webgiss.github.io/webgeo/</a></li>
                <li><b>Sources</b> : <a href='https://github.com/webgiss/webgeo/' target='_blank'>https://github.com/webgiss/webgeo/</a></li>
                <li><b>Issues/Questions/Requests</b> : <a href='https://github.com/webgiss/webgeo/issues' target='_blank'>https://github.com/webgiss/webgeo/issues</a></li>
            </ul>
        </Modal.Content>
        <Modal.Actions>
            <Button color="black" onClick={onClose}>Close</Button>
        </Modal.Actions>

    </Modal>
}

export default AboutWindow;