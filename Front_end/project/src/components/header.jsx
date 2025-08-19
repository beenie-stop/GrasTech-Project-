import React from 'react';

export default function Header() {
    
    const today = new Date();

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(undefined, options);

    return (
        <header style={{ position: 'fixed', top: 0, left: 0, padding: '10px 20px', fontWeight: 'bold' }}>
            {formattedDate}
        </header>
    );
}
