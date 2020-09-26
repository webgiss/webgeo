export const createReducer = (reducersByType, initialState = {}) => {
    return function reducer(state, action) {
        if (!state) {
            state = initialState;
        }

        if (action) {
            const { type } = action;
            if (type) {
                const specificReducer = reducersByType[type];
                if (specificReducer) {
                    state = specificReducer(state, action);
                }
            }
        }

        return state;
    };
}

export const createLocationChangeReducer = (pathReducersByParam) => {
    return (state, action) => {
        let { payload } = action;
        if (payload.location) {
            const { hash } = payload.location;
            if (hash) {
                if (hash.substring(0, 1) === '#') {
                    const parts = hash.substring(1).split('&')
                    parts.forEach((part) => {
                        const [key, ...valuetmp] = part.split('=')
                        const value = valuetmp.join('=')
                        if (pathReducersByParam[key]) {
                            state = pathReducersByParam[key](state, value, { action, hash, key, value })
                        }
                    })

                }
            }
        }
        return state;
    }
}
