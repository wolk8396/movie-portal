export const usePaginatorUpdate = (array: number[], currentPage: number, total:number): number[] => {
  const penultimateValue: number = array[array.length -1];
    const firstValue: number = array.findIndex(index => currentPage === index);
    const checkLat = total === penultimateValue + 1;
    let char = 4;
    let previous = 4;
    let count = currentPage + 9;
    let countPrevious = currentPage - 4;
    let start = 5;

    if (total < count) {
      char = total - currentPage -1;
    };

    if (!countPrevious) {
      previous = currentPage - 2
    };

    if (currentPage === 1) {
      return [...Array.from({length: 9}, (_, i) => ( i + 2))];
    }

    if (currentPage === total) {
     return [...Array.from({length: 9}, (_, i) => ((total -1) - i))].reverse()
    };
 
    if (currentPage === penultimateValue && !checkLat) {
      array.splice(0, char);
      return [...array, ...Array.from({length: char}, (_, i) => (i + currentPage + 1))];
    };
  
    if (0 === firstValue && array[0] - 1 !== 1) {
      array.splice(start, previous);
      return [...Array.from({length: previous}, (_, i) => currentPage - (i + 1)).reverse(), ...array]
    };

    return [...array];
}