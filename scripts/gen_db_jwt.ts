/**
 * Generates the JWT for accessing a self hosted instance of Turso libSQL.
 */

import * as jose from "npm:jose";

const keyPair = await crypto.subtle.generateKey(
  {
    name: "Ed25519",
    namedCurve: "Ed25519",
  },
  true,
  ["sign"],
);

const rawPublicKey = await crypto.subtle.exportKey("raw", keyPair.publicKey);

const urlSafeBase64PublicKey = btoa(
  String.fromCharCode(...new Uint8Array(rawPublicKey)),
)
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");

console.log("Public Key\n", urlSafeBase64PublicKey);

const jwt = await (new jose.SignJWT({ "a": "rw" }))
  .setProtectedHeader({ alg: "EdDSA", "typ": "JWT" })
  .setIssuedAt()
  .sign(keyPair.privateKey);

console.log("JWT\n", jwt);
