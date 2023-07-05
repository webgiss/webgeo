import actions from '../../actions'
import { connect } from 'react-redux'
import CoordInputWindow from './CoordInputWindow'

const mapStateToProps = (state) => {
    const { inputCoordWindowOpened, inputCoord, inputCoordParsed, inputCoordParsedError, inputCoordZoom } = state.geomap

    return {
        open: inputCoordWindowOpened,
        inputCoord: inputCoord,
        hasCoord: inputCoordParsed !== null,
        parsingInfo: inputCoordParsedError,
        previewZoom: inputCoordZoom,
        tech: inputCoordParsed !== null ? inputCoordParsed.tech : '',
        human: inputCoordParsed !== null ? inputCoordParsed.human : '',
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: () => dispatch(actions.geomap.closeInputCoordWindow()),
        onGoto: () => dispatch(actions.geomap.importInputCoordWindow()),
        onInputCoordUpdated: (data) => dispatch(actions.geomap.updateInputCoordWindow(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoordInputWindow);