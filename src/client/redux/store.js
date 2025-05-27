import { configureStore } from '@reduxjs/toolkit'
import { reducer, slices, actions } from '@/redux/slices'
import { createListenerMiddleware } from '@reduxjs/toolkit';

import { to_export_on_debug, _set_debug, get_debug, export_on_window, on_debug } from '../tools/debug';
import addressUpdater from '@/redux/middlewares/addressUpdater';
import hashUpdater from '@/redux/middlewares/hashUpdater';

const new_reducer = {
  _debug: function reducer(state, action) {
    if (get_debug()) {
      const last_action = { ...action, _time: new Date().getTime() }
      on_debug({ last_action })
    }
    return null
  },
  ...reducer
}

const store = configureStore(
  {
    reducer: new_reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .prepend(addressUpdater.middleware)
        .prepend(hashUpdater.middleware)
    },
  }
)

function debug() {
  if (window.undebug) {
    if (typeof window.undebug === 'function') {
      window.undebug()
    }
  }

  let unsubribe = store.subscribe(() => {
    const state = store.getState()
    export_on_window({ state })
  })

  store.dispatch({ type: 'DEBUG' })

  export_on_window({ slices, actions, store })
  export_on_window(to_export_on_debug)
  _set_debug(true)

  const _undebug = () => {
    unsubribe()
    _set_debug(false)
    delete window.state
    delete window.slices
    delete window.actions
    delete window.store
    delete window.undebug
    for (const name of Object.keys(to_export_on_debug)) {
      delete window[name]
    }
    store.dispatch({ type: 'UNDEBUG' })
  }
  const undebug = () => _undebug()
  export_on_window({ undebug })
  return ()=>undebug()
}

export_on_window({
  debug: () => debug()
});

export default store;
