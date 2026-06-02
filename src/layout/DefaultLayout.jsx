import { Outlet } from 'react-router-dom';

function DefaultLayout() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DefaultLayout;