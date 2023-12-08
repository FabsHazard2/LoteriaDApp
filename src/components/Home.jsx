import { useContext } from 'react';

// Context
import { AuthContext } from "@src/App";

const Home = () => {
  const context = useContext(AuthContext);

  return (
    <>
      <main className="px-3">
        {!context.authenticated ? (
          <>
            <h1>Welcome</h1>
            
            {!context.ethWallet ? (
              <p className="lead">
                Please install MetaMask wallet to continue.
              </p>
            ) : (
              <>
                <p className="lead">
                  Please connect your MetaMask wallet to continue.
                </p>
              </>
            )}

            {context.connectionErr !== null && (
              <p className="lead error-text">
                Error: {context.connectionErr}
              </p>
            )}

          </>
        ) : (
          <>
            <h1>Welcome back to Lottery</h1>
            <p className="lead mb-1 mt-3">You're connected to:</p>
            <p>{context.userAcc}</p>
          </>
        )}
      </main>
    </>
  )
}

export default Home
