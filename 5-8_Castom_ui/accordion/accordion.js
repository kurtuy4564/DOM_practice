{
  const accordionConteniner = document.querySelector('.accordion-container')

  const accordionsList = [
    {
      title: 'This is a question 1',
      description:
        'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
      buttonText: 'Learn more',
      isOpen: false,
    },
    {
      title: 'This is a question 2',
      description:
        'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
      buttonText: 'Learn more',
      isOpen: false,
    },
    {
      title: 'This is a question 3',
      description:
        'This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.',
      buttonText: 'Learn more',
      isOpen: false,
    },
  ]

  document.addEventListener('DOMContentLoaded', () => {
    render()
  })

  function render() {
    accordionConteniner.innerHTML = ''

    if (!accordionsList.length) return

    accordionsList.forEach((el, index) => {
      createAccardionElement(el, index)
    })

    accordionConteniner.addEventListener('click', handleClick)
  }

  function createAccardionElement(el, index) {
    const accordion = document.createElement('div')
    accordion.className = 'accordion'
    accordion.dataset.id = index

    accordion.innerHTML = `
    <div class="accordion-item">
      <div class="accordion-title">${accordionsList[index].title}</div>
      <img class="accordion-img" src="icons/arrow.svg" ${
        accordionsList[index].isOpen ? `style = 'transform: rotate(0deg)'` : ''
      }/>
    </div>
    ${
      accordionsList[index].isOpen
        ? `
          <div class="accordion-item-content">
            <div>${accordionsList[index].description}</div>
            <button class="accordion-button">${accordionsList[index].buttonText}</button>
          </div>
        `
        : ''
    }
  `
    accordionConteniner.appendChild(accordion)
  }

  function handleClick(event) {
    const item = event.target.closest('.accordion')
    const itemHeader = event.target.closest('.accordion-item')
    
    if (!item || !itemHeader) return
    const idAccordion = item.dataset.id

    const currentAccordion = accordionsList.findIndex((el, index) => {
      return +index === +idAccordion
    })

    if (currentAccordion != null) {
      accordionsList[currentAccordion].isOpen = !accordionsList[currentAccordion].isOpen
      render()
    }
  }
}
