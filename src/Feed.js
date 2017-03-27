import React from 'react';
import initWeb3 from './web3';

const Feed = (props) => {
    let web3 = initWeb3();
    return (
        <div>
            {props.name}
        </div>
    )
}

export default Feed;
