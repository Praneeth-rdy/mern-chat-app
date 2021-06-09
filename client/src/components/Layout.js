import React from 'react';

function Layout({ children }) {
    return (
        <div>
            <header>
            </header>
            <div>
                { children }
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout;
