import VigenereCipher from "@/components/vigenere-cipher";
import React from "react";

const VigenerePage = () => {
  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-4">Szyfr Vigenère&apos;a</h1>
      <VigenereCipher />
    </div>
  );
};

export default VigenerePage;
