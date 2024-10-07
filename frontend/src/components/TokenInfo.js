// TokenInfo.js

import React, { useEffect, useState } from 'react';

const TokenInfo = () => {
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [totalSupply, setTotalSupply] = useState('');

    const fetchTokenInfo = async () => {
        const [name, symbol, supply] = await tokenContract.getTokenInfo();
        setTokenName(name);
        setTokenSymbol(symbol);
        setTotalSupply(supply.toString());
    };

    useEffect(() => {
        fetchTokenInfo();
    }, []);

    return (
        <div>
            <h1>Token Information</h1>
            <pre>
                {`Token Name: ${tokenName}\nToken Symbol: ${tokenSymbol}\nTotal Supply: ${totalSupply}`}
            </pre>
        </div>
    );
};

export default TokenInfo;
