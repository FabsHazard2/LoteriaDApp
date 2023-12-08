import { useState, useEffect } from 'react';
import { useContext } from 'react';
import Web3 from 'web3';

// Context
import { AuthContext } from "@src/App";

// Helper
import { contractAbi } from "@utils/helper";

const SmartContract = () => {
  const context = useContext(AuthContext);

  const web3 = new Web3(Web3.givenProvider);
  console.log("Given Provider:", web3.currentProvider); // Log the current provider object

  const contractAdd = "0x165cf2882c659fba81341F12B04658A20C77dA3C";
  const contract = new web3.eth.Contract(contractAbi(), contractAdd);

  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [contractBalance, setContractBalance] = useState(0);

  // Default error message
  const msg = "Transaction failed. Check your wallet transactions for more details.";

  // PARTICIPATE FUNCTION
  async function participate() {
    // Reset error message
    setError(null);

    try {
      await contract.methods.participate().send({ from: context.userAcc, value: web3.utils.toWei('0.005', 'ether') });
      await fetchParticipants();
    } catch (error) {
      setError(msg);
      console.error(error);
    }
  }

  // SELECT WINNER FUNCTION
  async function selectWinner() {
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

  // Fetch participants and contract balance on page load
  useEffect(() => {
    fetchParticipants();
    fetchContractBalance();
  }, []);

  return (
    <>
      <main className="px-3">
        <p className="lead">
          Interact with the Lottery smart contract
        </p>

        <div className="d-flex flex-column">
          <button className="btn btn-outline-secondary mb-3" onClick={participate}>
            Participate (Ticket Price: 0.005 ether)
          </button>
          <button className="btn btn-outline-secondary mb-3" onClick={selectWinner}>
            Select Winner
          </button>
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
