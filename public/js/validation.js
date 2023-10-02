import { readFile } from './readFile.js';
import { getPhoneNumbers } from './dataFromXLSRemove.js';
import { getTransformNumbers } from './dataFromXLSTransform.js';
import { downloadFile } from './downloadFileRemove.js';
import { downloadTransform } from './downloadFileTransform.js';
import { getCitiesByCountryCode } from './getCities.js';
import { updateCities } from './updateCities.js';
import { singleNumber } from './getNumberSingle.js';
import { getCheckedNumbers } from './dataFromXLSCheck.js';
import { downloadCheck } from './downloadFileCheck.js';
import { getFixedNumbers } from './dataFromXLSAddRemove.js';
import { downloadFix } from './downloadFileAddRemove.js';
import { balRequest } from './request.js';

const xlsxCDNs = [
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
  'https://unpkg.com/xlsx/dist/xlsx.full.min.js'
];

const excelJSCDNs = [
  'https://unpkg.com/exceljs/dist/exceljs.min.js',
  'https://cdn.jsdelivr.net/npm/exceljs/dist/exceljs.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js'
];

const select2CDNs = [
  'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js',
  'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js',
  'https://unpkg.com/select2@4.1.0-rc.0/dist/js/select2.min.js'
];


const loadScripts = (urls) => {
  return Promise.all(urls.map(url => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.async = true;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject();
      };
      document.head.appendChild(script);
    });
  }));
};

loadScripts([...xlsxCDNs, ...excelJSCDNs, ...select2CDNs])
  .then(() => {
    // можно использовать xlsx, exceljs и select2 в этой точке
    $(document).ready(function() {
      function formatCountry(country) {
        if (!country.id) {
          return country.text;
        }
        var $country = $(
          '<span class="flag-icon flag-icon-' + country.element.value.toLowerCase() + '"></span>' +
          '<span class="flag-text">' + country.text + '</span>'
        );
        return $country;
      };

      $('#countries-select').select2({
        templateResult: formatCountry
      });
      $('#cities-select').select2({});
    });
    console.log('All scripts loaded successfully.');    
  })
  .catch(() => {
    console.error('Failed to load one or more scripts.');
  });



//элементы для первого блока
const inputFile = document.getElementById('input-file-1');
const label = inputFile.nextElementSibling;
const submitBtn = document.getElementById('submit-btn-1');
const resultDiv = document.getElementById('result');
const errorModal = document.getElementById('error-modal');
const closeModal = document.getElementById('close');
const use_button = document.getElementById('how_to_use_1');
const useModal = document.getElementById('modal_use_1');
const closeUseModal = document.getElementById('close_use_1');
const example_button = document.getElementById('examples_1');
const exampleModal = document.getElementById('modal_example_1');
const closeExample = document.getElementById('close_example_1');
const about_button = document.getElementById('about_1');
const aboutModal = document.getElementById('modal_about_1');
const closeAbout = document.getElementById('close_about_1');

//элементы для второго блока
const inputFile2 = document.getElementById('input-file-2');
const label2 = inputFile2.nextElementSibling;
const submitBtn2 = document.getElementById('submit-btn-2');
const selectElement = document.getElementById("countries-select");
const errorSelect = document.getElementById('error-select');
const closeSelect = document.getElementById('closeSelect');
const groupTransform = document.getElementById('transform_group');
const singleTransform = document.getElementById('transform_single');
const additionalInfo = document.querySelectorAll('.additional_info');
const secondAdditionalElement = additionalInfo[1];
const selectContainer = document.getElementById('selector_container');
const selectCity = document.getElementById('cities-select');
const transformTitle = document.getElementById('result_transform_title');
const transformedNumber = document.getElementById('phone-number');
const errorNumber = document.getElementById('error-number');
const numberClose = document.getElementById('closeNumber');
const transformedNumberResult = document.getElementById('transformResult');
const use_button2 = document.getElementById('how_to_use_2');
const useModal2 = document.getElementById('modal_use_2');
const closeUseModal2 = document.getElementById('close_use_2');
const example_button2 = document.getElementById('examples_2');
const exampleModal2 = document.getElementById('modal_example_2');
const closeExample2 = document.getElementById('close_example_2');
const about_button2 = document.getElementById('about_2');
const aboutModal2 = document.getElementById('modal_about_2');
const closeAbout2 = document.getElementById('close_about_2');

