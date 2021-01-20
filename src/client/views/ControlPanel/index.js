import actions from '../../actions'
import { connect } from 'react-redux'
import ControlPanel from './ControlPanel'

const mapStateToProps = (state) => {
    const { lat, lon, latText, lonText, zoom, geohash } = state.geomap;
    return {
        lat, lon, latText, lonText, zoom, geohash
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);