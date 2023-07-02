import actions from '../../actions'
import { connect } from 'react-redux'
import AboutWindow from './AboutWindow';

const mapStateToProps = (state) => {
    const { aboutWindowOpened } = state.geomap;
    return {
        open: aboutWindowOpened,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClose: () => dispatch(actions.geomap.closeAboutWindow()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutWindow);
