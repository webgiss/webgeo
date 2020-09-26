import actions from '../../actions'
import { connect } from 'react-redux'
import MapStyleSelector from './MapStyleSelector'

const mapStateToProps = (state) => {
    const { style } = state.geomap;
    return {
        style
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onStyleSelected: (style) => dispatch(actions.geomap.setStyle(style)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapStyleSelector);