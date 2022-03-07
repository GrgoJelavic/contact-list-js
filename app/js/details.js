let profileDetails = document.querySelector('#contact-details');
let contactList = [];
let contactDetails = [];

let clearContactDetailsLocalStorage = () => {
  if (localStorage['contactDetails']) localStorage.removeItem('contactDetails');
};

function displayContactDetails() {
  let numObjectsArray = [];
  let htmlNumBoxes;

  if (localStorage['contactDetails'])
    contactDetails = JSON.parse(localStorage.getItem('contactDetails'));
  clearContactDetailsLocalStorage();

  for (let i in contactDetails.numbers)
    if (contactDetails.numbers[i])
      numObjectsArray.push(JSON.parse(contactDetails.numbers[i]));

  if (contactDetails)
    profileDetails.innerHTML += `
          <div class="left-section">
                <div class="add-circle flex"></div>
                <div id="upload-box">
                    <input id="upfile" type="file" name="image" />
                </div>
            </div>
            <div class="right-section">
                <div class="name-output-container">
                    <div class="details-name flex">
                        <a href='../../index.html'>
                            <div class="arrow-back-icon"></div>
                        </a>
                        <h4>${contactDetails.fullname}</h4>
                    </div>
                    <div class="details-icons">
                        <div class="unmarked-heart-icon favorite"></div>
                        <div class="edit-icon"></div>
                    </div>
                </div>
                <div class="output-container">
                    <div class="email-box flex">
                        <div class="email-icon"></div>
                        <h4 class="header-text">email</h4>
                        <h5 class="output-value-box">${contactDetails.email}</h5>
                    </div>
                    <div class="numbers-box flex">
                        <div class="number-text">
                            <div class="phone-icon"></div>
                            <h4 class="details-text">numbers</h4>
                        </div>
                         <div class="number-boxes-container">
                        </div>
                    </div>
                </div>
            </div>`;

  htmlNumBoxes = numObjectsArray
    .map((num) => {
      if (num.number && num.cell) {
        console.log(typeof num);
        console.log(typeof num.cell);
        console.log(num.number);
        return `<div class="number-boxes-container">
                    <div class="numbers-values">
                        <h5 class="output-value-box">${
                          num.cell ? num.cell : 'Unknown'
                        }</h5>
                        <h4 class="">+ ${
                          num.number ? num.number : 'Unknown'
                        }</h4>
                    </div> `;
      }
    })
    .join('');

  let numBoxContainer = document.querySelector('.number-boxes-container');
  numBoxContainer.innerHTML += htmlNumBoxes;
  profileDetails += numBoxContainer;
}
displayContactDetails();

function activateEditListener() {
  let editIcon = document.querySelector('.edit-icon');
  let fullName;

  if (editIcon.tagName == 'DIV') {
    console.log(editIcon);
    editIcon.addEventListener('click', (e) => {
      console.log(e);
      fullName = e.path[2].innerText;
      console.log(fullName);
      editContactView(fullName);
    });
  }
}
activateEditListener();

function saveContactDetails(fullname) {
  if (contactDetails.fullname === fullname);
  localStorage.setItem('contactDetails', JSON.stringify(contactDetails));
}

function editContactView(fullname) {
  if (contactDetails.fullname === fullname) {
    saveContactDetails(fullname);
    window.location.assign('../../app/views/edit.html');
  }
}

let getProfileImage = function () {
  let imgCircle = document.querySelector('.add-circle');
  let profileImg = new Image();
  profileImg.className = 'uploaded-image';
  contactDetails.image
    ? (profileImg.src = contactDetails.image)
    : (profileImg.src = '/app/assets/images/profile/empty-profile-img.png');
  imgCircle.append(profileImg);
};
getProfileImage();

function toggleDetailsFavoriteStatus(fullName) {
  let favorite = document.querySelector('.favorite');

  if (contactDetails.fullname === fullName) {
    console.log(contactDetails);
    contactDetails.favorite === true
      ? (contactDetails.favorite = false)
      : (contactDetails.favorite = true);
    //
    if (contactDetails.favorite === true) console.log('TRUE');
    else console.log('FALSE');
    //
    const index = contactList.findIndex((contact) => {
      return contact.fullname === fullName;
    });
    contactList.splice(index, 1);
    contactList.splice(index, 0, contactDetails);
    localStorage.setItem('contactList', JSON.stringify(contactList));
    if (contactDetails.favorite === true)
      favorite.className = 'favorite marked-heart-icon';
    else favorite.className = 'favorite unmarked-heart-icon';
  }
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

function activateFavoriteListener() {
  console.log('CLICK');
  loadContacts();
  console.log(contactList);
  let heartIcon = document.querySelector('.favorite');
  if (heartIcon.tagName == 'DIV')
    heartIcon.addEventListener('click', (e) => {
      let fullnamme = e.path[2].innerText;
      toggleDetailsFavoriteStatus(fullnamme);
      console.log(fullnamme);
    });
}
activateFavoriteListener();
