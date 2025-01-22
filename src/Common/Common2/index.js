import React from 'react';

import s from './index.module.scss';

const Common2 = ({ text }) => {
    return (
        <>
            <div className={s.common}>i am a Common2 {text}</div>
        </>
    );
};

export default Common2;
