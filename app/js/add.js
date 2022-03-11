const addForm = document.querySelector('#addForm');
const cancelBtn = document.querySelector('.cancel-button');
// const saveBtn = document.querySelector('.save-button');
let numbersContainer = document.querySelector('.numbers-container');
let contactList = [];
let contact = {};
let img;

function jsonContact(fullname, email, img, numbers = []) {
  this.fullname = fullname;
  this.email = email;
  this.favorite = false;
  this.numbers = numbers;
  this.image = img;
}

function addContactToList() {
  contact = new jsonContact(fullname.value, email.value, img, []);
  for (i = 0; i <= 4; i++) {
    let newNo = document.querySelector(`input[name='number${i}']`);
    let newCell = document.querySelector(`input[name='cell${i}']`);
    let newNumber;
    if (newNo && newCell && newNo.value !== '' && newCell.value !== '') {
      newNumber = {
        number: newNo.value,
        cell: newCell.value,
      };
      // let saveData = JSON.stringify(newNumber);
      contact.numbers.push(newNumber);
    }
  }
  !localStorage['contactList']
    ? addContactToNewList(contact)
    : addContactToExistingList(contact);
}

function addContactToNewList(contact) {
  contactList.unshift(contact);
  localStorage.setItem('contactList', JSON.stringify(contactList));
  window.location.assign('../../index.html');
}

function addContactToExistingList(contact) {
  contactList = JSON.parse(localStorage.getItem('contactList'));
  contactList.unshift(contact);
  localStorage.setItem('contactList', JSON.stringify(contactList));
  window.location.assign('../../index.html');
}

const displayNumberBox = () => {
  const htmlNumberBox = `<div class="number-box flex">
                              <input type="text" id="number0" name="number0" placeholder="Number" class="input-bar" />
                              <input type="text" name="cell0" id="cell0" placeholder="Cell" class="source-number" />
                              <div class="remove-number-circle flex">
                                  <div class="remove-number-icon">
                                  </div>
                              </div>
                         </div>`;
  const htmlAddNumber = `<div class="add-number-container">
                              <div class="add-number-circle flex">
                                  <div class="add-number-icon"></div>
                              </div>
                              <div class=">
                                  <h4 class="add-number-text">Add number</h4>
                              </div>
                              <div class="err-msg "></div>
                        </div>`;
  numbersContainer.innerHTML += htmlNumberBox;
  numbersContainer.innerHTML += htmlAddNumber;
};
displayNumberBox();

function createNewNumberBox(i) {
  const noBox = document.createElement('div');
  noBox.className = 'number-box flex';
  const inputNo = document.createElement('input');
  inputNo.className = 'input-bar';
  inputNo.type = 'number';
  inputNo.name = `number${i}`;
  inputNo.placeholder = `Number`;
  inputNo.id = `number${i}`;
  const inputCell = document.createElement('input');
  inputCell.type = 'text';
  inputCell.className = 'source-number';
  inputCell.name = `cell${i}`;
  inputCell.placeholder = `Cell`;
  inputCell.id = `cell${i}`;
  let removeBtn = document.createElement('div');
  removeBtn.className = 'remove-number-circle flex';
  const removeIcon = document.createElement('div');
  removeIcon.className = 'remove-number-icon';
  removeBtn.append(removeIcon);
  noBox.append(inputNo);
  noBox.append(inputCell);
  noBox.append(removeBtn);
  const addNumberCtn = document.querySelector('.add-number-container');
  addNumberCtn.remove();
  numbersContainer.append(noBox);
  numbersContainer.append(addNumberCtn);
}

function activateRemoveBtnsListeners() {
  let removeBtns = document.querySelectorAll('.remove-number-circle');
  let lastEl = removeBtns.length - 1;
  for (let i in removeBtns) {
    if (removeBtns[i].tagName === 'DIV') {
      removeBtns[i].addEventListener('click', () => {
        if (removeBtns[i] === removeBtns[lastEl])
          if (removeBtns[i].parentElement.children[0].name === 'number0') {
            removeBtns[i].parentElement.children[0].value = null;
            removeBtns[i].parentElement.children[1].value = null;
            return;
          } else if (
            removeBtns[lastEl].parentElement.children[0].value ||
            removeBtns[lastEl].parentElement.children[0].value
          ) {
            removeBtns[lastEl].parentElement.children[0].value = null;
            removeBtns[lastEl].parentElement.children[1].value = null;
          } else removeBtns[lastEl].parentElement.remove();
      });
    }
  }
}

