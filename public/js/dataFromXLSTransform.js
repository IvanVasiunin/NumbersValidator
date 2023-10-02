  import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

  const phoneUtil = PhoneNumberUtil.getInstance();

  //функция получения объекта с кодами городов и их названий
  async function getCodes(countryCode) {
    const codes = {};
    const response = await fetch(`./txt/${countryCode}.txt`);
    const fileContent = await response.text();
    const lines = fileContent.trim().split('\n');
    lines.forEach((line) => {
      const [code, city] = line.split('|');
      codes[city] = code;
    });
    return codes;
  }

  //функция поиска телефонного кода по названию города
  function findPhoneCode(cityName, phoneData) {
    for (const [city, code] of Object.entries(phoneData)) {
      if (city.toLowerCase().includes(cityName.toLowerCase())) {
        return code;
      }
    }
    return null;
  }

  export async function getTransformNumbers(data, value) {
    //читаем данные из Excel файла
    const workbook = XLSX.read(data, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const phoneNumbers = [];

    //получаем список кодов городов по названию страны
    const fileCode = phoneUtil.getCountryCodeForRegion(value);
    const codes = await getCodes(fileCode);
    
    //проверяем каждую ячейку
    //в колонке А записываем изначальное значение в startNumber
    //значение без лшних символов записываем в fixedNumber
    //если в колонке Б есть город, пишем его в city, если нет то даём значение null
    Object.keys(worksheet).forEach((cell) => {
      const row = parseInt(cell.slice(1));
      if (cell.match(/^A\d+/) && worksheet[cell].v && row == 1) {
        const phoneNumber = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
        if (phoneNumber) {
          const obj = { startNumber: worksheet[cell].v, fixedNumber: phoneNumber || 'Invalid number', city: null };
          if (worksheet[`B${row}`] && worksheet[`B${row}`].v) {
            obj.city = worksheet[`B${row}`].v.toString();
          }
          phoneNumbers.push(obj);
        }
      }
      if (cell.match(/^A\d+/) && worksheet[cell].v && row > 1) {
        const phoneNumber = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
        const obj = { startNumber: worksheet[cell].v, fixedNumber: phoneNumber || 'Invalid number', city: null };
        if (worksheet[`B${row}`] && worksheet[`B${row}`].v) {
          obj.city = worksheet[`B${row}`].v.toString();
        }
        phoneNumbers.push(obj);
      }
    });
    

    //проходимся по массиву объектов
    //если в поле fixedNumber валидный номер, конвертируем его в е.164 и возвращаем
    //если номер невалидный, проверяем заполнен ли город
    //если заполнен, то подставляем код города к номеру и проеряем валидный ли номер
    //если валидный, возвращаем его, если нет - возвращаем Invalid number
    for (let j = 0; j < phoneNumbers.length; j++) {
      let fixed = phoneNumbers[j].fixedNumber;
      const city = phoneNumbers[j].city;

      try {
        const phoneNumber = phoneUtil.parseAndKeepRawInput(fixed, value);
        if (phoneUtil.isValidNumberForRegion(phoneNumber, value)) {
          const formattedNumber = phoneUtil.format(phoneNumber, PhoneNumberFormat.E164).replace(/^\+/, '');
          phoneNumbers[j].fixedNumber = formattedNumber;
        } else if(phoneNumbers[j].city){
          console.log(`code = ${findPhoneCode(city, codes)}`);
          fixed = findPhoneCode(city, codes) ? `${findPhoneCode(city, codes)}${fixed}` : 'Invalid number';
          const check = phoneUtil.parseAndKeepRawInput(fixed, value);
          if (phoneUtil.isValidNumberForRegion(check, value))
          {
            phoneNumbers[j].fixedNumber = fixed;
          } else {
            phoneNumbers[j].fixedNumber = 'Invalid number';
          }
        } else {
          phoneNumbers[j].fixedNumber = 'Invalid number';
        }
      } catch (error) {
        phoneNumbers[j].fixedNumber = 'Invalid number';
      }
    }
    return phoneNumbers;
  }
