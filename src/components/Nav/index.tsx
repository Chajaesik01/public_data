import { Outlet } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <h1>Nav</h1>
            <Outlet />
        </div>
    );
}

export default Nav;