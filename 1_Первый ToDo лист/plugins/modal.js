function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('vmodal')
  // <div id="modal" class="modal">
  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close" id="buttonCloseModal">×</span>
        <h2 id="modalTitle">Добавить задачу</h2>
        <div>
          <div>Задача:</div>
          <input type="text" id="taskInput" />
          <button id="addButton">Добавить</button>
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

  return {
    open() {
      $modal.classList.add('open')
    },
    close() {
      $modal.classList.remove('open')
    },
    destroy() {},
  }
}
