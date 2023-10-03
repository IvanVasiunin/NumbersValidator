# NumbersValidator
This is a web service for phone number checking and validation developed using the google-libphonenumber library. It consists of:

- User login page
- User interface page
- Administrator login page
- Administrator interface page

## User login page

<br>

![Изображение](https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/user_login.png)

## User interface page

<br>

![Изображение](https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/user_interface.png)

## Administrator login page

<br>

![Изображение](https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/admin_login.png)

## Administrator interface page

<br>

![Изображение](https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/admin_interface.png)

# Functionality

## Remove unnecessary symbols

Removes unnecessary symbols such as :+№#@"'$?*()-_/*, etc. Also removes letters and other characters, thus leaving only phone numbers.

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/remove_example.jpg" alt="Изображение">
</p>

## Transform numbers to e.164

Transforms numbers from other formats (International, National, RFC3966, etc) to E164 format.

Two types of transformation are available: group and single. The group transformation involves loading the data from an Excel file. For a single transformation, just enter the data in the appropriate tab in the browser.

### Group transformation with empty «City» column:

<br>

![Изображение](https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/transform_group_withoutCity_example.jpg)

### Group transformation with filled «City» column:

<br>

![Изображение](https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/transform_group_withCity_example.jpg)

### Single transformation with empty «City» field:

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/transform_single_withoutCity.jpg" alt="Изображение">
</p>

### Single transformation with filled «City» field:

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/transform_single_withCity.jpg" alt="Изображение">
</p>

## Check your numbers

Service performs the following checks:
- Valid number or not (checks the number length for a certain country and all possible numbering plans).

- The type of a phone number.

- The country to which phone number belongs.

- The city to which the phone number belongs (only for fixed numbers).

- The mobile operator to which the number belongs (only for mobile numbers).

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/check_example.jpg" alt="Изображение">
</p>

## Add/replace symbols

Adds and removes symbols and numbers from the required positions.

### Adding symbols

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/add_exmpl.jpg" alt="Изображение">
</p>

### Removing symbols

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/remove_exmpl.jpg" alt="Изображение">
</p>

# Administrator options

## Changing the password

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/password_changing.png" alt="Изображение">
</p>

<br>

## Changing the balance

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/balance_changing.png" alt="Изображение">
</p>

<br>

## Adding new user

<br>

<p align="center">
  <img src="https://github.com/IvanVasiunin/NumbersValidator/blob/main/public/img/adding_user.png" alt="Изображение">
</p>

<br>

# For Developers

This project is developed with <a href="https://github.com/google/libphonenumber">Google Libphonenumber</a>

## Copy of project

- Clone the project to your computer
- Install all dependencies with: <code>npm i</code>
- To start your project, use the command: <code>npm start</code>
