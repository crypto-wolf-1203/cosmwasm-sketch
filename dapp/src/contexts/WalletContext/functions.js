export const getAppConfig = (configs) => {
    const network = process.env.REACT_APP_NETWORK;
    if (!network) return configs.local;

    const config = configs[network];
    if (!config) {
        throw new Error(`No configuration found for network ${network}`);
    }

    return config;
}

export const configKeplr = (config) => {
    return {
        chainId: config.chainId,
        chainName: config.chainName,
        rpc: config.rpcUrl,
        rest: config.httpUrl,
        bech32Config: {
            bech32PrefixAccAddr: `${config.addressPrefix}`,
            bech32PrefixAccPub: `${config.addressPrefix}pub`,
            bech32PrefixValAddr: `${config.addressPrefix}valoper`,
            bech32PrefixValPub: `${config.addressPrefix}valoperpub`,
            bech32PrefixConsAddr: `${config.addressPrefix}valcons`,
            bech32PrefixConsPub: `${config.addressPrefix}valconspub`,
        },
        currencies: [
            {
                coinDenom: config.coinMap[config.feeToken].denom,
                coinMinimalDenom: config.feeToken,
                coinDecimals: config.coinMap[config.feeToken].fractionalDigits,
            },
            // {
            //     coinDenom: config.coinMap[config.stakingToken].denom,
            //     coinMinimalDenom: config.stakingToken,
            //     coinDecimals: config.coinMap[config.stakingToken].fractionalDigits,
            // },
        ],
        feeCurrencies: [
            {
                coinDenom: config.coinMap[config.feeToken].denom,
                coinMinimalDenom: config.feeToken,
                coinDecimals: config.coinMap[config.feeToken].fractionalDigits,
            },
        ],
        stakeCurrency: {
            coinDenom: config.coinMap[config.stakingToken].denom,
            coinMinimalDenom: config.stakingToken,
            coinDecimals: config.coinMap[config.stakingToken].fractionalDigits,
        },
        gasPriceStep: {
            low: config.gasPrice / 2,
            average: config.gasPrice,
            high: config.gasPrice * 2,
        },
        bip44: { coinType: 118 },
        coinType: 118,
    };
}
