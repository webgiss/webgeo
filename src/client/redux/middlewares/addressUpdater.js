import { createListenerMiddleware } from '@reduxjs/toolkit'
import { actions } from '@/redux/slices'

const addressUpdater = createListenerMiddleware()

addressUpdater.startListening({
    predicate: (action, currentState, previousState) => `${currentState.geomap.lat}-${currentState.geomap.lon}` !== `${previousState.geomap.lat}-${previousState.geomap.lon}`,
    effect: async (action, listenerApi) => {
        const { dispatch, getState } = listenerApi;

        const { popupStatus, address, lat, lon } = getState().geomap;

        if (popupStatus && !address) {
            dispatch(actions.geomap.needAddress({lat, lon}));
        }
    }
})

export default addressUpdater;