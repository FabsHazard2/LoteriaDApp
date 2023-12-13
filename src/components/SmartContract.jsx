import React, { useState, useEffect, useContext } from 'react';
import Web3 from 'web3';

// Context
import { AuthContext } from "@src/App";

// Helper
import { contractAbi } from "@utils/helper";

const SmartContract = () => {
  const context = useContext(AuthContext);

  const web3 = new Web3(Web3.givenProvider);
  console.log("Given Provider:", web3.currentProvider); // Log the current provider object

  const contractAdd = "0xa259a7B95f7FF9515095a5DB39C5E45C0a9947c5";
  const contract = new web3.eth.Contract(contractAbi(), contractAdd);

  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [contractBalance, setContractBalance] = useState(0);
  const [isContractOwner, setIsContractOwner] = useState(false);

  // Default error message
  const msg = "Transaction failed. Check your wallet transactions for more details.";

  // PARTICIPATE FUNCTION
  async function participate() {
    // Check if the current user is not the contract owner
    if (!isContractOwner) {
      // Reset error message
      setError(null);

      try {
        await contract.methods.participate().send({ from: context.userAcc, value: web3.utils.toWei('0.005', 'ether') });
        await fetchParticipants();
      } catch (error) {
        setError(msg);
        console.error(error);
      }
    } else {
      // Contract owner cannot participate
      setError("Contract owner cannot participate.");
    }
  }

  // SELECT WINNER FUNCTION
  async function selectWinner() {
    // Check if the current user is the contract owner
    if (isContractOwner) {
      // Reset error message
      setError(null);

      try {
        await contract.methods.selectWinner().send({ from: context.userAcc });
        await fetchParticipants();
        await fetchContractBalance();
      } catch (error) {
        setError(msg);
        console.error(error);
      }
    } else {
      // Non-contract owner cannot select winner
      setError("Only contract owner can select the winner.");
    }
  }

  // READ FUNCTIONS
  async function fetchParticipants() {
    try {
      const participants = await contract.methods.getParticipants().call();
      setParticipants(participants);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchContractBalance() {
    try {
      const balance = await contract.methods.getContractBalance().call();
      setContractBalance(balance);
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch participants, contract balance, and contract owner on page load
  useEffect(() => {
    fetchParticipants();
    fetchContractBalance();
    fetchContractOwner(); // Fetch contract owner address
  }, []);

  // Fetch contract owner address
  async function fetchContractOwner() {
    try {
      const owner = await contract.methods.admin().call();
      setIsContractOwner(context.userAcc.toLowerCase() === owner.toLowerCase());
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main className="px-3">
        <p className="lead">
          Interact with the Lottery smart contract
        </p>

        <div className="d-flex flex-column">
          {/* Conditionally render the Participate button for non-owners */}
          {!isContractOwner && (
            <button className="btn btn-outline-secondary mb-3" onClick={participate}>
              Participate (Ticket Price: 0.005 ether)
            </button>
          )}

          {/* Conditionally render the Select Winner button for the contract owner */}
          {isContractOwner && (
            <button className="btn btn-outline-secondary mb-3" onClick={selectWinner}>
              Select Winner
            </button>
          )}
        </div>

        <div>
          <p>Participants: {participants.length}</p>
          <p>Contract Balance: {web3.utils.fromWei(contractBalance.toString(), 'ether')} ether</p>
        </div>

        {error !== null && (
          <p className="lead error-text mt-4">
            Error: {error}
          </p>
        )}
      </main>
    </>
  );
};

export default SmartContract;
