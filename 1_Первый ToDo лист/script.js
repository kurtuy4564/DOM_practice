let tasks = JSON.parse(localStorage.getItem('tasks')) || []

document.addEventListener('DOMContentLoaded', () => {
  renderTasks()
})

function renderTasks() {
  tasksContainer.innerHTML = ''

  localStorage.setItem('tasks', JSON.stringify(tasks))

  if (inputSearchTask.value.length || filterSelect.value !== 'all') {
    const filtered = tasks
      .filter(el => {
        if (filterSelect.value === 'all') {
          return true
        }
        if (filterSelect.value === 'complete') {
          return el.completed
        }
        if (filterSelect.value === 'incomplete') {
          return !el.completed
        }
        return true
      })
      .filter(el => el.text.toLowerCase().includes(inputSearchTask.value.toLowerCase()))

    if (filtered.length === 0) {
      tasksContainer.innerHTML = '<div class="empty-message">Упс, пусто...</div>'
      return
    }

    filtered.forEach(task => {
      createTaskElement(task)
    })
    return
  }

  if (tasks.length === 0) {
    tasksContainer.innerHTML = '<div class="empty-message">Задач пока нет</div>'
    return
  }

  tasks.forEach(task => {
    createTaskElement(task)
  })
}

function createTaskElement(task) {
  const taskElement = document.createElement('div')
  taskElement.className = 'todo-item'
  taskElement.dataset.id = task.id

  taskElement.innerHTML = `
  <input class="checkbox" type="checkbox" ${task.completed ? 'checked' : ''} />
  <div class="task-content">
  <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
  </div>
  <div class="icons">
  <img src="icons/pencil.svg" alt="Редактировать" width="24" height="24" aria-hidden="true"/>
  <img src="icons/trash-2.svg" alt="Удалить" width="24" height="24" aria-hidden="true"/>
  </div>
  `

  tasksContainer.appendChild(taskElement)
  attachTaskHandlers(taskElement, task.id)
  return taskElement
}

const inputSearchTask = document.getElementById('inputSearchTask')
const buttunClearSearch = document.getElementById('clearSearch')
const filterSelect = document.getElementById('filterSelect')

const inputTask = document.getElementById('taskInput')
const modalActionButton = document.getElementById('addButton')
const tasksContainer = document.getElementById('todoList')

const openAddModalButton = document.getElementById('openModal')
const modalEl = document.getElementById('modal')
const modalHeaderTitle = document.getElementById('modalTitle')
const modalCloseButton = document.getElementById('buttonCloseModal')
let currentEditingTaskId = null

function setModalState(mode) {
  if (modalHeaderTitle)
    modalHeaderTitle.textContent = mode === 'edit' ? 'Редактировать задачу' : 'Добавить задачу'
  if (modalActionButton) modalActionButton.textContent = mode === 'edit' ? 'Сохранить' : 'Добавить'
}

function showModal(mode = 'add', text = '', taskId = null) {
  currentEditingTaskId = mode === 'edit' ? taskId : null
  inputTask.value = text
  setModalState(mode)
  if (modalEl) modalEl.style.display = 'block'
  inputTask.focus()
}

function hideModal() {
  if (modalEl) modalEl.style.display = 'none'
  currentEditingTaskId = null
  setModalState('add')
}

openAddModalButton.onclick = function () {
  showModal('add', '')
}

modalCloseButton.onclick = function () {
  hideModal()
}

modalActionButton.addEventListener('click', handleModalAction)
buttunClearSearch.addEventListener('click', () => {
  inputSearchTask.value = ''
  renderTasks()
})

inputSearchTask.addEventListener('input', renderTasks)
filterSelect.addEventListener('change', renderTasks)

function createTask() {
  const taskText = inputTask.value.trim()

  if (taskText === '') {
    alert('Пожалуйста, введите задачу')
    inputTask.focus()
    return
  }

  const taskId = 'task_' + new Date().getTime()

  const newTask = {
    id: taskId,
    text: taskText,
    completed: false,
    createdAt: new Date().toISOString(),
  }

  tasks.push(newTask)

  renderTasks()
  inputTask.value = ''
  hideModal()
}

function handleModalAction() {
  const text = inputTask.value.trim()
  if (text === '') {
    alert('Пожалуйста, введите задачу')
    return
  }

  if (currentEditingTaskId) {
    const task = tasks.find(t => t.id === currentEditingTaskId)
    if (!task) {
      currentEditingTaskId = null
      hideModal()
      return
    }
    task.text = text
    currentEditingTaskId = null
    hideModal()
    renderTasks()
    return
  }

  createTask()
}

function attachTaskHandlers(taskElement, taskId) {
  const icons = taskElement.querySelectorAll('.icons img')
  const editImg = icons[0]
  const deleteImg = icons[1]

  const checkbox = taskElement.querySelector('.checkbox')

  if (checkbox) {
    checkbox.addEventListener('change', () => {
      const taskIndex = tasks.findIndex(t => t.id === taskId)

      tasks[taskIndex].completed = !tasks[taskIndex].completed
      renderTasks()
    })
  }

  if (editImg) {
    editImg.addEventListener('click', () => {
      const task = tasks.find(t => t.id === taskId)
      if (!task) return
      showModal('edit', task.text, taskId)
    })
  }

  if (deleteImg) {
    deleteImg.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== taskId)
      renderTasks()
    })
  }
}
