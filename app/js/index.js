const contactsContainer = document.querySelector('.contacts-container');
const searchBar = document.querySelector('#search-input');
let contactList = [];

searchBar.addEventListener('keyup', (e) => {
  const searchInput = e.target.value.toLowerCase();

  const filteredContacts = contactList.filter((contact) => {
    return contact.fullname.toLowerCase().includes(searchInput);
  });
  console.log(filteredContacts);
  if (filteredContacts) {
    displayContacts(filteredContacts);
    activateFavoriteListeners(filteredContacts);
    activateDeleteListeners(filteredContacts);
    activateContactCardListeners(filteredContacts);
  }
});

const displayContacts = (contacts) => {
  console.log(contacts);
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
                        <div class="img-icon flex">
                              <img src=${
                                contact.image
                                  ? contact.image
                                  : '/app/assets/images/profile/empty-profile-img.png'
                              }>
                        </div>
                        <a href="./app/views/edit.html" class="edit-box hide">
                            <div class="edit-icon"></div>
                        </a>
                        <div class="delete-icon hide"></div>
                        <div class="left-middle"></div>
                        <div class="left-middle"></div>
                        <div class="right-middle"></div>
                        <div class="right-middle"></div>

                    </div>
                    <div class="contact-bottom">
                        <div class="name-output">${contact.fullname}</div>
                    </div>
                </div>`;
    })
    .join('');
  contactsContainer.innerHTML += htmlContactCards;

  // for (i in contacts) {
  //   console.log(i);
  //   console.log(contacts[i].image);
  // addImgToIcon(contacts[i].image);
  // }
};

function addImgToIcon(imgDataUrl) {
  //
  imgElem.setAttribute('src', imgDataUrl);
  document.querySelectors('.img-icon').appendChild(imgElem);
}
const loadContacts = async () => {
  try {
    if (!localStorage['contactList']) localStorage.setItem('contactList', '');
    if (localStorage['contactList'] !== '')
      contactList = JSON.parse(localStorage['contactList']);
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
  let fullname;
  let deleteIcons = document.querySelectorAll('.delete-icon');
  for (let i in deleteIcons) {
    if (deleteIcons[i].tagName == 'DIV') {
      // console.log(deleteIcons[i].parentElement.parentElement.innerText);
      deleteIcons[i].addEventListener('click', (e) => {
        // console.log(e.path[2].children[1].innerText);
        fullname = e.path[2].children[1].innerText;
        console.log(fullname);
        deleteContact(fullname);
      });
    }
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

// usable for CONTACT DETALILS > details.js
function activateContactCardListeners() {
  // let contactCards = document.querySelectorAll('.contact-marked');
  // let contactsTop = document.querySelectorAll('.img-icon');
  let contactsBottom = document.querySelectorAll('.contact-bottom');
  // console.log(contactsBottom)
  for (let i in contactsBottom) {
    if (contactsBottom[i].className == 'contact-bottom')
      contactsBottom[i].addEventListener('click', (e) => {
        console.log(e);
        window.location.assign('../../app/views/details.html');
      });
  }
  // }
  // for (let i in contactCards) {
  //   if (contactCards[i].tagName == 'DIV') {
  //     console.log(contactCards[i].className);
  //     contactCards[i].addEventListener('click', (e) => {
  //       let fullName = e.path[1].innerText;

  //       // getContactDetails(fullName);
  //       // window.location.assign('../../app/views/details.html');
  //     });
  //   }
}
activateContactCardListeners();

// function displayContactDetails() {}

function getNodeIndex(elm) {
  var c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
}

function addClickEventsToGridItems() {
  let gridItems = document.getElementsByClassName('contact-top');
  for (let i = 0; i < gridItems.length; i++) {
    //if clasname not heart icon
    gridItems[i].onclick = (e) => {
      console.log(e);
      let position = getNodeIndex(e.target);
      console.log(position);
      if (position !== 0 && position !== 3) {
        // console.log(position);
        window.location.assign('../../app/views/details.html');
      }
    };
  }
}
addClickEventsToGridItems();

// MY FAVORITES LIST > favorite.js
let myFavorites = [];
const loadFavorites = async () => {
  try {
    if (localStorage['contactList'])
      myFavorites = JSON.parse(localStorage.getItem('contactList')).filter(
        (contacts) => contacts.favorite === true
      );
  } catch (err) {
    console.error(err);
  }
};
loadFavorites();
console.log(myFavorites);

// TODO's:
// # HOME:
// - heart icon change with css classes not with reload (css)
// - improvements off css methodologies (css)
// - optional: confirmation modal on delete icon (html, css, js)
// # ADD:
// - improvements off css methodologies (css)
// - improvements off form valdidatio with modals rather then alert (js)
//
// # NEXT:
// - DETAIL VIEW (html, css, js)
// - EDIT VIEW (html, css, js)
// - MOBILE RESPONSIVE DESIGN (css)
// - optional personal:
// - modular js code refactoring
