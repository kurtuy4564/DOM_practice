{
  const typeTabs = ['complete', 'notification', 'empty']
  const tabsList = [
    { id: 1, title: 'Tab1', type: 'empty' },
    { id: 2, title: 'Tab1', type: 'notification' },
    { id: 3, title: 'Tab1', type: 'complete' },
    { id: 4, title: 'Tab1', type: 'empty' },
    { id: 5, title: 'Tab1', type: 'empty' },
  ]
  let currentTabs = tabsList[0].id

  const tabsContainer = document.querySelector('.tabs-container')

  document.addEventListener('DOMContentLoaded', () => {
    render()
  })

  function render() {
    tabsContainer.innerHTML = ''

    tabsList.forEach(el => {
      createTabsElement(el)
    })

    tabsContainer.addEventListener('click', handleClick)
  }

  function createTabsElement(el) {
    const tabs = document.createElement('div')
    tabs.className = 'main-tabs'
    tabs.dataset.id = el.id

    tabs.innerHTML = `
    <div class='tabs ${currentTabs === el.id ? `tabs--current` : ''}'>
      ${el.title}
      ${
        el.type === 'notification'
          ? `<img src='./icons/check.svg'/>`
          : el.type === 'complete' 
          ? `<img src='./icons/notification.svg'/>`
          : ''
      }
    </div>
    `

    tabsContainer.appendChild(tabs)
  }

  function handleClick(event) {
    const item = event.target.closest('.main-tabs')
    if (!item) return

    if (item.dataset.id != null) {      
      currentTabs = +item.dataset.id
      render()
    }
  }
}
