import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"

import BigNumber from 'bignumber.js'

export const ContractContext = createContext();

export const ContractProvider = (props) => {
    const [reloadCounter, setReloadCounter] = useState(0)

    useEffect(() => {
        let ac = new AbortController();

        const reload = () => {
            setReloadCounter(t => { return t + 1 });
        }

        let tmr = setInterval(() => {
            if (ac.signal.aborted === false) {
                window.web3 && reload();
            }
        }, 60000);

        return () => {
            ac.abort();
            clearInterval(tmr);
        }
    }, [])

    const refreshPages = () => {
        setReloadCounter(t => { return t + 1 });
    }

    return (
        <ContractContext.Provider value={{
            reloadCounter, refreshPages
        }}>
            {props.children}
        </ContractContext.Provider>
    )
}

export const useContract = () => {
    const contractManager = useContext(ContractContext)
    return contractManager || [{}, async () => { }]
}
