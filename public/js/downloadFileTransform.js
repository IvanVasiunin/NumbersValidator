export function downloadTransform(user, country, data) {
  // Создаем новую книгу Excel
  const newWorkbook = new ExcelJS.Workbook();
  const worksheetData = data.map(({ startNumber, city, fixedNumber }) => [
    startNumber || '',
    city || '', // Изменяем значение "valid" на "Valid"
    fixedNumber || ''
  ]);

  // Добавляем новый лист книги Excel
  const newWorksheet = newWorkbook.addWorksheet('Phone Numbers');
  newWorksheet.columns = [
    {
      header: 'Initial numbers',
      key: 'startNumber',
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
      width: 20,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'Transformed numbers',
      key: 'fixedNumber',
      width: 25,
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
    const val = row._cells[2]._value.value == 'Invalid number' ? true : false;
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
          color: { argb: '000000' },
          size: 12
        };
      });
    } else {
      row.eachCell((cell) => {
        if(val) {
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
      });
    }
  });


  // Готовим данные для скачивания
  const fileData = newWorkbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const fileName = `${user}_transformed_phone_numbers-${country}.xlsx`;
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  });
}