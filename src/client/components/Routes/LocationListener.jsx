import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/slices/index'

const LocationListener = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.geomap.locationChange(location))
  }, [location, dispatch])

  return null
}

export default LocationListener