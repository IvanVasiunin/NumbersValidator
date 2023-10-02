//чтение данных из Excel файла, удаление лишних символов из номеров
export function getPhoneNumbers(data) {
  const workbook = XLSX.read(data, { type: 'binary' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const phoneNumbers = [];


  Object.keys(worksheet).forEach((cell) => {
      const row = parseInt(cell.slice(1));
      if (cell.match(/^A\d+/) && worksheet[cell].v && row == 1) {
        const phoneNumber = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
        if (phoneNumber) {
          const obj = { startNumber: worksheet[cell].v, fixedNumber: phoneNumber || 'Invalid number' };
          phoneNumbers.push(obj);
        }
      }
      if (cell.match(/^A\d+/) && worksheet[cell].v && row > 1) {
        const phoneNumber = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
        const obj = { startNumber: worksheet[cell].v, fixedNumber: phoneNumber || 'Invalid number' };
        phoneNumbers.push(obj);
      }
    });
  return phoneNumbers;
}