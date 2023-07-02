import actions from '../../actions'
import { connect } from 'react-redux'
import AboutButton from './AboutButton'

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(actions.geomap.openAboutWindow()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutButton);