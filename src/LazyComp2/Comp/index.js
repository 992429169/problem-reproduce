import React from 'react';

import s from './index.module.scss';
import Common2 from '../../Common/Common2';


const Comp = () => {
    return (
        <div className={s.comp}>
            i am a comp2 <Common2 />
        </div>
    );
};

export default Comp;
