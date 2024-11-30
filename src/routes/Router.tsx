import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from '../pages';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
