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
        <h2>${options.title || ''}</h2>
        <div>
          <div>Задача:</div>
          <input type="text" class="taskInput" />
          <button class="addButton">${options.textButton || ''}</button>
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

  const inputEl = $modal.querySelector('.taskInput')
  const actionBtn = $modal.querySelector('.addButton')

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
      inputEl.value = ''
    },
  }

  const listener = e => {
    if (e.target.dataset.close) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)

  const submitHandler = () => {
    const value = inputEl ? inputEl.value.trim() : ''
    if (typeof options.actionButton === 'function') {
      options.actionButton(value, modal)
    }
  }

  actionBtn.addEventListener('click', submitHandler)

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      actionBtn.removeEventListener('click', submitHandler)
      desroyes = true
    },
    getValue() {
      const input = $modal.querySelector('.taskInput')
      return input ? input.value : ''
    },
    EditValue(text) {
      const input = $modal.querySelector('.taskInput')
      input.value = text
      return input ? input.value : ''
    },
  })
}
