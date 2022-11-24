import Web3Modal from "web3modal";
import { providers , Contract } from "ethers";
import { useEffect, useState, useRef } from "react";

export default function Home() {
    const [walletConnected, setWalletConnected] = useState(false);
    const web3ModalRef = useRef();


    const connectWallet = async() => {
        try {
         await getProviderOrSigner();
         setWalletConnected(true);
        }
        catch (error) {
        console.error(error)
        }   
    };
        
            

    const getProviderOrSigner = async (needSigner = false) => {
        // const provider = await web3ModalRef.current.connect();
        const provider = await web3ModalRef.current.connect();
        const web3Provider = await providers.Web3Provider(provider);
        const { chinId } = await web3Provider.getNetwork();
        if(chinId !== 5 ){
            window.alert("only goerli network allowed")
            throw Error ("please connect with goerli network");
        };

        if(needSigner = true){
            const signer = await web3Provider.getSigner();
            return signer;
        }
        return web3Provider;
        
    }


    useEffect(()=>{
        if (!walletConnected) {

            web3ModalRef.current = new Web3Modal({
                network: "goerli",
                providerOptions: [],
                disableInjectedProvider: false
            }) 
            connectWallet();
        }
            
            
    })

    const walletButton  = () =>{
        if(!walletConnected){
            return(
                <button onClick={connectWallet}> connect wallet</button>
                
                
            )
        
        
        }<h1>your wallet connect to : </h1>
            
    }
            
    

    return (
        <div>
            {walletButton()}
        </div>
    )
};