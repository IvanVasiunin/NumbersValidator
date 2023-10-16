const changePasswordBtns = document.querySelectorAll('.change-password-btn');
const changeBalanceBtns = document.querySelectorAll('.change-balance-btn');

function updatePassword(user, newPassword, passwordDiv, saveBtn, changeBtn, passwordInput) {
  // Update the password in the array
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'update_pswrd.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Handle the response from the server
      const response = JSON.parse(xhr.responseText);

      if (response.success) {
        console.log('Password updated successfully');
      } else {
        console.error('Failed to update password:', response.error);
      }
    } else {
      console.error('Failed to update password:', xhr.statusText);
    }
  };
  xhr.send(`user=${encodeURIComponent(user)}&password=${encodeURIComponent(newPassword)}`);

  passwordInput.replaceWith(passwordDiv);
  passwordDiv.textContent = newPassword;
  saveBtn.remove();
  changeBtn.style.display = 'block';
}

function updateBalance(user, newBalance, balanceDiv, saveBtn, changeBtn, balanceInput) {
  // Update the balance in the array
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'update_balance.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Handle the response from the server
      const response = JSON.parse(xhr.responseText);

      if (response.success) {
        console.log('Balance updated successfully');
      } else {
        console.error('Failed to update balance:', response.error);
      }
    } else {
      console.error('Failed to update balance:', xhr.statusText);
    }
  };
  xhr.send(`user=${encodeURIComponent(user)}&balance=${encodeURIComponent(newBalance)}`);

  balanceInput.replaceWith(balanceDiv);
  balanceDiv.textContent = newBalance;
  saveBtn.remove();
  changeBtn.style.display = 'block';
}

function cancelEdit(input, div, saveBtn, changeBtn, initialData) {
  input.replaceWith(div);
  div.textContent = initialData;
  saveBtn.remove();
  changeBtn.style.display = 'block';
}

changePasswordBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const user = btn.dataset.user;
    const passwordDiv = btn.parentNode.querySelector('.user-password');

    // Replace the password div with an input element
    const passwordInput = document.createElement('input');
    passwordInput.type = 'text';
    passwordInput.value = passwordDiv.textContent;
    passwordInput.classList.add('password-input');
    passwordDiv.replaceWith(passwordInput);

    // Create and display "Save" button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('save-btn');
    btn.parentNode.appendChild(saveBtn);
    btn.style.display = 'none';

    // Add event listener to "Save" button
    saveBtn.addEventListener('click', () => {
      const newPassword = passwordInput.value;
      updatePassword(user, newPassword, passwordDiv, saveBtn, btn, passwordInput);
    });

    // Add event listener to "Enter" key press
    passwordInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const newPassword = passwordInput.value;
        updatePassword(user, newPassword, passwordDiv, saveBtn, btn, passwordInput);
      }
    });

    // Add event listener to "Esc" key press
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        cancelEdit(passwordInput, passwordDiv, saveBtn, btn, passwordDiv.textContent);
      }
    });
  });
});

changeBalanceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const user = btn.dataset.user;
    const balanceDiv = btn.parentNode.querySelector('.user-balance');

    // Swap password div with input element
    const balanceInput = document.createElement('input');
    balanceInput.type = 'text';
    balanceInput.value = balanceDiv.textContent;
    balanceInput.classList.add('balance-input');
    balanceDiv.replaceWith(balanceInput);

    // Create and show "Save" 
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('save-btn');
    btn.parentNode.appendChild(saveBtn);
    btn.style.display = 'none';

    // Clicking on "Save" 
    saveBtn.addEventListener('click', () => {
      const newBalance = balanceInput.value;
      updateBalance(user, newBalance, balanceDiv, saveBtn, btn, balanceInput);
    });

    // Clicking on Enter" 
    balanceInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        const newBalance = balanceInput.value;
        updateBalance(user, newBalance, balanceDiv, saveBtn, btn, balanceInput);
      }
    });

    // Clicking on "Esc" 
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        cancelEdit(balanceInput, balanceDiv, saveBtn, btn, balanceDiv.textContent);
      }
    });
  });
});


const newUserModal = document.getElementById('new_user_modal');
const newUserButton = document.getElementById('new_user');
const newUserClose = document.getElementById('closeNewUser');

window.addEventListener('click', (event) => {
  if (event.target == newUserModal) {
    newUserModal.style.display = 'none';
  }
});

newUserClose.addEventListener('click', () => {
	newUserModal.style.display = 'none';
});

newUserButton.addEventListener('click', () => {
	newUserModal.style.display = 'flex';
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // отменяем отправку формы по умолчанию

    let form = event.target;
    let xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.onload = function() {
        if (xhr.status === 200) { // success
            let response = JSON.parse(xhr.responseText);
            if (response.success) { // user has been added
                console.log('User added!');
                window.location.reload(); // refresh page
            } else { // error
                console.log('Error: ' + response.error);
            }
        } else { // server connection error
            console.log('Server error');
        }
    };
    xhr.send(new FormData(form)); // sending data to server
});
