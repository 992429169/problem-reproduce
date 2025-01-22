import React from 'react';

import s from './index.module.scss';

const Common1 = ({ text }) => {
    return (
        <>
            <div className={s.common}>i am a Common1 {text}</div>
        </>
    );
};

export default Common1;
