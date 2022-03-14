const contactsContainer = document.querySelector('.contacts-container');
const searchBar = document.querySelector('#search-input');
const overlay = document.querySelector('#overlay');
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
      activateFavoriteListeners();
      activateDeleteListeners();
      addClickEventsToGridItems();
      activateContactCardListeners();
      activateEditListeners();
    }
  });

const displayContacts = (contacts) => {
  if (contactsContainer) {
    contactsContainer.innerHTML = `<a class="addNew" href="./app/views/add.html">
                                    <div class="add-icon"></div>
                                    <div class=>
                                        <h4 class="add-text">Add new</h4>
                                    </div>
                                </a>`;
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
                                  : './app/assets/images/profile/empty-profile-img.png'
                              }>
                        </div>
                        <a class="edit-box hide">
                            <div class="edit-icon"></div>
                        </a>
                        <div class="delete-icon hide"></div>
                        <div class=""></div>
                        <div class=""></div>
                        <div class=""></div>
                        <div class=""></div>
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
      displayContacts(contactList);
    }
  } catch (err) {
    console.error(err);
  }
};
loadContacts();
displayContacts(contactList);

function activateFavoriteListeners() {
  let heartIcons = document.querySelectorAll('.favorite');
  for (let i in heartIcons) {
    if (heartIcons[i].tagName == 'DIV') {
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
  let c = elm.parentNode.children,
    i = 0;
  for (; i < c.length; i++) if (c[i] == elm) return i;
}

function addClickEventsToGridItems() {
  let gridItems = document.getElementsByClassName('contact-top');
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].onclick = (e) => {
      let position = getNodeIndex(e.target);
      console.log(position);
      if (position !== 0 && position !== 3) {
        console.log(position);
        let contactDetails = e.path[2].children[1].innerText;
        window.location.assign('../../app/views/details.html');
        saveContactDetails(contactDetails);
      }
    };
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
    if (contactList[i].fullname === fullname) {
      saveContactDetails(fullname);
      window.location.assign('../../app/views/edit.html');
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
  localStorage.setItem('contactDetails', JSON.stringify(contactDetails));
}
