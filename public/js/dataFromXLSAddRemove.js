export function getFixedNumbers(data, obj) {
    const workbook = XLSX.read(data, { type: 'binary' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const phoneNumbers = [];
    const actionRemove = obj.remove;
    const itemsForChange = obj.arr;

    if(actionRemove) {
    	Object.keys(worksheet).forEach((cell) => {
    		const row = parseInt(cell.slice(1));
	    	if (cell.match(/^A\d+/) && worksheet[cell].v) {
	    		if(row === 1) {
	    			const check = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
	    			if(!check) {
	    				return;
	    			}
	    		}
	    		const obj = {};
	    		obj.startNumber = worksheet[cell].v.toString();
	    		let removed = 0;
	    		let cellData = worksheet[cell].v.toString();
	    		for (let item of itemsForChange) {
	    			if(cellData[item.position-removed] == item.value) {
	    				cellData = cellData.slice(0, item.position-removed)+cellData.slice(item.position-removed+1);
	    				removed++;
	    			}
	    		}
	    		obj.fixedNumber = cellData;
	    		phoneNumbers.push(obj);
	    	}
	    });
    } else {
    	Object.keys(worksheet).forEach((cell) => {
    		const row = parseInt(cell.slice(1));
	    	if (cell.match(/^A\d+/) && worksheet[cell].v) {
	    		if(row === 1) {
	    			const check = worksheet[cell].v.toString().replace(/[^0-9]/g, '');
	    			if(!check) {
	    				return;
	    			}
	    		}
	    		const obj = {};
	    		obj.startNumber = worksheet[cell].v.toString();
	    		let cellData = worksheet[cell].v.toString();
	    		for (let item of itemsForChange) {
	    			let array = cellData.split('');
	    			array.splice(item.position, 0, item.value);
	    			cellData = array.join('');
	    		}
	    		obj.fixedNumber = cellData;
	    		phoneNumbers.push(obj);
	    	}
	    });
    }    
    return phoneNumbers;
}