// window.onload = function () {
// Buttons
const backBtn = document.querySelector('.arrow-back-icon');
const removeNumberBtn = document.querySelector('.remove-number-circle');
const addNumberBtn = document.querySelector('.add-number-circle');
const cancelBtn = document.querySelector('.cancel-button');
const saveBtn = document.querySelector('.save-button');
//Form fields
const fullname = document.querySelector('#fullname');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const cell = document.querySelector('#cell');
let contactList = [];

saveBtn.addEventListener('click', addContactToList);

function jsonContact(fullname, email, number, cell) {
  // this.img = img;
  this.fullname = fullname;
  this.email = email;
  this.number = number;
  this.cell = cell;
  this.favorite = false;
}

function addContactToList() {
  let objContact = new jsonContact(
    fullname.value,
    email.value,
    number.value,
    cell.value
  );

  console.log(objContact);

  if (
    objContact.fullname !== null &&
    objContact.fullname !== '' &&
    objContact.email !== null &&
    objContact.email !== '' &&
    objContact.number !== null &&
    objContact.number !== '' &&
    objContact.cell !== null &&
    objContact.cell !== ''
  ) {
    if (localStorage['contactList'] === undefined) {
      contactList.push(objContact);
      localStorage.setItem('contactList', JSON.stringify(contactList));
    } else {
      contactList = JSON.parse(localStorage.getItem('contactList'));
      contactList.push(objContact);
      localStorage.setItem('contactList', JSON.stringify(contactList));
    }
  }
}
// };
function validateForm() {
  let fullname = document.forms['addForm']['fullname'].value;
  let email = document.forms['addForm']['email'].value;
  let number = document.forms['addForm']['number'].value;
  let cell = document.forms['addForm']['cell'].value;

  if (fullname === null || fullname === '') {
    alert(
      'Full name must at least 2 words - min 5 chars long (with whitespace).'
    );
    return false;
  }
  if (email === null || email === '') {
    alert('Email filed is required.');
    return false;
  }
  if ((number === null || number === '') && number !== typeof Number) {
    alert(
      'Contact number filed is required - min 11 chars (use numbers only and include country and city code).'
    );
    return false;
  }
  if (cell === null || cell === '') {
    alert('Cell type filed is required (mobile, home, office, etc).');
    return false;
  }
}
