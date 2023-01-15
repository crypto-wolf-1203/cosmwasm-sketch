import { getAppConfig } from "./functions";

const local = {
    chainId: "testing",
    chainName: "Testing",
    addressPrefix: "wasm",
    rpcUrl: "http://localhost:26659",
    httpUrl: "http://localhost:1317",
    faucetUrl: "http://localhost:8000",
    feeToken: "ucosm",
    stakingToken: "uatom",
    coinMap: {
        ucosm: { denom: "COSM", fractionalDigits: 6 },
        uatom: { denom: "ATOM", fractionalDigits: 6 },
    },
    gasPrice: 0.025,
};

const uninet = {
    chainId: "uni",
    chainName: "Uni",
    addressPrefix: "juno",
    rpcUrl: "https://rpc.uni.juno.deuslabs.fi",
    httpUrl: "https://lcd.uni.juno.deuslabs.fi",
    faucetUrl: "https://faucet.uni.juno.deuslabs.fi",
    feeToken: "ujunox",
    stakingToken: "ujunox",
    coinMap: {
        ujunox: { denom: "JUNOX", fractionalDigits: 6 },
    },
    gasPrice: 0.025,
};

const uni5net = {
    chainId: "uni-5",
    chainName: "Uni-5",
    addressPrefix: "juno",
    rpcUrl: "https://rpc.uni.juno.deuslabs.fi:443",
    httpUrl: "https://lcd.uni.juno.deuslabs.fi",
    faucetUrl: "https://faucet.uni.juno.deuslabs.fi",
    feeToken: "ujunox",
    stakingToken: "ujunox",
    coinMap: {
        ujunox: { denom: "ujunox", fractionalDigits: 6 },
    },
    gasPrice: 0.025,
};

const pebblenet = {
    chainId: "pebblenet-1",
    chainName: "Pebblenet",
    addressPrefix: "wasm",
    rpcUrl: "https://rpc.pebblenet.cosmwasm.com",
    httpUrl: "https://lcd.pebblenet.cosmwasm.com",
    faucetUrl: "https://faucet.pebblenet.cosmwasm.com",
    feeToken: "upebble",
    stakingToken: "urock",
    coinMap: {
        urock: { denom: "ROCK", fractionalDigits: 6 },
        upebble: { denom: "PEBBLE", fractionalDigits: 6 },
    },
    gasPrice: 0.025,
};

const configs = { local, uninet, uni5net, pebblenet };
const cosmosConfig = getAppConfig(configs)

export default cosmosConfig
