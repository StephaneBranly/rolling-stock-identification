const UICCheckSum = {
  // Checksum for the UIC
  calculateChecksum: (uic: string) => {
    const uicArray = uic.split("");
    let sum = 0;
    for (let i = 0; i < uicArray.length; i++) {
      sum += parseInt(uicArray[i]);
    }
    return sum % 10;
  },
};
export default UICCheckSum;
