  	import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumberType } from 'google-libphonenumber';
  	import _ from 'lodash';
  	import countries from './countries.js';

  	const phoneUtil = PhoneNumberUtil.getInstance();

  	function findByCode(phoneNumber, phoneData) {
	  let code = phoneNumber;
	  for (let i = phoneNumber.length; i > 0; i--) {
	    code = code.slice(0, code.length-1);
	    if (phoneData[code]) {
	      return phoneData[code];
	    }
	  }
	  return null;
	}


	export async function getCheckedNumbers(data) {
    	const workbook = XLSX.read(data, { type: 'binary' });
    	const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    	const phoneNumbers = [];

    	//для каждой ячейки из столбца А создаём объект
    	//с полями начальным номер, номер в е.164, название, код, iso страны
		Object.keys(worksheet).forEach((cell) => {
			const row = parseInt(cell.slice(1));
			if (cell.match(/^A\d+/) && worksheet[cell].v && row === 1) {
				const phoneNumber = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
				if (!phoneNumber) {
					return;
				}
			}
			if (cell.match(/^A\d+/) && worksheet[cell].v) {
				const phoneNumber = worksheet[cell].v.toString().startsWith('+') ? worksheet[cell].v : `+${worksheet[cell].v}`;
				const phoneInfo = {
					number: worksheet[cell].v.toString().startsWith('+') ? worksheet[cell].v.toString().slice(1) : worksheet[cell].v.toString(),
					e164: phoneNumber,
					country_code: '',
					country_iso: '',
					country_name: '',
					is_valid: false
				};
				try {
					const parsedNumber = phoneUtil.parse(phoneNumber);
					const regionCode = phoneUtil.getRegionCodeForNumber(parsedNumber);
					const countryCode = phoneUtil.getCountryCodeForRegion(regionCode);
					if (phoneUtil.isValidNumberForRegion(parsedNumber, regionCode)) {
						const countryObj = countries.find(country => country.iso === regionCode);
				  		const countryName = countryObj ? countryObj.name : '';
				  		phoneInfo.country_code = countryCode;
				  		phoneInfo.country_iso = regionCode;
				  		phoneInfo.country_name = countryName;
				  		phoneInfo.is_valid = true;
					}
					phoneNumbers.push(phoneInfo);
				} catch (err) {
					phoneNumbers.push(phoneInfo);
				}
			}
		});

		const uniqueCountryCodes = [...new Set(phoneNumbers.map(info => info.country_code).filter(Boolean))];

		const codeToCarrier = {};
		const codeToCity = {};

		async function getAllCarriers(uniqueCountryCodes) {
		  for (const countryCode of uniqueCountryCodes) {
		    const response = await fetch(`./txt/carrier/${countryCode}.txt`);
		    const fileContent = await response.text();
		    const lines = fileContent.trim().split('\n');

		    lines.forEach((line) => {
		      const [code, carrier] = line.trim().split('|');
		      if (code && carrier) {
		        codeToCarrier[code] = carrier;
		      }
		    });
		  }
		}

		async function getAllCities(uniqueCountryCodes) {
		  for (const countryCode of uniqueCountryCodes) {
		    const response = await fetch(`./txt/${countryCode}.txt`);
		    const fileContent = await response.text();
		    const lines = fileContent.trim().split('\n');

		    lines.forEach((line) => {
		      const [code, city] = line.trim().split('|');
		      if (code && city) {
		        codeToCity[code] = city;
		      }
		    });
		  }
		}

		async function processCarrierCodes(uniqueCountryCodes) {
		  await getAllCarriers(uniqueCountryCodes);
		}

		async function processCityCodes(uniqueCountryCodes) {
		  await getAllCities(uniqueCountryCodes);
		}

		await processCarrierCodes(uniqueCountryCodes);
		await processCityCodes(uniqueCountryCodes);


		phoneNumbers.forEach((item) => {
			if(item.is_valid) {
				const iso = item.country_iso;
				const number = item.e164;
				const phoneNumber = phoneUtil.parseAndKeepRawInput(number, iso);
				const numberType = phoneUtil.getNumberType(phoneNumber);
				item.type = _.findKey(PhoneNumberType, (value) => value === numberType);
				if(numberType === 1 || numberType === 2) {
					item.carrier = findByCode(item.number, codeToCarrier);
				}
				else {
					item.carrier = null;
				}
				if(numberType === 0 || numberType === 2) {
					item.city = findByCode(item.number, codeToCity);
				}
				else {
					item.city = null;
				}
			}
			
		});
		return phoneNumbers;

	}