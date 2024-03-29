// import { activateFavoriteListeners } from '../../app/js/index.js';
// activateFavoriteListeners();
const contactsContainer = document.querySelector('.contacts-container');
const searchBar = document.querySelector('#search-filtered');
let favoritesList = [];
let contactList = [];

searchBar.addEventListener('keyup', (e) => {
  const searchFiltered = e.target.value.toLowerCase();

  const filteredContacts = favoritesList.filter((contact) => {
    return contact.fullname.toLowerCase().includes(searchFiltered);
  });
  if (filteredContacts) {
    displayMyFavorites(filteredContacts);
    addClickEventsToGridItems();
    activateDeleteListeners();
    activateEditListeners();
    activateContactCardListeners();
    activateFavoriteListeners();
  }
});

const displayMyFavorites = (contacts) => {
  contactsContainer.innerHTML = '';
  const htmlContactCards = contacts
    .map((contact) => {
      return `  <div class="contact-card">
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
                        <a class="edit-box hide">
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

const loadLists = async () => {
  try {
    if (!localStorage['contactList']) localStorage.setItem('contactList', '');
    if (localStorage['contactList'] !== '') {
      favoritesList = JSON.parse(localStorage.getItem('contactList')).filter(
        (contacts) => contacts.favorite
      );
      contactList = JSON.parse(localStorage['contactList']);
    }
    displayMyFavorites(favoritesList);
  } catch (err) {
    console.error(err);
  }
};
loadLists();
displayMyFavorites(favoritesList);

function saveContactDetails(fullname) {
  const contact = contactList.find((contact) => {
    return contact.fullname === fullname;
  });
  let contactDetails = contact;
  localStorage.setItem('contactDetails', JSON.stringify(contactDetails));
}

function activateContactCardListeners() {
  // let contactCards = document.querySelectorAll('.contact-card');
  // let contactsTop = document.querySelectorAll('.img-icon');
  let contactsBottom = document.querySelectorAll('.contact-bottom');
  // console.log(contactsBottom)
  for (let i in contactsBottom) {
    if (contactsBottom[i].className == 'contact-bottom')
      contactsBottom[i].addEventListener('click', (e) => {
        // console.log(e);
        let contactDetails = e.path[2].children[1].innerText;
        saveContactDetails(contactDetails);
        window.location.assign('../../app/views/details.html');
      });
  }
}
activateContactCardListeners();

function getNodeIndex(elm) {
  let c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
}

function addClickEventsToGridItems() {
  let gridItems = document.getElementsByClassName('contact-top');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onclick = (e) => {
      // console.log(e);
      let position = getNodeIndex(e.target);
      console.log(position);
      if (position !== 0 && position !== 3) {
        let contactDetails = e.path[2].children[1].innerText;
        // console.log(contactDetails);
        window.location.assign('../../app/views/details.html');
        saveContactDetails(contactDetails);
      }
    };
  }
}
addClickEventsToGridItems();

function activateFavoriteListeners() {
  let heartIcons = document.querySelectorAll('.favorite');
  for (let i in heartIcons) {
    if (heartIcons[i].tagName == 'DIV')
      heartIcons[i].addEventListener('click', (e) => {
        let fullnamme = e.path[2].innerText;
        toggleFavoriteStatus(fullnamme);
        if (e.target.tagName === 'DIV') {
          if (favoritesList[i].favorite) {
            e.target.classList.remove('unmarked-heart-icon');
            e.target.classList.add('marked-heart-icon');
          } else {
            e.target.classList.remove('marked-heart-icon');
            e.target.classList.add('unmarked-heart-icon');
          }
        }
      });
  }
}
activateFavoriteListeners();

function toggleFavoriteStatus(fullName) {
  for (let i in contactList) {
    if (contactList[i].fullname === fullName)
      contactList[i].favorite
        ? (contactList[i].favorite = false)
        : (contactList[i].favorite = true);
  }
  localStorage.setItem('contactList', JSON.stringify(contactList));
  if (!searchBar.inner) document.location.reload();
}

function activateEditListeners() {
  let editIcons = document.querySelectorAll('.edit-icon');
  let fullName;
  for (let i in editIcons) {
    if (editIcons[i].tagName == 'DIV')
      editIcons[i].addEventListener('click', (e) => {
        fullName = e.path[3].innerText;
        editContact(fullName);
        window.location.assign('../views/edit.html');
      });
  }
}
activateEditListeners();

function editContact(fullname) {
  for (let i in contactList) {
    if (contactList[i].fullname === fullname) {
      saveContactDetails(fullname);
    }
  }
}

function openModal() {
  const modal = document.querySelector('#modal');
  const overlay = document.querySelector('#overlay');
  if (!modal) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal() {
  const modal = document.querySelector('#modal');
  const overlay = document.querySelector('#overlay');
  if (!modal) return;
  modal.classList.add('remove');
  overlay.classList.add('active');
}

function activateDeleteListeners() {
  const confirmDelete = document.querySelector('.delete-button');
  let deleteIcons = document.querySelectorAll('.delete-icon');
  let fullname;
  for (let i in deleteIcons) {
    if (deleteIcons[i].tagName == 'DIV') {
      deleteIcons[i].addEventListener('click', (e) => {
        fullname = e.path[2].children[1].innerText;
        openModal();
        confirmDelete.addEventListener('click', () => {
          deleteContact(fullname);
          closeModal();
        });
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
}
