import React from 'react';
import ContentLoader from 'react-content-loader';

const loader = () => {
    return <ContentLoader type="facebook">
        <rect x="0" y="80" rx="3" ry="3" width="350" height="10"/>
        <rect x="0" y="100" rx="3" ry="3" width="400" height="10"/>
        <rect x="0" y="120" rx="3" ry="3" width="360" height="10"/>
        <rect x="12" y="38.27" rx="0" ry="0" width="94" height="32"/>
        <rect x="133" y="37.27" rx="0" ry="0" width="105.84" height="33"/>
        <rect x="265.03" y="37.27" rx="0" ry="0" width="98.34" height="33"/>
        <rect x="64.38" y="10.27" rx="0" ry="0" width="261.19" height="22"/>
    </ContentLoader>
};

export default loader;