function activateAddNoBtns() {
  const addNumberBtn = document.querySelector('.add-number-circle');
  let i = 0;
  addNumberBtn.addEventListener('click', (e) => {
    let prevNumValue, prevCellValue;
    if (e.path[2].className === 'numbers-container') {
      i = e.path[3].children[1].children.length - 2;
      prevNumValue = e.path[3].children[1].children[i].children[0].value;
      prevCellValue = e.path[3].children[1].children[i].children[1].value;
    }
    if (e.path[3].className === 'numbers-container') {
      i = e.path[4].children[1].children.length - 2;
      prevNumValue = e.path[4].children[1].children[i].children[0].value;
      prevCellValue = e.path[4].children[1].children[i].children[1].value;
    }
    if (prevNumValue) if (validatePhoneNumber() === false) return;

    if (!prevCellValue) return;
    if (i >= 4) {
      i = e.path[3].children[1].children.length - 2;
      return;
    }
    i++;
    createNewNumberBox(i);
    activateRemoveBtnsListeners();
  });
}
activateAddNoBtns();
activateRemoveBtnsListeners();

function clickUploadImgEl() {
  const imgFile = document.querySelector('.add-circle');
  imgFile.addEventListener('click', () => {
    document.getElementById('upfile').click();
  });
}
clickUploadImgEl();

let inputProfileImage = () => {
  let uploadCircle = document.querySelector('.add-circle');
  let profileImg;
  document.querySelector('#upfile').addEventListener('change', function (e) {
    const reader = new FileReader();
    // console.log(reader.data);
    reader.addEventListener('load', () => {
      console.log(reader);
      img = reader.result;
      if (profileImg === undefined) profileImg = new Image();
      profileImg.src = img;
      profileImg.className = 'uploaded-image';
      uploadCircle.append(profileImg);
    });
    reader.readAsDataURL(this.files[0]);
  });
};
inputProfileImage();

const loadContacts = () => {
  try {
    if (!localStorage['contactList']) localStorage.setItem('contactList', '');
    else contactList = JSON.parse(localStorage['contactList']);
  } catch (err) {
    console.error(err);
  }
};
loadContacts();

const setError = (element, message) => {
  if (element) {
    const inputBar = element.parentElement;
    const errDisplay = inputBar.querySelector('.err-msg');
    errDisplay.innerText = message;
    errDisplay.classList.add('error');
    errDisplay.classList.remove('success');
    return false;
  }
};

const setSucces = (element) => {
  if (element) {
    const inputBar = element.parentElement;
    const errDisplay = inputBar.querySelector('.err-msg');
    errDisplay.innerHTML = '';
    errDisplay.classList.add('success');
    errDisplay.classList.remove('error');
    return true;
  }
};

const checkIfFullnameExists = (fullname) => {
  for (let i in contactList)
    if (contactList[i].fullname.toLowerCase() === fullname.toLowerCase())
      return true;
};

const checkIfEmailExists = (email) => {
  for (let i in contactList)
    if (contactList[i].email.toLowerCase() === email.toLowerCase()) return true;
};

const isValidFullName = (fullname) => {
  const reg = /^([\w]{2,})+\s+([\w\s]{2,})+$/i;
  return reg.test(fullname);
};

const isValidEmail = (email) => {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
};

const isValidNumber = (number) => {
  const reg = /^(?=.*\d)[\d ]+$/;
  return reg.test(number);
};

const validatePhoneNumber = () => {
  const addNo = document.querySelector('.add-number-container');

  let contactNo;
  for (i = 0; i < 5; i++) {
    contactNo = document.querySelector(`#number${i}`);
    if (!contactNo.value) return;
    if (contactNo.value.length < 11) {
      setError(
        addNo,
        'Please include country and city in the number (example: 385 21 021 021 38598887777).'
      );
      return false;
    } else if (!isValidNumber(contactNo.value)) {
      setError(
        addNo,
        'Please input correct phone format (example: 385 21 021 021 38598887777).'
      );
      return false;
    } else {
      setSucces();
      return true;
    }
  }
};

const validateEmail = () => {
  const email = document.querySelector('#email');
  if (email.value)
    if (!isValidEmail(email.value)) {
      setError(email, 'Please input correct e-mail address.');
      return false;
    } else if (checkIfEmailExists(email.value)) {
      setError(email, 'This e-mail already exists in the contact list.');
      return false;
    } else {
      setSucces();
      return true;
    }
};

const validateFullName = () => {
  const fullName = document.querySelector('#fullname');
  if (fullName.value === '') {
    setError(fullName, 'Full name is required.');
    return false;
  } else if (!isValidFullName(fullName.value)) {
    setError(fullName, 'Please input correct first name and last name.');
    return false;
  } else if (checkIfFullnameExists(fullName.value)) {
    setError(fullName, 'This contact already exists in the contact list.');
    return false;
  } else {
    setSucces();
    setError(email, null);
    return true;
  }
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateFullName()) {
    if (validateEmail() === false) return;
    if (validatePhoneNumber() === false) return;
    addContactToList();
  }
});
