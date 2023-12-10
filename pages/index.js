import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FundManagementABI from "../artifacts/contracts/Assessment.sol/FundManagement.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [fundManagement, setFundManagement] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [showContractAddress, setShowContractAddress] = useState(false);

  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const fundManagementABI = FundManagementABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected:", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // Once wallet is set, we can get a reference to our deployed contract
    getFundManagementContract();
  };

  const getFundManagementContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const fundManagementContract = new ethers.Contract(contractAddress, fundManagementABI, signer);

    setFundManagement(fundManagementContract);
  };

  const getBalance = async () => {
    if (fundManagement) {
      try {
        const balance = await fundManagement.getTotalFunds();
        setBalance(balance.toNumber());
      } catch (error) {
        console.error("Error retrieving balance:", error.message);
      }
    }
  };

  const deposit = async () => {
    if (fundManagement) {
      try {
        const tx = await fundManagement.depositFunds({ value: ethers.utils.parseEther("0.00000000000001") });
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error depositing funds:", error.message);
      }
    }
  };

  const withdraw = async () => {
    if (fundManagement) {
      try {
        const tx = await fundManagement.withdrawFunds(ethers.utils.parseEther("0.00000000000001"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error withdrawing funds:", error.message);
      }
    }
  };

  const BuyNFT = async () => {
    if (fundManagement) {
      try {
        const tx = await fundManagement.purchaseNFT(ethers.utils.parseEther("1"));
        await tx.wait();
        getBalance();
      } catch (error) {
        console.error("Error purchasing NFT:", error.message);
      }
    }
  };

  const toggleContractAddress = () => {
    setShowContractAddress((prevShowContractAddress) => !prevShowContractAddress);
  };

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (fundManagement) {
      getBalance();
    }
  }, [fundManagement]);

  return (
    <main style={{ height: "100vh", width: "100vw" }} className="container main-cls">
      <header className="mb-4">
        <h1>Module 2 of EVM intermediate course</h1>
      </header>
      <div className="content">
        {!account ? (
          <button onClick={connectAccount}>Click to connect your MetaMask wallet</button>
        ) : (
          <>
            <p className="btn">Your Account is : {account}</p>
            <div className="btn-grp">
              <button onClick={toggleContractAddress}>
                {showContractAddress ? "Hide Contract Address" : "Show Contract Address"}
              </button>
              {showContractAddress && (
                <div>
                  <p>Contract Address: {contractAddress}</p>
                </div>
              )}
              <button onClick={deposit}>Deposit TestNet ETH</button>
              <button onClick={withdraw}>Withdraw TestNet ETH</button>
              <button onClick={BuyNFT}>Buy NFT</button>
            </div>
          </>
        )}
      </div>
      <style jsx>{`
        .main-cls {
          display: flex;
          justify-content: center;
          align-item: center;
          flex-direction: column;
        }
        .container {
          text-align: center;
          padding: 2em;
          background-color: rgba(0, 0, 0, 0.055);
        }

        .mb-4{
          margin-bottom : '4em'
        }

        .btn {
          color: rgba(0, 0, 0, 0.65);
          font-size: 1.8rem;
          font-weight: 600;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .btn-grp {
          margin-top: 20px;
        }

        button {
          display: block;
          margin-bottom: 10px;
          padding: 1.3rem 3rem;
          font-size: 1.3rem;
          background-color: #007bfd;
          color: #fff;
          border: 1px solid #007bgg;
          cursor: pointer;
          border-radius: 2em;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </main>
  );
}
