export async function balRequest (id, length, user) {
	const formData = new FormData();
	formData.append('service_id', id);
	formData.append('items', length);
	formData.append('user', user);

	try {
	    const response = await fetch('process_numbers.php', {
	      method: 'POST',
	      body: formData
	    });
	    const result = await response.json();

	    // Действия при успешном обновлении баланса
	    if (result.success) {
	      const obj = {};
	      obj.success = result.success;
	      obj.balance = result.balance;
	      return obj;
	      // Действия при ошибке
	    } else {
	      const obj = {};
	      obj.success = result.success;
	      return obj;
	    }
	  } catch (error) {
	    console.error('Error:', error);
	    return { success: false };
	  }
}