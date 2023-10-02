import { PhoneNumberUtil } from 'google-libphonenumber';

export async function getCitiesByCountryCode(countryCode) {
  // Получаем экземпляр PhoneNumberUtil
  const phoneUtil = PhoneNumberUtil.getInstance();

  // Получаем код страны
  const country = phoneUtil.getCountryCodeForRegion(countryCode);

  try {
    // Получаем данные из файла
    const response = await fetch(`./txt/${country}.txt`);
    if (!response.ok) {
      return [];
    }
    const data = await response.text();
    if(!data) {
      return [];
    }

    // Разделяем данные на массив строк
    const lines = data.split('\n');

    // Получаем только названия городов, удаляем повторяющиеся значения и сортируем по алфавиту
    const cities = lines
      .map((line) => {
        const parts = line.split('|');
        return parts[1];
      })
      .filter((city, index, array) => array.indexOf(city) === index)
      .sort();

    // Возвращаем массив названий городов
    return cities;
  } catch (error) {
    return [];
  }
}
