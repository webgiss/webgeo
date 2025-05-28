import { configureStore } from '@reduxjs/toolkit'

import { reducer } from '@/redux/slices'
import { debug_reducer } from '@/tools/debug';

import addressUpdater from '@/redux/middlewares/addressUpdater';
import hashUpdater from '@/redux/middlewares/hashUpdater';

const new_reducer = {
  ...debug_reducer,
  ...reducer
}

const storeCreator = (enhancer) => {
    const storeConfig = {
      reducer: new_reducer,
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
          .prepend(addressUpdater.middleware)
          .prepend(hashUpdater.middleware)
      },
    }
    if (enhancer) {
      storeConfig.enhancers = (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancer);
    }
    return configureStore(storeConfig);
}

export default storeCreator;