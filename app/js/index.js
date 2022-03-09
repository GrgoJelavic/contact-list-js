const contactsContainer = document.querySelector('.contacts-container');
const searchBar = document.querySelector('#search-input');
let contactList = [];

if (searchBar)
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
      activateEditListeners(filteredContacts);
      addClickEventsToGridItems();
    }
  });

const displayContacts = (contacts) => {
  // console.log(contacts);
  if (contactsContainer) {
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
                        <div class="edit-box hide">
                            <div class="edit-icon"></div>
                        </div>
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
  }
};
const loadContacts = async () => {
  try {
    if (!localStorage['contactList']) localStorage.setItem('contactList', '');
    else {
      contactList = JSON.parse(localStorage['contactList']);
      await displayContacts(contactList);
    }
  } catch (err) {
    console.error(err);
  }
};
loadContacts();

function activateFavoriteListeners() {
  let heartIcons = document.querySelectorAll('.favorite');
  for (let i in heartIcons) {
    if (heartIcons[i].tagName == 'DIV') {
      // console.log(heartIcons[i]);
      heartIcons[i].addEventListener('click', (e) => {
        let fullnamme = e.path[2].innerText;
        toggleFavoriteStatus(fullnamme);
        if (contactList[i].favorite) {
          e.target.classList.remove('unmarked-heart-icon');
          e.target.classList.add('marked-heart-icon');
        } else {
          e.target.classList.remove('marked-heart-icon');
          e.target.classList.add('unmarked-heart-icon');
        }
      });
    }
  }
}
activateFavoriteListeners();

function toggleFavoriteStatus(fullName) {
  for (let i in contactList) {
    if (contactList[i].fullname == fullName)
      contactList[i].favorite
        ? (contactList[i].favorite = false)
        : (contactList[i].favorite = true);
    localStorage.setItem('contactList', JSON.stringify(contactList));
  }
}

function activateEditListeners() {
  let editIcons = document.querySelectorAll('.edit-icon');
  let fullName;
  for (let i in editIcons) {
    if (editIcons[i].tagName == 'DIV')
      editIcons[i].addEventListener('click', (e) => {
        console.log(e);
        fullName = e.path[3].children[1].innerText;
        console.log(fullName);
        editContactView(fullName);
      });
  }
}
activateEditListeners();

function editContactView(fullname) {
  for (let i in contactList) {
    console.log(contactList[i]);
    if (contactList[i].fullname === fullname) {
      console.log(contactList[i].fullname);
      saveContactDetails(fullname);
      window.location.assign('../../app/views/edit.html');
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

function activateContactCardListeners() {
  let contactsBottom = document.querySelectorAll('.contact-bottom');
  // console.log(contactsBottom);
  for (let i in contactsBottom) {
    if (contactsBottom[i].className == 'contact-bottom')
      contactsBottom[i].addEventListener('click', (e) => {
        console.log(e.path[2].children[1].innerText);
        let contactDetails = e.path[2].children[1].innerText;
        window.location.href = '../../app/views/details.html';
        saveContactDetails(contactDetails);
      });
  }
}

function getNodeIndex(elm) {
  var c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
}

function addClickEventsToGridItems() {
  let gridItems = document.getElementsByClassName('contact-top');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onclick = (e) => {
      let position = getNodeIndex(e.target);
      // console.log(position);
      if (position !== 0 && position !== 3) {
        // console.log(position);
        let contactDetails = e.path[2].children[1].innerText;
        window.location.assign('../../app/views/details.html');
        saveContactDetails(contactDetails);
      }
    };
  }
}
function getContactDetails() {
  activateContactCardListeners();
  addClickEventsToGridItems();
}
getContactDetails();

htmlFavorites = document.querySelector('.favorites-link');
if (htmlFavorites)
  htmlFavorites.addEventListener('click', () => {
    window.location.assign('../../app/views/favorites.html');
  });

function saveContactDetails(fullname) {
  const contact = contactList.find((contact) => {
    return contact.fullname === fullname;
  });
  contactDetails = contact;
  console.log(contactDetails);
  localStorage.setItem('contactDetails', JSON.stringify(contactDetails));
}
//
// #### TODO's:
// # HOME:
// - improvements off css methodologies (css)
// - optional: confirmation modal on delete icon (html, css, js)
// # ADD:
// - improvements off css methodologies (css)
// - improvements off add form validation. optional modals rather then alert (js)
// # FAVORITES:
// - implementation improvements for reusable functions (export, import, script type module, modular js)
// - DETAILS:
// - improvements for contact card listeners (css grid)
// # NEXT:
// - EDIT VIEW (html, css, js)
// - MOBILE RESPONSIVE DESIGN (css)
// - optional personal:
// - modular js code refactoring
//
// ### BUGs FIX
// # HOME
// - css grid on contact card
// # FAVORITES
// - css grid on contact card
// # ADD
// - validation for full name, email and number
// - add icons inside top div
// - improvements for add number style
// - cancel button css
// # EDIT
// - validation for full name, email and number
// - number underline css
// - improvements for add number style
// - cancel button css
