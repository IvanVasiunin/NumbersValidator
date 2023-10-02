//функция для обновления списка городов при переключении стран
export function updateCities(item, arr) {

  $(item).empty();
  if (arr.length === 0) {
    // добавить опцию "No city found"
    $(item).append($('<option>', {
      value: '',
      text: 'No city found'
    }));
  } else {
    // добавить опцию "Select the city"
    $(item).append($('<option>', {
      value: '',
      text: 'Select the city'
    }));
    // добавить каждый город в селект
    arr.forEach(function(city) {
      $(item).append($('<option>', {
        value: city,
        text: city
      }));
    });
  }
  // обновить селект с помощью метода Select2
  $(item).trigger('change.select2');
}