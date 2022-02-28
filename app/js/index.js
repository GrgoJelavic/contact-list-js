const contactsContainer = document.querySelector('.contacts-container');
const searchBar = document.querySelector('#search-input');
let contactList = [];

searchBar.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase();
  const filteredContacts = contactList.filter((contact) => {
    return contact.fullname.toLowerCase().includes(searchInput);
  });
  displayContacts(filteredContacts);
  activateFavoriteListeners();
});

const displayContacts = (contacts) => {
  contactsContainer.innerHTML = `<a class="addNew" href="./app/views/add.html">
                                    <div class="add-icon"></div>
                                    <div class=>
                                        <h4 class="add-text">Add new</h4>
                                    </div>
                                </a>`;
  const htmlContactCards = contacts
    .map((contact) => {
      return `  <div class="contact-marked">
                    <div class="contact-top">
                        <div ${
                          contact.favorite
                            ? `class="marked-heart-icon favorite"`
                            : `class="unmarked-heart-icon favorite"`
                        }></div>
                        <div class="img-icon"></div>
                        <a href="./app/views/edit.html" class="edit-box hide">
                            <div class="edit-icon"></div>
                        </a>
                        <div class="delete-icon hide"></div>
                    </div>
                    <div class="contact-bottom">
                        <div class="name-output">${contact.fullname}</div>
                    </div>
                </div>`;
    })
    .join('');
  contactsContainer.innerHTML += htmlContactCards;
};

const loadContacts = async () => {
  try {
    contactList = JSON.parse(localStorage.getItem('contactList'));
    displayContacts(contactList);
  } catch (err) {
    console.error(err);
  }
};
loadContacts();

function activateFavoriteListeners() {
  let heartIcons = document.querySelectorAll('.favorite');
  for (let i in heartIcons) {
    if (heartIcons[i].tagName == 'DIV')
      heartIcons[i].addEventListener('click', (e) => {
        let fullnamme = e.path[2].innerText;
        toggleFavoriteStatus(fullnamme);
      });
  }
}
activateFavoriteListeners();

function toggleFavoriteStatus(fullName) {
  for (let i in contactList) {
    if (contactList[i].fullname === fullName) {
      contactList[i].favorite === true
        ? (contactList[i].favorite = false)
        : (contactList[i].favorite = true);
      localStorage.setItem('contactList', JSON.stringify(contactList));
      document.location.reload();
      // impl promjenu css klase a ne reload()
    }
  }
}

function activateEditListeners() {
  let editIcons = document.querySelectorAll('.edit-icon');
  for (let i in editIcons) {
    if (editIcons[i].tagName == 'DIV')
      editIcons[i].addEventListener('click', (e) => {
        let fullName = e.path[2].innerText;
        editContact(fullName);
      });
  }
}
activateEditListeners();

function editContact(fullname) {
  for (let i in contactList) {
    if (contactList[i].fullname === fullname) {
      console.log(contactList[i]);
      console.log('HREF -> LINK TO EDIT VIEW ~~ FORM + LOAD CONTACT DETAILS ');
    }
  }
}

function activateDeleteListeners() {
  let deleteIcons = document.querySelectorAll('.delete-icon');
  for (let i in deleteIcons) {
    if (deleteIcons[i].tagName == 'DIV')
      deleteIcons[i].addEventListener('click', (e) => {
        let fullName = e.path[2].innerText;
        // console.log(fullnamme);
        deleteContact(fullName);
      });
  }
}
activateDeleteListeners();

function deleteContact(fullName) {
  const index = contactList.findIndex((contact) => {
    return contact.fullname === fullName;
  });
  contactList.splice(index, 1);
  localStorage.setItem('contactList', JSON.stringify(contactList));
  document.location.reload();
  console.log('MODAL HAST TO BE IMPLAMENTED HERE FOR DELETE FUNC');
}

// CONTACT DETALILS > details.js
function activateContactCardListeners() {
  let contactCards = document.querySelectorAll('.contact-marked');
  for (let i in contactCards) {
    if (contactCards[i].tagName == 'DIV')
      contactCards[i].addEventListener('click', (e) => {
        let fullName = e.path[1].innerText;
        getContactDetails(fullName);
      });
  }
}
activateContactCardListeners();

function getContactDetails(fullName) {
  for (let i in contactList)
    if (contactList[i].fullname === fullName) {
      console.log(contactList[i].fullname);
      console.log(contactList[i].email);
      console.log(contactList[i].number);
      console.log(contactList[i].cell);
    }
  console.log('CONTACT DETAILS HAS TO BE IMPLAMENTED');
}

// MY FAVORITES LIST > favorite.js
let myFavorites = [];
const loadFavorites = async () => {
  try {
    myFavorites = JSON.parse(localStorage.getItem('contactList')).filter(
      (contacts) => contacts.favorite === true
    );
  } catch (err) {
    console.error(err);
  }
};
loadFavorites();
console.log(myFavorites);

//
// TODO's:
// # HOME AND ADD:
// - heart icon change with css classes not with reload()
// - confirmation modal on delete icon (html, css, js)
// - improvements off add form validation (js - add con if exists)
// - improvements off css methodologies (css)
// - Implement PICTURE UPLOAD & STORE TO THE LOCAL STORAGE!
// - Add and remove buttons for add form
// # NEXT:
// - DETAIL VIEW (html, css, js)
// - EDIT VIEW (html, css, js)
// - MOBILE RESPONSIVE DESIGN (css)
//
