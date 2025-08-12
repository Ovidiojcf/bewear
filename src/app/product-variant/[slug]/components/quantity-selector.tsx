"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade</h3>
      <div className="flex w-[120px] items-center justify-between rounded-lg border">
        <Button onClick={handleDecrement} size="icon" variant="ghost">
          <MinusIcon></MinusIcon>
        </Button>
        <p className="text-lg font-medium">{quantity}</p>
        <Button onClick={handleIncrement} size="icon" variant="ghost">
          <PlusIcon></PlusIcon>
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
