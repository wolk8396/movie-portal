import { useEffect, useState } from "react";

export const usePaginatorUpdate = (totalPages:number, start:number = 2): {array: number[]} => {
  const [array, setArray] = useState<number[]>([]);

  useEffect(() => {
    if (totalPages === 2) {
      setArray([])
    };

    if (totalPages <= 13) {
      const array = [...Array.from({length: totalPages - start}, (_, i) => ( i + 2))]
      setArray(array);
    };

    if (totalPages > 13) {
      const array = [...Array.from({length: 9}, (_, i) => ( i + 2))];
      setArray(array);
    };

  }, [totalPages])


  return { array }
}