//элементы для третьего блока
const use_button3 = document.getElementById('how_to_use_3');
const useModal3 = document.getElementById('modal_use_3');
const closeUseModal3 = document.getElementById('close_use_3');
const example_button3 = document.getElementById('examples_3');
const exampleModal3 = document.getElementById('modal_example_3');
const closeExample3 = document.getElementById('close_example_3');
const about_button3 = document.getElementById('about_3');
const aboutModal3 = document.getElementById('modal_about_3');
const closeAbout3 = document.getElementById('close_about_3');
const inputFile3 = document.getElementById('input-file-3');
const label3 = inputFile3.nextElementSibling;
const submitBtn3 = document.getElementById('submit-btn-3');


//элементы для четвёртого блока
const use_button4 = document.getElementById('how_to_use_4');
const useModal4 = document.getElementById('modal_use_4');
const closeUseModal4 = document.getElementById('close_use_4');
const example_button4 = document.getElementById('examples_4');
const exampleModal4 = document.getElementById('modal_example_4');
const closeExample4 = document.getElementById('close_example_4');
const about_button4 = document.getElementById('about_4');
const aboutModal4 = document.getElementById('modal_about_4');
const closeAbout4 = document.getElementById('close_about_4');
const inputFile4 = document.getElementById('input-file-4');
const label4 = inputFile4.nextElementSibling;
const submitBtn4 = document.getElementById('submit-btn-4');
const removeBtn = document.getElementById("remove");
const labelRemove = removeBtn.nextElementSibling;
const addBtn = document.getElementById("add");
const labelAdd = addBtn.nextElementSibling;
const removeInputs = document.querySelectorAll(".inputs_row_remove input[type='text']");
const addInputs = document.querySelectorAll(".inputs_row_add input[type='text']");
const errorAction = document.getElementById('error-action');
const closeAction = document.getElementById('closeAction');

const username = document.getElementById('username');
const balance = document.getElementById('balance');
const noFunds = document.getElementById('no-funds');
const closeNoFunds = document.getElementById('closeNoFunds');
const preloader = document.getElementById('preloaderContainer');


let fileUploaded = false;

//скрытие элементов по клику на свободное место
window.addEventListener('click', (event) => {
  if (event.target == errorModal) {
    errorModal.style.display = 'none';
  }
  if (event.target == useModal) {
    useModal.style.display = 'none';
  }
  if (event.target == exampleModal) {
    exampleModal.style.display = 'none';
  }
  if (event.target == aboutModal) {
    aboutModal.style.display = 'none';
  }
  if (event.target == errorSelect) {
    errorSelect.style.display = 'none';
  }
  if (event.target == errorNumber) {
    errorNumber.style.display = 'none';
  }
  if (event.target == useModal2) {
    useModal2.style.display = 'none';
  }
  if (event.target == exampleModal2) {
    exampleModal2.style.display = 'none';
  }
  if (event.target == aboutModal2) {
    aboutModal2.style.display = 'none';
  }
  if (event.target == useModal3) {
    useModal3.style.display = 'none';
  }
  if (event.target == exampleModal3) {
    exampleModal3.style.display = 'none';
  }
  if (event.target == aboutModal3) {
    aboutModal3.style.display = 'none';
  }
  if (event.target == useModal4) {
    useModal4.style.display = 'none';
  }
  if (event.target == exampleModal4) {
    exampleModal4.style.display = 'none';
  }
  if (event.target == aboutModal4) {
    aboutModal4.style.display = 'none';
  }
  if (event.target == errorAction) {
    errorAction.style.display = 'none';
  }
  if (event.target == noFunds) {
    noFunds.style.display = 'none';
  }
});

//функция для отображения/скрытия окон about, how to use, examples
function buttonTrigger(buttonElement, element, styleValue) {
  buttonElement.addEventListener('click', () => {
    element.style.display = styleValue;
  });
}

