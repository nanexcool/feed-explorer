import React from 'react';
import initWeb3 from './web3';

const Feed = (props) => {
    let web3 = initWeb3();
    return (
        <div>
            <p>{props.name}</p>
            <p>{web3.currentProvider.host}</p>
        </div>
    )
}

export default Feed;
