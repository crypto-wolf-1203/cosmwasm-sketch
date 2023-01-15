import React from 'react'
// import { isMobile } from 'react-device-detect'

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { defaultGasLimits as defaultStargateGasLimits, GasLimits, GasPrice, makeCosmoshubPath, } from "@cosmjs/stargate";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { configKeplr } from './functions'
import WalletConfig from './config'

export const WalletContext = createContext();

export const WalletProvider = (props) => {
    const [signer, setSigner] = useState()
    const [keplrAddress, setKeplrAddress] = useState()
    const [client, setClient] = useState()
    const [error, setError] = useState()

    const loadKeplrWallet = useCallback(async (chainId) => {
        const anyWindow = window;
        if (!anyWindow.getOfflineSigner) {
            throw new Error("Wallet extension is not available")
        }

        const signer = await anyWindow.getOfflineSigner(chainId);
        signer.signAmino = signer.signAmino ?? signer.sign;

        return signer;
    }, [])

    const init = useCallback(async (loadWallet, config) => {
        try {
            const signer = await loadWallet(config.chainId, config.addressPrefix)
            setSigner(signer)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const connectKeplr = useCallback(async () => {
        const config = WalletConfig
        const anyWindow = window;
        try {
            try {
                await anyWindow.keplr.experimentalSuggestChain(configKeplr(config))
                await anyWindow.keplr.enable(config.chainId)
            } catch (err) {
                console.error(err)
                throw new Error("Wallet extension is not installed")
            }

            await init(loadKeplrWallet, config)
        } catch (error) {
            setError(error.message ?? error)
            console.error(error)
        }
    }, [WalletConfig, init, loadKeplrWallet])

    const createClient = useCallback(async (config, signer) => {
        const gasLimits = {
            ...defaultStargateGasLimits,
            upload: 1500000,
            init: 600000,
            exec: 400000,
            migrate: 600000,
            send: 80000,
            changeAdmin: 80000,
        };

        return SigningCosmWasmClient.connectWithSigner(config.rpcUrl, signer, {
            prefix: config.addressPrefix,
            gasPrice: GasPrice.fromString(`${config.gasPrice}${config.feeToken}`),
            gasLimits: gasLimits,
        });
    }, [defaultStargateGasLimits, SigningCosmWasmClient])

    const isLoggedIn = useCallback(() => {
        return client !== undefined && keplrAddress !== undefined
    }, [client, keplrAddress])

    const disconnectKeplr = useCallback(() => {
        setClient(undefined)
        setKeplrAddress(undefined)
    }, [])

    useEffect(() => {
        if (!signer) return;

        const updateClient = async () => {
            try {
                const address = (await signer.getAccounts())[0].address;
                setKeplrAddress(address)

                const client = await createClient(WalletConfig, signer);
                setClient(client);
            } catch (error) {
                console.error(error)
            }
        }

        updateClient()
    }, [signer, WalletConfig]);

    useEffect(() => {
        connectKeplr()
    }, [connectKeplr])

    return (
        <WalletContext.Provider value={{ connectKeplr, disconnectKeplr, keplrAddress, error, isLoggedIn }}>
            {props.children}
        </WalletContext.Provider>
    )
}

export const useCustomWallet = () => {
    const dataManager = useContext(WalletContext)
    return dataManager || [{}, async () => { }]
}
