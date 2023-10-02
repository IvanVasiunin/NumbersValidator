export function downloadFile(user, data) {
  // Создаем новую книгу Excel
  const newWorkbook = new ExcelJS.Workbook();
  const worksheetData = data.map(({ startNumber, fixedNumber }) => [
    startNumber || '',
    fixedNumber || ''
  ]);

  const newWorksheet = newWorkbook.addWorksheet('Phone Numbers');

  newWorksheet.columns = [
    {
      header: 'Initial Number',
      key: 'startNumber',
      width: 30,
      style: {
        alignment: { horizontal: 'center' },
        font: { 
          bold: true
        },
      }
    },
    {
      header: 'Fixed number',
      key: 'fixedNumber',
      width: 30,
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
      });
    } else {
      row.eachCell((cell) => {
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

  const fileData = newWorkbook.xlsx.writeBuffer().then(buffer => {
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const fileName = `${user}_validated_phone_numbers.xlsx`;
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
  });
}