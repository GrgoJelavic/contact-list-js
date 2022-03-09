let profileDetails = document.querySelector('#edit-details');
let contactList = [];
let contactDetails = [];
let contact = {};
let img;

let clearContactDetailsLocalStorage = () => {
  if (localStorage['contactDetails']) localStorage.removeItem('contactDetails');
};

let getProfileImageIfExists = function () {
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
      document.querySelector('.uploaded-image').remove();
      //   document.querySelector('.uploaded-icon').remove();
    });
    reader.readAsDataURL(this.files[0]);
  });
};

function jsonContact(fullname, email, img, numbers = [20]) {
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
  clearContactDetailsLocalStorage();

  for (let i in contactDetails.numbers) {
    if (contactDetails.numbers[i])
      numObjectsArray.push(JSON.parse(contactDetails.numbers[i]));
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
                                    <a href='../../index.html'>
                                        <div class="arrow-back-icon"></div>
                                    </a>
                                        <div class=" input-container">
                                            <div class="header-box flex">
                                                <div class="name-icon"></div>
                                                <h4 class="header-text">full name</h4>
                                            </div>
                                            <input name="fullname" id="fullname" placeholder="${contactDetails.fullname}" value="${contactDetails.fullname}" class="input-bar">
                                        </div>
                                        <div class="input-container">
                                            <div class="header-box flex">
                                                <div class="email-icon"></div>
                                                <h4 class="header-text">email</h4>
                                            </div>
                                            <input type="email" name="email" id="email" placeholder="${contactDetails.email}" value="${contactDetails.email}" class="input-bar">
                                        </div>
                                        <div class="input-container">
                                            <div class="header-box flex">
                                                <div class="phone-icon"></div>
                                                <h4 class="header-text">numbers</h4>
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
                                            <button form="addForm" type="submit" class="save-button" value="save">Save</button>
                                        </div>
                                </div>`;
  let numBoxContainer = document.querySelector('.numbers-container');
  let cnt = 0;
  for (let i in contactDetails.numbers) {
    if (contactDetails.numbers[i]) cnt++;
  }
  console.log(cnt);
  i = cnt + 1;
  htmlNumBoxes = numObjectsArray
    .map((num) => {
      //   console.log(num);
      if (num.number && num.cell) {
        i++;
        return `<div class="number-box flex">
                    <input type="number" id="number${i}" name="number${i}" value="${num.number}" placeholder="+${num.number}" class="input-bar"
                        type="tel" pattern="[0-9]{6,}" />
                    <input type="text" name="cell${i}" id="cell${i}" value="${num.cell}" placeholder="+${num.cell}" class="source-number" />
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
  contact = new jsonContact(fullname.value, email.value, img, []);

  for (i = 0; i <= 4; i++) {
    let newNo = document.querySelector(`input[name='number${i}']`);
    let newCell = document.querySelector(`input[name='cell${i}']`);
    let newNumber;
    console.log(newNo);
    if (newNo !== null && !newCell !== null) {
      newNumber = {
        number: newNo.value,
        cell: newCell.value,
      };
    }
    console.log(newNumber);
    let saveData = JSON.stringify(newNumber);
    contact.numbers.push(saveData);
  }
  contact.image = getProfileImageIfExists();
  console.log(contact);
  console.log(contactDetails);
  console.log(contactList);
  localStorage.setItem('Test', contact);
  console.log(img);
  //   console.log(contact);
  //   if (validateForm(contact) === false) return;
  //   !localStorage['contactList']
  //     ? addContactToNewList(contact)
  //     : addContactToExistingList(contact);
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

function activateAddNoBtns() {
  let addNumberBtn = document.querySelector('.add-number-circle');
  let i = 0;
  addNumberBtn.addEventListener('click', () => {
    if (i >= 4) return;
    i++;
    console.log(i);
    createNewNumberBox(i);
  });
}
activateAddNoBtns();

function activateRemoveBtnsListeners() {
  let removeBtns = document.querySelectorAll('.remove-number-circle');
  for (let i in removeBtns) {
    if (removeBtns[i].tagName == 'DIV') {
      removeBtns[i].addEventListener('click', () => {
        if (removeBtns[i] !== 0) removeBtns[i].parentElement.remove();
      });
    }
  }
}
activateRemoveBtnsListeners();
