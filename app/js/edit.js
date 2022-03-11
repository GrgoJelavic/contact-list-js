let profileDetails = document.querySelector('#edit-details');
let contactList = [];
let contactDetails = [];
let editedContact = {};
let img;

let getProfileImageIfExists = () => {
  let imgCircle = document.querySelector('.add-circle');
  if (contactDetails.image) {
    let profileImg = new Image();
    profileImg.className = 'uploaded-image';
    if (contactDetails.image) profileImg.src = contactDetails.image;
    imgCircle.append(profileImg);
    return profileImg.src;
  }
};

function clickUploadImgEl() {
  const imgFile = document.querySelector('.uploaded-image');
  if (imgFile)
    imgFile.addEventListener('click', () => {
      document.getElementById('upfile').click();
    });
}

let inputProfileImage = () => {
  let uploadCircle = document.querySelector('.add-circle');
  let profileImg;
  document.querySelector('#upfile').addEventListener('change', function (e) {
    // console.log(e);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      img = reader.result;
      if (profileImg === undefined) profileImg = new Image();
      profileImg.src = img;
      profileImg.className = 'uploaded-image';
      uploadCircle.append(profileImg);
      document.querySelector('.uploaded-image').remove();
    });
    reader.readAsDataURL(this.files[0]);
  });
};

let clearContactDetailsLocalStorage = () => {
  if (localStorage['contactDetails']) localStorage.removeItem('contactDetails');
};

function jsonContact(fullname, email, img, numbers = []) {
  this.fullname = fullname;
  this.email = email;
  this.favorite = false;
  this.numbers = numbers;
  this.image = img;
}

function displayEditFormDetails() {
  let numObjectsArray = [];
  let htmlNumBoxes;
  if (localStorage['contactDetails'])
    contactDetails = JSON.parse(localStorage.getItem('contactDetails'));
  // clearContactDetailsLocalStorage();
  for (let i in contactDetails.numbers) {
    if (contactDetails.numbers[i])
      numObjectsArray.push(contactDetails.numbers[i]);
  }
  if (contactDetails)
    profileDetails.innerHTML += `<div class="left-section">
                                    <div class="add-circle flex">
                                        <div class="upload-icon flex"></div>
                                    </div>
                                    <div id="upload-box">
                                        <input id="upfile" type="file" name="image" value="${contactDetails.image}"/>
                                    </div>
                                </div>
                                <div class=" right-section">
                                    <div class="name-output-container">
                                        <div class="details-name flex">
                                            <a href='../../index.html'>
                                                <div class="arrow-back-icon"></div>
                                            </a>
                                            <h4>${contactDetails.fullname}</h4>
                                            <label>Delete</label>
                                            <div class="delete-icon"></div>
                                        </div>
                                    </div>
                                    <form id="editForm" name="editForm">
                                        <div class=" input-container">
                                            <div class="header-box flex">
                                                <div class="name-icon"></div>
                                                <hlabel for="fullname" class="header-text">full name</label>
                                            </div>
                                            <input name="fullname" id="fullname" placeholder="${contactDetails.fullname}" class="input-bar">
                                            <div class="err-msg err-name"></div>
                                        </div>
                                        <div class="input-container">
                                            <div class="header-box flex">
                                                <div class="email-icon"></div>
                                                <label for="email "class="header-text">email</label>
                                            </div>
                                            <input name="email" id="email" placeholder="${contactDetails.email}" class="input-bar">
                                            <div class="err-msg err-mail"></div>
                                        </div>
                                        <div class="input-container">
                                            <div class="header-box flex">
                                                <div class="phone-icon"></div>
                                                <label class="header-text">numbers</label>
                                            </div>
                                            <div class="numbers-container">
                                            </div>
                                        </div>
                                        <div class="buttons">
                                            <a href="../../index.html">
                                                <div class="cancel-button flex">
                                                    <h4>Cancel</h4>
                                                </div>
                                            </a>
                                            <button form="addForm" type="submit" class="save-button" value="submit">Save</button>
                                        </div>
                                     </form> 
                                </div>`;
  let numBoxContainer = document.querySelector('.numbers-container');
  i = -1;
  htmlNumBoxes = numObjectsArray
    .map((num) => {
      if (num.number && num.cell) {
        i++;
        return `<div class="number-box flex">
                    <input type="text" id="number${i}" name="number${i}" placeholder="+${num.number}" class="input-bar"/>
                    <input type="text" name="cell${i}" id="cell${i}" placeholder="${num.cell}" class="source-number" />
                    <div class="remove-number-circle flex">
                        <div class="remove-number-icon"></div>
                    </div>          
                </div>`;
      }
    })
    .join('');
  const htmlAddNumber = `<div class="add-number-container">
                                <div class="add-number-circle flex">
                                    <div class="add-number-icon"></div>
                                </div>
                                <div class=">
                                    <h4 class="add-number-text">Add number</h4>
                                </div>
                            </div>`;
  if (numBoxContainer) {
    numBoxContainer.innerHTML += htmlNumBoxes;
    numBoxContainer.innerHTML += htmlAddNumber;
    profileDetails += numBoxContainer;
  }
  getProfileImageIfExists();
}
displayEditFormDetails();
clickUploadImgEl();
inputProfileImage();

