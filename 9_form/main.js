document.addEventListener('DOMContentLoaded', () => {
  const currentData = localStorage.getItem('data')
  console.log(currentData)
  if (!currentData) return null
  const parsed = JSON.parse(currentData)

  console.log(parsed)

  firstName.value = parsed.firsName
  lastName.value = parsed.lastName
  email.value = parsed.email
  message.value = parsed.message
  consent.checked = parsed.consent
  setRadioValue(parsed.queryType)
})

const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')

const message = document.getElementById('message')
const consent = document.getElementById('consent')

firstName.addEventListener('change', saveData)
lastName.addEventListener('change', saveData)
email.addEventListener('change', saveData)
message.addEventListener('change', saveData)
consent.addEventListener('change', saveData)

const radioButtons = document.querySelectorAll('input[name="queryType"]')

radioButtons.forEach(radio => {
  radio.addEventListener('change', saveData)
})

function saveData() {
  localStorage.setItem('data', JSON.stringify(getData()))
}

const contactForm = document.getElementById('contactForm')

function getSelectedQueryType() {
  const selected = document.querySelector('input[name="queryType"]:checked')
  return selected ? selected.value : null
}

function setRadioValue(value) {
  radioButtons.forEach(radio => {
    radio.checked = radio.value === value
  })
}

contactForm.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log(getData())
})

function getData() {
  return {
    firsName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    queryType: getSelectedQueryType(),
    message: message.value,
    consent: consent.checked,
  }
}
