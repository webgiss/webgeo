import { actions } from "@/redux/slices";

export const init = (store) => {
  debug()
  store.dispatch(actions.geomap.setCoord({lat: 48.87,lon:2.33}));
}