function editContactinTheList() {
  editedContact = new jsonContact(
    fullname.value,
    email.value,
    img,
    (numbers = [])
  );
  const index = contactList.findIndex((contact) => {
    return contact.fullname === contactDetails.fullname;
  });
  // editedContact.image = getProfileImageIfExists();
  for (i in contactList)
    if (contactList[i].fullname === contactDetails.fullname) {
      if (editedContact.fullname !== '')
        contactDetails.fullname = editedContact.fullname;
      if (editedContact.email !== '')
        contactDetails.email = editedContact.email;
      if (editedContact.image) contactDetails.image = editedContact.image;
    }

  for (i = 0; i <= 4; i++) {
    let newNo = document.querySelector(`input[name='number${i}']`);
    let newCell = document.querySelector(`input[name='cell${i}']`);
    let newNumber;
    if (newNo && newCell && newNo.value !== '' && newCell.value !== '') {
      newNumber = {
        number: newNo.value,
        cell: newCell.value,
      };
      if (contactDetails.numbers[i]) contactDetails.numbers[i] = newNumber;
    }
    editedContact.numbers.push(newNumber);
  }
  if (editedContact.fullname !== '') if (validateFullName() === false) return;
  if (editedContact.email !== '') if (validateEmail() === false) return;
  for (n in editedContact.numbers)
    if (editedContact.numbers[n])
      contactDetails.numbers.push(editedContact.numbers[n]);

  contactList.splice(index, 1);
  contactList.unshift(contactDetails);
  localStorage.setItem('contactList', JSON.stringify(contactList));
  window.location.assign('../../index.html');
}

function createNewNumberBox(i) {
  let numBoxContainer = document.querySelector('.numbers-container');
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
  const removeBtn = document.createElement('div');
  removeBtn.className = 'remove-number-circle flex';
  const removeIcon = document.createElement('div');
  removeIcon.className = 'remove-number-icon';
  removeBtn.append(removeIcon);
  noBox.append(inputNo);
  noBox.append(inputCell);
  noBox.append(removeBtn);
  const addNumberCtn = document.querySelector('.add-number-container');
  addNumberCtn.remove();
  numBoxContainer.append(noBox);
  numBoxContainer.append(addNumberCtn);
}

const loadContacts = async () => {
  try {
    if (!localStorage['contactList']) localStorage.setItem('contactList', '');
    if (localStorage['contactList'] !== '')
      contactList = JSON.parse(localStorage['contactList']);
  } catch (err) {
    console.error(err);
  }
};
loadContacts();

const saveBtn = document.querySelector('.save-button');
saveBtn.addEventListener('click', editContactinTheList);

function activateRemoveBtnsListeners() {
  let removeBtns = document.querySelectorAll('.remove-number-circle');
  for (let i in removeBtns) {
    if (removeBtns[i].tagName === 'DIV') {
      removeBtns[i].addEventListener('click', () => {
        if (
          removeBtns[i].parentElement.children[0].value ||
          removeBtns[i].parentElement.children[0].value
        ) {
          removeBtns[i].parentElement.children[0].value = null;
          removeBtns[i].parentElement.children[1].value = null;
        } else {
          removeBtns[i].parentElement.remove();
          contactDetails.numbers.splice(i, 1);
        }
      });
    }
  }
}
activateRemoveBtnsListeners();

function activateAddNoBtns() {
  const addNumberBtn = document.querySelector('.add-number-circle');
  const existingItems = document.querySelectorAll('.remove-number-circle');
  let i;
  i = existingItems.length;
  addNumberBtn.addEventListener('click', (e) => {
    let prevNumValue, prevCellValue;
    if (i === 0) createNewNumberBox(i);
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
    if (i >= existingItems.length) {
      if (!prevNumValue) return;
      if (!prevCellValue) return;
    }
    if (i >= 4) {
      i = e.path[3].children[1].children.length - 1;
      return;
    }
    i++;
    createNewNumberBox(i);
    activateRemoveBtnsListeners();
  });
}
activateAddNoBtns();

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
    if (contactNo) if (!contactNo.value) return;
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

function activateDeleteListener() {
  let deleteIcon = document.querySelector('.delete-icon');
  deleteIcon.addEventListener('click', () => {
    deleteContact();
    window.location.assign('../../index.html');
  });
}
activateDeleteListener();

function deleteContact() {
  const index = contactList.findIndex((contact) => {
    return contact.fullname === contactDetails.fullname;
  });
  contactList.splice(index, 1);
  localStorage.setItem('contactList', JSON.stringify(contactList));
  document.location.reload();
  console.log('MODAL HAS TO BE IMPLAMENTED HERE FOR DELETE!');
}
