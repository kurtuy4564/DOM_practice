const technology = JSON.parse(localStorage.getItem('technology') || '[]')

const modal = $.modal({
  title: 'Добавить задачу',
})

const buttonCreate = document.querySelector('.btn-create')
const technologyName = document.querySelector('.technology-name')
const technologyDescripion = document.querySelector('.technology-description')
const technologyContainer = document.querySelector('.technology-container')
const progressBar = document.querySelector('.progress-bar')

buttonCreate.addEventListener('click', () => {
  technologyName.style.borderColor = '#ccc'
  technologyDescripion.style.borderColor = '#ccc'

  if (technologyName.value && technologyDescripion.value) {
    technology.push({
      id: new Date().toISOString(),
      name: technologyName.value,
      description: technologyDescripion.value,
      isComplete: false,
    })
    technologyName.value = ''
    technologyDescripion.value = ''
    render()
  } else {
    if (!technologyName.value) technologyName.style.borderColor = 'red'
    if (!technologyDescripion.value) technologyDescripion.style.borderColor = 'red'
  }
})

document.addEventListener('DOMContentLoaded', () => {
  render()
})

function render() {
  technologyContainer.innerHTML = ''
  localStorage.setItem('technology', JSON.stringify(technology))

  if (technology.length === 0) {
    technologyContainer.innerHTML = '<p>Технологий пока нет. Добавьте первую</p>'
    return
  }

  for (let i = technology.length - 1; i >= 0; i--) {
    createTechElement(technology[i])
  }

  // technology.forEach(el => {
  //   createTechElement(el)
  // })

  renderProgressBar()

  technologyContainer.addEventListener('click', handleTechnologyClick)
}

function createTechElement(technologyItem) {
  const element = document.createElement('div')
  element.className = 'item'
  element.dataset.id = technologyItem.id
  element.innerHTML = `
    <div class='card ${technologyItem.isComplete ? 'is-complete' : ''}'>
      ${technologyItem.name}
    </div>
  `
  technologyContainer.appendChild(element)
  return element
}

function handleTechnologyClick(event) {
  const card = event.target.closest('.card')

  if (!card) return

  const itemElement = card.closest('.item')
  const itemId = itemElement.dataset.id

  const technologyItem = technology.find(item => item.id === itemId)
  if (technologyItem) {
    modal.open()
    modal.editContent({
      title: technologyItem.name,
      description: technologyItem.description,
      isComplete: technologyItem.isComplete,
      toggleIsComplete: () => {
        technologyItem.isComplete = !technologyItem.isComplete
        render()
      },
    })
  }
}

function renderProgressBar() {
  const countComplete = technology.filter(el => el.isComplete).length
  const precent = Math.round((100 * countComplete) / technology.length)

  progressBar.innerHTML = `
  <div class="progress-line" style="width: ${precent}%"/>  
  <div>${precent}%</div>
  `
}
