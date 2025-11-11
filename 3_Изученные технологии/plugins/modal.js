function _createModal(options) {
  const DEFAULT_WIDTH = '400px'
  const modal = document.createElement('div')
  modal.classList.add('vmodal', 'hide')
  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <div id="modal" class="modal">
      <div class="modal-content" style="width: ${options.width || DEFAULT_WIDTH}">
        <span class="close" data-close="true">×</span>
        <h2 class='title'>${options.title || ''}</h2>
        <div>
          <div class='description'>${options.description || ''}</div>
            <label>
              <input class='isComplete' type="checkbox" name="completed" checked="${
                options.isComplete
              }"> Изучено
            </label>
        </div>
      </div>
    </div>
    `,
  )
  document.body.appendChild(modal)
  return modal
}

$.modal = function (options) {
  const $modal = _createModal(options)
  let desroyes = false
  let toggleCallback = function () {}

  const modal = {
    open() {
      if (desroyes) return
      $modal.classList.add('open')
      $modal.classList.remove('hide')
    },
    close() {
      if (desroyes) return
      $modal.classList.add('hide')
      $modal.classList.remove('open')
    },
  }

  // Обработчик для checkbox
  const handleCheckboxChange = e => {
    const isChecked = e.target.checked
    toggleCallback(isChecked) // Вызываем переданную функцию
  }

  // Находим checkbox и вешаем обработчик
  const checkbox = $modal.querySelector('.isComplete')
  if (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange)
  }

  const listener = e => {
    if (e.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      desroyes = true
    },
    editContent(options) {
      title = $modal.querySelector('.title')
      description = $modal.querySelector('.description')
      isComplete = $modal.querySelector('.isComplete')

      title.textContent = options.title
      description.textContent = options.description
      isComplete.checked = options.isComplete
      toggleCallback = options.toggleIsComplete
    },
  })
}
