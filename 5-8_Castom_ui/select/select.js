{
  const selectElement = document.querySelector('.select')
  const optionsContainer = selectElement.querySelector('.select-element')
  const arrowIcon = selectElement.querySelector('img')
  const selectHeader = selectElement.querySelector('.select-header')
  const selectTitle = selectElement.querySelector('.select-title')

  const optionsList = ['Label1', 'Label2', 'Label3', 'Label4', 'Label5']
  let selectedOption = null

  selectHeader.addEventListener('click', event => {
    render(event)
  })

  function toggleOptions() {
    optionsContainer.innerHTML = ''
    if (optionsList.length === 0) {
      optionsContainer.innerHTML = '<div>Пусто<div/>'
      return
    }
    optionsList.forEach(el => {
      createOptionElement(el)
    })
    optionsContainer.addEventListener('click', handleTechnologyClick)
  }

  function render(event) {
    selectTitle.textContent = selectedOption || 'Menu Label'
    if (event.target.closest('.select-item')) {
      toggleOptions()
      return
    }

    if (!optionsContainer.textContent) {
      toggleOptions()
      arrowIcon.style.transform = 'rotate(180deg)'
    } else {
      optionsContainer.innerHTML = ''
      arrowIcon.style.transform = 'rotate(0deg)'
    }
  }

  function createOptionElement(el) {
    const itemElement = document.createElement('div')
    itemElement.className = `select-item ${selectedOption === el ? 'current' : ''}`
    itemElement.dataset.id = el
    itemElement.innerHTML = `
  <div>${el}</div>
  `
    optionsContainer.appendChild(itemElement)
  }

  function handleTechnologyClick(event) {
    const clickedOption = event.target.closest('.select-item')

    if (!clickedOption) return

    const optionCurrent = clickedOption.dataset.id

    const option = optionsList.find(item => item === optionCurrent)
    if (option) {
      selectedOption = option
      render(event)
    }
  }
}
