import styles from "../styles/Login.module.css";
import Image from "next/image";
import icon from "./Images/tapped.svg";
import {useMoralis} from "react-moralis";

function Login() {
  const { authenticate, authError} = useMoralis();

   async function authWalletConnect() {
    const user = authenticate({
      provider: "walletconnect",
      chainId: 56,
      mobileLinks: [
        "rainbow",
        "metamask",
        "argent",
        "trust",
        "imtoken",
        "pillar",
      ],
      signinMessage: "Wealcome!"
  });
    console.log(user);
    }
  return (
    <div className={styles.login_container}>
      <div className={styles.login_card}>
        <Image src={icon} width={100} height={100} />
        <div className={styles.sign_in_container}>
          {authError && (
            <p className={styles.error}>
              {authError.name}
              {authError.message}
            </p>
          )}
          <button
            onClick={() => authWalletConnect()}
          >
            Login to tapped
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;