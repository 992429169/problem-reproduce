import React, { useEffect, useState } from 'react';

const LazyComp = () => {
    const [Comp, setComp] = useState();
    useEffect(() => {
        setTimeout(() => {
            import(
                /* webpackChunkName: "LazyComp1" */
                /* webpackPrefetch: true */
                './Comp'
            ).then((val) => {
                setComp(() => val.default);
            });
        }, 2000);
    }, []);
    return Comp ? <Comp /> : null;
};

export default LazyComp;
