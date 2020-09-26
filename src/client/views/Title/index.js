import actions from '../../actions'
import { connect } from 'react-redux'
import Title from './Title'

const mapStateToProps = (state) => {
    const { nlat, nlon, address } = state.geomap;
    return {
        nlat, nlon, address
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Title);
