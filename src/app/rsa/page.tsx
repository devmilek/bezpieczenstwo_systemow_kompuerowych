import RSACipher from "@/components/rsa-cipher";
import React from "react";

const RsaPage = () => {
  return (
    <div className="my-10">
      <h1 className="text-4xl font-bold mb-8">Szyfr RSA</h1>
      <RSACipher />
    </div>
  );
};

export default RsaPage;
