import PlayfairCipher from "@/components/playfair-cipher";
import React from "react";

const PlayfairPage = () => {
  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold mb-4">Szyfr Playfair</h1>
      <PlayfairCipher />
    </div>
  );
};

export default PlayfairPage;
