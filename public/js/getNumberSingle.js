import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

//функция поиска телефонного кода по названию города
function findPhoneCode(cityName, phoneData) {
  for (const [code, city] of Object.entries(phoneData)) {
    if (city === cityName) {
      return code;
    }
  }
  return null;
}

export async function singleNumber(number, country, city, elem) {

  let result = '';
  const code = phoneUtil.getCountryCodeForRegion(country);

  //получаем данные из файла с телефонными кодами страны
  const response = await fetch(`./txt/${code}.txt`);
  const data = await response.text();

  //получаем коды городов, проверяем, чтобы они не повторялись
  const phoneData = data.split('\n').reduce((acc, line) => {
    const [phoneCode, city] = line.split('|');
    if (phoneCode && city && !acc[phoneCode]) {
      acc[phoneCode] = city;
    }
    return acc;
  }, {});

  //пробуем парсить номер в е.164, если успешно возвращаем номер
  //если не успешно подставляем код города к номеру и проверяем валидный ли он
  //возвращаем валидный номер или текст Invalid number
  try {
    const phoneNumber = phoneUtil.parseAndKeepRawInput(number, country);
    if (phoneUtil.isValidNumberForRegion(phoneNumber, country)) {
        const formattedNumber = phoneUtil.format(phoneNumber, PhoneNumberFormat.E164).replace(/^\+/, '');
        result = formattedNumber;
    } else if(city){
        number = number.toString().replace(/[^0-9]/g, '');
        number = findPhoneCode(city, phoneData) ? `${findPhoneCode(city, phoneData)}${number}` : 'Invalid number';
        const check = phoneUtil.parseAndKeepRawInput(number, country);
        if (phoneUtil.isValidNumberForRegion(check, country))
        {
          result = number;
        } else {
          result = 'Invalid number';
        }
      }
    else {
       result = 'Invalid number';
    } 
  } catch (error) {
     result = 'Invalid number';
   }

  elem.innerHTML = result;
}