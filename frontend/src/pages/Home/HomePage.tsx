import { OraclesList, Button } from "./components";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { useEffect, useMemo, useState } from "react";
import { generateRandomness } from '@mysten/zklogin';
import { generateNonce } from "@mysten/zklogin";
import { SuiClient } from "@mysten/sui/client";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const KEY_PAIR_SESSION_STORAGE_KEY = "demo_ephemeral_key_pair";
export const FULLNODE_URL = "https://fullnode.devnet.sui.io";
const CLIENT_ID =
  "573120070871-0k7ga6ns79ie0jpg1ei6ip5vje2ostt6.apps.googleusercontent.com";
export const REDIRECT_URI = "http://localhost:5173/";
const suiClient = new SuiClient({ url: FULLNODE_URL });


export const HomePage = () => {

  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair>();
  const [nonce, setNonce] = useState("");

  const handleButtonClick = async () => {
    console.log('Button clicked from Home Page!');

    // Step 1: Generate Ephemeral Key Pair
    const ephemeralKeyPair = Ed25519Keypair.generate();
    window.sessionStorage.setItem(
      KEY_PAIR_SESSION_STORAGE_KEY,
      ephemeralKeyPair.getSecretKey()
    );
    setEphemeralKeyPair(ephemeralKeyPair);

    //Step 2: Fetch JWT (from OpenID Provider)
    const randomness = generateRandomness();

    const { epoch } = await suiClient.getLatestSuiSystemState();

    const nc = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      Number(epoch),
      randomness
    );
    setNonce(nc);
    console.log(nonce);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "id_token",
      scope: "openid",
      nonce: nonce,
    });
    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    window.location.replace(loginURL);
  };

  return (
    <div> 
      <h1>Home Page</h1>
      <p>Welcome to the home page</p>
      <Button onClick={handleButtonClick} label="Login" />  
      <OraclesList />
    </div>
  );
}