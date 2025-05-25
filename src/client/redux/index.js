import { setCoord } from "./slices/slice/geomap";

export const init = (store) => {
  debug()
  store.dispatch(setCoord({lat: 48.87,lon:2.33}));
}