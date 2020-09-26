import actions from '../../actions'
import { connect } from 'react-redux'
import ControlPanel from './ControlPanel'

const mapStateToProps = (state) => {
    const {lat, lon, zoom} = state.geomap;
    return {
        lat, lon, zoom
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);