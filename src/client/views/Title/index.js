import actions from '../../actions'
import { connect } from 'react-redux'
import Title from './Title'

const mapStateToProps = (state) => {
    const { nlat, nlon, latText, lonText, address } = state.geomap;
    return {
        nlat, nlon, latText, lonText, address
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);
