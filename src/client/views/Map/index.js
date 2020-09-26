import actions from '../../actions'
import { connect } from 'react-redux'
import Map from './Map'

const mapStateToProps = (state) => {
    const { lat, lon, nlat, nlon, zoom, style, marks, address, useMilliGraticule } = state.geomap;
    return {
        lat, lon, nlat, nlon, zoom, style, address,
        marks: useMilliGraticule ? marks : null,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCenter: (lat, lon) => dispatch(actions.geomap.setCoord(lat, lon)),
        onZoom: (zoom) => dispatch(actions.geomap.setZoom(zoom)),
        onNeedAddress: (lat, lon) => dispatch(actions.geomap.needAddress(lat, lon)),
        onPopupStatusChanged: (status) => dispatch(actions.geomap.setPopupStatus(status)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);