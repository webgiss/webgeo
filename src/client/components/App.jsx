import { history } from '../history'
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom'
import MainPage from './MainPage'
import LocationListener from './Routes/LocationListener'

export default () => {
    return (
        <HistoryRouter history={history}>
            <LocationListener />
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </HistoryRouter>
    )
}