//отображение/скрытие элементов при клике
buttonTrigger(closeModal, errorModal, 'none');
buttonTrigger(about_button, aboutModal, 'flex');
buttonTrigger(closeAbout, aboutModal,'none');
buttonTrigger(use_button, useModal, 'flex');
buttonTrigger(closeUseModal, useModal, 'none');
buttonTrigger(example_button, exampleModal, 'flex');
buttonTrigger(closeExample, exampleModal, 'none');
buttonTrigger(closeSelect, errorSelect, 'none');
buttonTrigger(closeNumber, errorNumber, 'none');
buttonTrigger(about_button2, aboutModal2, 'flex');
buttonTrigger(closeAbout2, aboutModal2, 'none');
buttonTrigger(use_button2, useModal2, 'flex');
buttonTrigger(closeUseModal2, useModal2, 'none');
buttonTrigger(example_button2, exampleModal2, 'flex');
buttonTrigger(closeExample2, exampleModal2, 'none');
buttonTrigger(about_button3, aboutModal3, 'flex');
buttonTrigger(closeAbout3, aboutModal3, 'none');
buttonTrigger(use_button3, useModal3, 'flex');
buttonTrigger(closeUseModal3, useModal3, 'none');
buttonTrigger(example_button3, exampleModal3, 'flex');
buttonTrigger(closeExample3, exampleModal3, 'none');
buttonTrigger(about_button4, aboutModal4, 'flex');
buttonTrigger(closeAbout4, aboutModal4, 'none');
buttonTrigger(use_button4, useModal4, 'flex');
buttonTrigger(closeUseModal4, useModal4, 'none');
buttonTrigger(example_button4, exampleModal4, 'flex');
buttonTrigger(closeExample4, exampleModal4, 'none');
buttonTrigger(closeAction, errorAction, 'none');
buttonTrigger(closeNoFunds, noFunds, 'none');

labelRemove.addEventListener('click', () => {
    for (let i = 0; i < removeInputs.length; i++) {
      removeInputs[i].style.pointerEvents = 'all';
      removeInputs[i].style.backgroundColor = '#fff';
    }
    for (let i = 0; i < addInputs.length; i++) {
      addInputs[i].style.pointerEvents = 'none';
      addInputs[i].style.backgroundColor = '#e6e6e6';
      addInputs[i].value = '';
    }
    labelRemove.classList.add('activeAction');
    labelAdd.classList.remove('activeAction');
});

labelAdd.addEventListener('click', () => {
    for (let i = 0; i < addInputs.length; i++) {
      addInputs[i].style.pointerEvents = 'all';
      addInputs[i].style.backgroundColor = '#fff';
    }
    for (let i = 0; i < removeInputs.length; i++) {
      removeInputs[i].style.pointerEvents = 'none';
      removeInputs[i].style.backgroundColor = '#e6e6e6';
      removeInputs[i].value = '';
    }
    labelAdd.classList.add('activeAction');
    labelRemove.classList.remove('activeAction');
});


//функция для отображения файла на кнопке Select file
function filenameToLabel(label, inputFile) {
  const fileName = inputFile.value.split('\\').pop();
  if (fileName.length > 32) {
    const ext = fileName.substring(fileName.lastIndexOf('.'));
    const newFileName = fileName.substring(0, 29) + '..' + ext;
    label.setAttribute('data-file-name', newFileName);
  } else {
    label.setAttribute('data-file-name', fileName);
  }
  if (!label.getAttribute('data-file-name')) {
    label.setAttribute('data-file-name', 'Select the file');
  }
}

//смена названия на кнопке Select после выбора файла
inputFile.addEventListener('change', filenameToLabel.bind(null, label, inputFile));

//клик по кнопке Remove
submitBtn.addEventListener('click', async () => {
  if (fileUploaded) {
    return;
  }
  const file = inputFile.files[0];
  if (!file) {    
    errorModal.style.display = 'flex';
    return;
  }
  fileUploaded = true;
  preloader.style.display = 'block';
  try {
    const data = await readFile(file);
    const phoneNumbers = getPhoneNumbers(data);
    const user = username.textContent.trim();
    const length = phoneNumbers.length;
    const id = 1;
    const requestResult = await balRequest(id, length, user).catch(() => ({ success: false }));
    if (requestResult.success) {
      balance.innerHTML = `Balance: ${requestResult.balance}$`;
    }
    else {
      preloader.style.display = 'none';
      noFunds.style.display = 'flex';
      inputFile.value = '';
      fileUploaded = false;
      label.setAttribute('data-file-name', 'Select the file');
      return;
    }
    preloader.style.display = 'none';
    downloadFile(user, phoneNumbers);
    inputFile.value = '';
    fileUploaded = false;
    label.setAttribute('data-file-name', 'Select the file');
  } catch (error) {
    console.error(error);
  }
});

