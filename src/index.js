import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import LazyComp1 from './LazyComp1';
import LazyComp2 from './LazyComp2';
import Common1 from './Common/Common1';

import s from './index.module.scss';

function App() {
    return (
        <div className={s.main}>
            <Common1 />
            <LazyComp1 />
            <LazyComp2 />
        </div>
    );
}

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<App />);
