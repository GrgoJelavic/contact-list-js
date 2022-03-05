// import { activateFavoriteListeners } from '../../app/js/index.js';
// activateFavoriteListeners();
const contactsContainer = document.querySelector('.contacts-container');
const searchBar = document.querySelector('#search-filtered');
let favoritesList = [];

searchBar.addEventListener('keyup', (e) => {
  const searchFiltered = e.target.value.toLowerCase();

  const filteredContacts = favoritesList.filter((contact) => {
    return contact.fullname.toLowerCase().includes(searchFiltered);
  });
  console.log(filteredContacts);
  if (filteredContacts) {
    displayMyFavorites(filteredContacts);
    activateFavoriteListeners(filteredContacts);
    activateDeleteListeners(filteredContacts);
    activateContactCardListeners(filteredContacts);
    addClickEventsToGridItems(filteredContacts);
  }
});

const displayMyFavorites = (contacts) => {
  console.log(contacts);
  contactsContainer.innerHTML = '';
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
};

const loadFavorites = async () => {
  try {
    if (!localStorage['contactList']) localStorage.setItem('contactList', '');
    if (localStorage['contactList'] !== '')
      favoritesList = JSON.parse(localStorage.getItem('contactList')).filter(
        (contacts) => contacts.favorite === true
      );
    displayMyFavorites(favoritesList);
  } catch (err) {
    console.error(err);
  }
};
loadFavorites();

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
  for (let i in favoritesList) {
    if (favoritesList[i].fullname === fullName) {
      favoritesList[i].favorite === true
        ? (favoritesList[i].favorite = false)
        : (favoritesList[i].favorite = true);
      localStorage.setItem('contactList', JSON.stringify(favoritesList));
      document.location.reload();
      // change icon with css not with reload()
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
  for (let i in favoritesList) {
    if (favoritesList[i].fullname === fullname) {
      console.log(favoritesList[i]);
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
  const index = favoritesList.findIndex((contact) => {
    return contact.fullname === fullName;
  });
  favoritesList.splice(index, 1);
  localStorage.setItem('contactList', JSON.stringify(favoritesList));
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
}
activateContactCardListeners();

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