//переключение на групповую обработку файлов
groupTransform.addEventListener('click', () => {
  if(groupTransform.classList.contains('active')) {
    return;
  }
  else {
    singleTransform.classList.remove('active');
    groupTransform.classList.add('active');
    secondAdditionalElement.style.display = 'flex';
    label2.style.display = 'inline-block';
    selectContainer.style.display = 'none';
    transformTitle.style.display = 'none';
    transformedNumber.value = '';
    transformedNumber.style.display = 'none';
    transformedNumberResult.innerHTML = '';
    $(selectElement).val('').trigger('change');
    $(selectCity).val('').trigger('change');
  }
})

//переключение на одиночную обработку файлов
singleTransform.addEventListener('click', () => {
  if(singleTransform.classList.contains('active')) {
    return;
  }
  else {
    groupTransform.classList.remove('active');
    singleTransform.classList.add('active');
    secondAdditionalElement.style.display = 'none';
    label2.style.display = 'none';
    selectContainer.style.display = 'block';
    transformTitle.style.display = 'block';
    transformedNumber.style.display = 'block';
    $(selectElement).val('').trigger('change');
    $(selectCity).val('').trigger('change');
  }
})

//смена названия на кнопке Select после выбора файла
inputFile2.addEventListener('change', filenameToLabel.bind(null, label2, inputFile2));

//загрузка списка городов после выбора страны на вкладке одиночной обработки
$(selectElement).on('select2:select', async function(e) {
  let selected = e.params.data.id;
  if(singleTransform.classList.contains('active')) {
    const arr = await getCitiesByCountryCode(selected);
    updateCities(selectCity, arr);
  } 
});

//обработчик клика на кнопке Transform
submitBtn2.addEventListener('click', async () => {
  const selectedValue = selectElement.value;
  
  //одиночная обработка
  if(singleTransform.classList.contains('active')) {

    if(transformedNumber.value.trim() == '') {
       errorNumber.style.display = 'flex';
       return;
    }

    if(!selectedValue) {
      errorSelect.style.display = 'flex';
      return;
    }

    const num = transformedNumber.value;
    const city = selectCity.value;
    const user = username.textContent.trim();
    const length = 1;
    const id = 2;
    const requestResult = await balRequest(id, length, user).catch(() => ({ success: false }));
    if (requestResult.success) {
      balance.innerHTML = `Balance: ${requestResult.balance}$`;
    }
    else {
      noFunds.style.display = 'flex';
      return;
    }
    singleNumber(num, selectedValue, city, transformedNumberResult);
  }    
  
  //групповая обработка
  if(groupTransform.classList.contains('active')) {
    if (fileUploaded) {
      return;
    }

    const file = inputFile2.files[0];

    if (!file) {    
      errorModal.style.display = 'flex';
      return;
    }

    if(!selectedValue) {
      errorSelect.style.display = 'flex';
      return;
    }

    fileUploaded = true;
    preloader.style.display = 'block';

    try {
      const data = await readFile(file);
      const phoneNumbers = await getTransformNumbers(data, selectedValue);
      const user = username.textContent.trim();
      const length = phoneNumbers.length;
      const id = 2;
      const requestResult = await balRequest(id, length, user).catch(() => ({ success: false }));
      if (requestResult.success) {
        balance.innerHTML = `Balance: ${requestResult.balance}$`;
      }
      else {
        preloader.style.display = 'none';
        noFunds.style.display = 'flex';
        inputFile2.value = '';
        fileUploaded = false;
        $(selectElement).val('').trigger('change');
        label2.setAttribute('data-file-name', 'Select the file');
        return;
      }
      preloader.style.display = 'none';
      downloadTransform(user, selectedValue, phoneNumbers);
      inputFile2.value = '';
      fileUploaded = false;
      $(selectElement).val('').trigger('change');
      label2.setAttribute('data-file-name', 'Select the file');
    } catch (error) {
      console.error(error);
    }
  }
  
});


