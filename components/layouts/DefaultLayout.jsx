import React from 'react';

import Head from './modules/Head';
import BackToTop from '../elements/BackToTop';

const DefaultLayout = ({ children }) => {
    if (typeof window !== 'undefined') {
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.async = 'async';
        script.src = "https://js.stripe.com/v3/";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    return (
        <div className="layout--default">
            <Head />
            {children}
            <div id="loader-wrapper">
                <div className="loader-section section-left"></div>
                <div className="loader-section section-right"></div>
            </div>
            <BackToTop scrollStepInPx="1000" delayInMs="0.5" />
        </div>
    );
}

export default DefaultLayout;
