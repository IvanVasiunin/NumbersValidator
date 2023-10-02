export function downloadCheck(user, data) {
  // Создаем новую книгу Excel
  const newWorkbook = new ExcelJS.Workbook();
  const worksheetData = data.map(({ number, is_valid, type, country_name, city, carrier }) => [
    number || '',
    is_valid ? 'Valid' : 'Invalid', // Изменяем значение "valid" на "Valid"
    type || '',
    country_name || '',
    city || '',
    carrier || ''
  ]);

  // Добавляем новый лист книги Excel
  const newWorksheet = newWorkbook.addWorksheet('Phone Numbers');
  newWorksheet.columns = [
    {
      header: 'Number',
      key: 'number',
      width: 20,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'Is valid?',
      key: 'is_valid',
      width: 15,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'Type',
      key: 'type',
      width: 30,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'Country',
      key: 'country_name',
      width: 25,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'City',
      key: 'city',
      width: 30,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'Mobile operator',
      key: 'carrier',
      width: 35,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    }
  ];


  for (const rowData of worksheetData) {
    const row = newWorksheet.addRow(rowData);
  }

  newWorksheet.eachRow((row) => {
    const val = row._cells[1]._value.value == 'Valid' ? true : false;
    if (row.number === 1) {
      row.eachCell((cell) => {
        cell.border = { 
          top: { style: 'medium' }, 
          left: { style: 'medium' }, 
          bottom: { style: 'medium' }, 
          right: { style: 'medium' } 
        };
        cell.font = { 
          bold: true,
          size: 13
        };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'D1D1D1' }
        };
      });
    } else if(row.number === 2) {
      row.eachCell((cell) => {
        if(val) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E6FAE8' }
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCF0F0' }
          };
        }
        cell.border = { 
          top: { style: 'medium' }, 
          left: { style: 'thin' }, 
          bottom: { style: 'thin' }, 
          right: { style: 'thin' } 
        };
        cell.font = { 
          bold: false,
          size: 12
        };
        if(cell._column._number === 2 && cell._value.model.value == 'Valid') {
          cell.font = { 
            bold: true,
            color: { argb: '008000' } 
          };
        } else if (cell._column._number === 2) {
          cell.font = { 
            bold: true,
            color: { argb: 'FF0000' },
            size: 12
          };
        }

      });
    } else {
      row.eachCell((cell) => {
        if(val) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'E6FAE8' }
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FCF0F0' }
          };
        }
        cell.border = { 
          top: { style: 'thin' }, 
          left: { style: 'thin' }, 
          bottom: { style: 'thin' }, 
          right: { style: 'thin' } 
        };
        cell.font = { 
          bold: false, 
          color: { argb: '000000' },
          size: 12
        };
        if(cell._column._number === 2 && cell._value.model.value == 'Valid') {
          cell.font = { 
            bold: true,
            color: { argb: '008000' },
            size: 12
          };
        } else if (cell._column._number === 2) {
          cell.font = { 
            bold: true,
            color: { argb: 'FF0000' },
            size: 12
          };
        }
      });
    }
  });


  // Готовим данные для скачивания
  const fileData = newWorkbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const fileName = `${user}_checked_phone_numbers.xlsx`;
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  });
}