import { history } from '../history'
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import MainPage from '@/components/MainPage'
import LocationListener from '@/components/Routes/LocationListener'

export default () => {
    return (
        <HistoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}} history={history}>
            <LocationListener />
            <Routes>
                <Route path='/' element={<MainPage />} />
            </Routes>
        </HistoryRouter>
    )
}
