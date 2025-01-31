"use client";

import React from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const RSACipher = () => {
  const [displayValue, setDisplayValue] = React.useState("");
  const [value, setValue] = React.useState("");
  const [publicKey, setPublicKey] = React.useState({ n: 0, e: 0 });
  const [privateKey, setPrivateKey] = React.useState({ n: 0, d: 0 });

  // Helper functions
  const isPrime = (num: number): boolean => {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  };

  const gcd = (a: number, b: number): number => {
    return !b ? a : gcd(b, a % b);
  };

  const findCoprime = (phi: number): number => {
    for (let e = 3; e < phi; e += 2) {
      if (gcd(e, phi) === 1 && isPrime(e)) {
        return e;
      }
    }
    return 17; // fallback
  };

  const modPow = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
    if (modulus === BigInt(1)) return BigInt(0);
    let result = BigInt(1);
    base = base % modulus;
    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * base) % modulus;
      }
      base = (base * base) % modulus;
      exponent = exponent >> BigInt(1);
    }
    return result;
  };

  const generateKeys = () => {
    // Generate random prime numbers
    let p = 0,
      q = 0;
    while (!isPrime(p)) p = Math.floor(Math.random() * 100) + 50;
    while (!isPrime(q) || q === p) q = Math.floor(Math.random() * 100) + 50;

    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const e = findCoprime(phi);

    // Calculate d (modular multiplicative inverse)
    let d = 0;
    for (let i = 1; i < phi; i++) {
      if ((e * i) % phi === 1) {
        d = i;
        break;
      }
    }

    setPublicKey({ n, e });
    setPrivateKey({ n, d });
  };

  const encrypt = () => {
    if (!value) return;
    const encrypted = value.split("").map((char) => {
      const m = BigInt(char.charCodeAt(0));
      return modPow(m, BigInt(publicKey.e), BigInt(publicKey.n)).toString();
    });
    setDisplayValue(encrypted.join(","));
  };

  const decrypt = () => {
    if (!displayValue) return;
    const decrypted = displayValue.split(",").map((num) => {
      const c = modPow(BigInt(num), BigInt(privateKey.d), BigInt(privateKey.n));
      return String.fromCharCode(Number(c));
    });
    setDisplayValue(decrypted.join(""));
  };

  React.useEffect(() => {
    generateKeys();
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Textarea
          placeholder="Wiadomość..."
          className="col-span-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="space-y-2">
          <div className="text-sm">
            <p>
              Publiczny klucz (n,e): ({publicKey.n}, {publicKey.e})
            </p>
            <p>
              Prywatny klucz (n,d): ({privateKey.n}, {privateKey.d})
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={decrypt} variant="secondary">
              Odszyfruj
            </Button>
            <Button onClick={encrypt}>Szyfruj</Button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Wynik:</h2>
        <p className="break-all">{displayValue}</p>
      </div>
    </div>
  );
};

export default RSACipher;
