import { use, useEffect } from "react"
import { useMoralis } from "react-moralis"

const ManualHeader = () => {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 } = useMoralis()
    useEffect(() => {
        if (isWeb3Enabled) return
        enableWeb3()
        if (typeof window !== "undefined") {
            if(window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    
    }, [isWeb3Enabled])

    useEffect(()=> {
        Moralis.onAccountChanged((account)=> {
            console.log(`Account change to ${account}`)
            if(account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null account found")
            }
        })
    }, [])



    return (
        <div>
            {account ? (
                <div>
                    connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                >
                    Connect
                </button>
            )}
        </div>
    )
}

export default ManualHeader