//смена названия на кнопке Select после выбора файла
inputFile3.addEventListener('change', filenameToLabel.bind(null, label3, inputFile3));

submitBtn3.addEventListener('click', async () => {

  if (fileUploaded) {
    return;
  }
  const file = inputFile3.files[0];
  if (!file) {    
    errorModal.style.display = 'flex';
    return;
  }
  fileUploaded = true;
  preloader.style.display = 'block';

  try {
    const data = await readFile(file);
    const phoneNumbers = await getCheckedNumbers(data);
    const user = username.textContent.trim();
    const length = phoneNumbers.length;
    const id = 3;
    const requestResult = await balRequest(id, length, user).catch(() => ({ success: false }));
    if (requestResult.success) {
      balance.innerHTML = `Balance: ${requestResult.balance}$`;
    }
    else {
      preloader.style.display = 'none';
      noFunds.style.display = 'flex';
      inputFile3.value = '';
      fileUploaded = false;
      label3.setAttribute('data-file-name', 'Select the file');
      return;
    }
    preloader.style.display = 'none';
    downloadCheck(user, phoneNumbers);
    inputFile3.value = '';
    fileUploaded = false;
    label3.setAttribute('data-file-name', 'Select the file');
  } catch (error) {
    console.error(error);
  }
});



//смена названия на кнопке Perform после выбора файла
inputFile4.addEventListener('change', filenameToLabel.bind(null, label4, inputFile4));

submitBtn4.addEventListener('click', async () => {

  if (fileUploaded) {
    return;
  }
  const file = inputFile4.files[0];
  if (!file) {    
    errorModal.style.display = 'flex';
    return;
  }
  if (!labelRemove.classList.contains('activeAction') && !labelAdd.classList.contains('activeAction')){
    errorAction.style.display = 'flex';
    return;
  }

  fileUploaded = true;
  preloader.style.display = 'block';

  const remove = labelRemove.classList.contains('activeAction') ? true : false;
  const add =  labelAdd.classList.contains('activeAction') ? true : false;

  let itemsForChange = [];
  if(remove) {
    for (let i = 0; i < removeInputs.length; i++) {
      const obj = {};
      if(removeInputs[i].value) {
        obj.value = removeInputs[i].value;
        obj.position = i;
        itemsForChange.push(obj);
      }
    }
  }
  if(add) {
    for (let i = 0; i < addInputs.length; i++) {
      const obj = {};
      if(addInputs[i].value) {
        obj.value = addInputs[i].value;
        obj.position = i;
        itemsForChange.push(obj);
      }
    }
  }

  let objToLoad = {
    arr: itemsForChange,
    remove: remove
  }

  try {
    const data = await readFile(file);
    const phoneNumbers = getFixedNumbers(data, objToLoad);
    const user = username.textContent.trim();
    const length = phoneNumbers.length;
    const id = 4;
    const requestResult = await balRequest(id, length, user).catch(() => ({ success: false }));
    if (requestResult.success) {
      balance.innerHTML = `Balance: ${requestResult.balance}$`;
    }
    else {
      preloader.style.display = 'none';
      noFunds.style.display = 'flex';
      inputFile4.value = '';
      fileUploaded = false;
      label4.setAttribute('data-file-name', 'Select the file');
      for (let i = 0; i < removeInputs.length; i++) {
        removeInputs[i].value = '';
        addInputs[i].value = '';
        addInputs[i].style.pointerEvents = 'none';
        addInputs[i].style.backgroundColor = '#e6e6e6';
        removeInputs[i].style.pointerEvents = 'none';
        removeInputs[i].style.backgroundColor = '#e6e6e6';
      }
      return;
    }
    preloader.style.display = 'none';
    downloadFix(user, phoneNumbers);
    inputFile4.value = '';
    fileUploaded = false;
    label4.setAttribute('data-file-name', 'Select the file');
    for (let i = 0; i < removeInputs.length; i++) {
      removeInputs[i].value = '';
      addInputs[i].value = '';
      addInputs[i].style.pointerEvents = 'none';
      addInputs[i].style.backgroundColor = '#e6e6e6';
      removeInputs[i].style.pointerEvents = 'none';
      removeInputs[i].style.backgroundColor = '#e6e6e6';
    }
  } catch (error) {
    console.error(error);
  }
});