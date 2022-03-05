const cancelBtn = document.querySelector('.cancel-button');
const saveBtn = document.querySelector('.save-button');
let numbersContainer = document.querySelector('.numbers-container');
let contactList = [];
let contact = {};
let img;

function jsonContact(fullname, email, img, numbers = [4]) {
  this.fullname = fullname;
  this.email = email;
  this.favorite = false;
  this.numbers = numbers;
  this.image = img;
}

function addContactToList() {
  contact = new jsonContact(fullname.value, email.value, img, []);
  console.log(img);
  for (i = 1; i <= 4; i++) {
    let newNo = document.querySelector(`input[name='number${i}']`);
    let newCell = document.querySelector(`input[name='cell${i}']`);
    let newNumber;
    if (newNo !== null && !newCell !== null) {
      newNumber = {
        number: newNo.value,
        cell: newCell.value,
      };
    }
    let saveData = JSON.stringify(newNumber);
    contact.numbers.push(saveData);
  }

  console.log(contact);
  if (validateForm(contact) === false) return;
  !localStorage['contactList']
    ? addContactToNewList(contact)
    : addContactToExistingList(contact);
}

function addContactToNewList(contact) {
  // console.log(contact);
  contactList.push(contact);
  localStorage.setItem('contactList', JSON.stringify(contactList));
}

function addContactToExistingList(contact) {
  if (!checkIfFullnameExists(contact)) {
    contactList = JSON.parse(localStorage.getItem('contactList'));
    contactList.push(contact);
    localStorage.setItem('contactList', JSON.stringify(contactList));
  } else alert('Full name already exists in Contact list.');
}

function checkIfFullnameExists(contact) {
  for (let i in contactList) {
    if (
      contactList[i].fullname.toLowerCase() === contact.fullname.toLowerCase()
    )
      return true;
  }
}

const displayNumberBox = (e) => {
  const htmlNumberBox = `<div class="number-box flex">
                              <input type="number" id="number1" name="number1" placeholder="Number" class="input-bar"
                                  type="tel" pattern="[0-9]{6,}" />
                              <input type="text" name="cell1" id="cell1" placeholder="Cell" class="source-number" />
                              <div class="remove-number-circle flex">
                                  <div class="remove-number-icon">
                                  </div>
                              </div>
                          </div>'`;
  const htmlAddNumber = `<div class="add-number-container">
                              <div class="add-number-circle flex">
                                  <div class="add-number-icon"></div>
                              </div>
                              <div class=">
                                  <h4 class="add-number-text">Add number</h4>
                              </div>
                          </div>`;
  numbersContainer.innerHTML += htmlNumberBox;
  numbersContainer.innerHTML += htmlAddNumber;
  // console.log(addNumberBtn);
};
displayNumberBox();

function createNewNumberBox(i) {
  console.log(i);

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
  console.log(i);
}

const removeNumberBox = () => {
  addNumberCtn.remove();
};

function activateRemoveBtnsListeners() {
  let removeBtns = document.querySelectorAll('.remove-number-circle');
  for (let i in removeBtns) {
    console.log(i);
    if (removeBtns[i].tagName == 'DIV') {
      // console.log(removeBtns[i]);
      removeBtns[i].addEventListener('click', (e) => {
        // console.log(removeBtns[i].parentElement);
        if (removeBtns[i] !== 0) removeBtns[i].parentElement.remove();
        // removeNumberBox();
      });
    }
  }
}

function validateForm(newContact) {
  console.log(newContact);
  if (!newContact.fullname) {
    alert('Full name is required, must at least 2 words.');
    return false;
  }
  if (!newContact.email) {
    alert('Email is required.');
    return false;
  }
}

let addNumberBtn = document.querySelector('.add-number-circle');
let removeNumberBtns = document.querySelectorAll('.remove-number-circle');
saveBtn.addEventListener('click', addContactToList);

function activateAddNoBtns() {
  let i = 1;
  addNumberBtn.addEventListener('click', () => {
    if (i >= 4) return;
    i++;
    createNewNumberBox(i);
    for (j = 4; j > i; j--) activateRemoveBtnsListeners();
  });
}
activateAddNoBtns();

function clickUploadImgEl() {
  const imgFile = document.querySelector('.add-circle');
  imgFile.addEventListener('click', () => {
    document.getElementById('upfile').click();
  });
}
clickUploadImgEl();

let inputProfileImage = function () {
  let uploadCircle = document.querySelector('.add-circle');
  let profileImg;
  document.querySelector('#upfile').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
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
