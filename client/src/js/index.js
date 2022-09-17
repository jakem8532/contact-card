import "./form"

import { Tooltip, Toast, Popover } from "bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import { initDb, getDb, postDb, deleteD, editDb } from "./database"
import { fetchCards } from "./cards"
import { toggleForm, clearForm } from "./form"

import "../css/index.css"

import Logo from "../images/logo.png"
import Bear from "../images/bear.png"
import Dog from "../images/dog.png"

const installBtn = document.getElementById('installBtn')

window.addEventListener('load', function () {
    initDb()
    fetchCards()
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
  });

  // Form functionality
  const form = document.getElementById("formToggle");
  const newContactButton = document.getElementById("new-contact");
  let submitBtnToUpdate = false;
  let profileId;
  
  newContactButton.addEventListener('click', event => {
    toggleForm()
   })
  
  form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;
  
    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDb(name, email, phone, profile);
  } else {
  
    fetchCards();
      // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }
  
  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
  });

  window.deleteCard = (e) => {
    let id = parseInt(e.id)

    deleteDb(id)

    fetchCards()
  }

  window.editCard = (e) => {
    profileId = parseInt(e.dataset.id)

    let name = document.getElementById('name').value
    let phone = document.getElementById('email').value
    let email = document.getElementById('phone').value
    let profile = document.querySelector('input[type="radio"]:checked').value

    editDb(name, phone, email, profile)

    form.style.display = "block"

    submitBtnToUpdate = true

  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
    })
  }

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()

    installBtn.style.visibility = 'visible'

    installBtn.addEventListener('click', () => {
        event.prompt()
        installBtn.setAttribute('disabled', true)
        installBtn.textContent = 'Installed!'
    })
  })

  window.addEventListener('appinstalled', (event) => {
    console.log('app installed', event)
  })