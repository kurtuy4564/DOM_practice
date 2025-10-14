const modalAddTask = $.modal({
  title: 'Добавить задачу',
  textButton: 'Добавить',
  actionButton: function () {
    createTask()
  },
})

const modalEditTask = $.modal({
  title: 'Редактировать задачу',
  textButton: 'Сохранить',
  actionButton: function (value, modal) {
    if (typeof value !== 'string' || value.trim() === '') {
      alert('Пожалуйста, введите задачу')
      return
    }

    const task = tasks.find(t => t.id === currentEditingTaskId)
    if (!task) {
      currentEditingTaskId = null
      modal.close()
      return
    }

    task.text = value.trim()
    currentEditingTaskId = null
    modal.close()
    renderTasks()
  },
})

let localStorageTasks = localStorage.getItem('tasks')
let tasks = localStorageTasks ? JSON.parse(localStorageTasks) : []

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
      tasksContainer.innerHTML = '<div class="empty-message">Упс, пусто</div>'
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

const modalActionButton = document.getElementById('addButton')
const tasksContainer = document.getElementById('todoList')

const openAddModalButton = document.getElementById('openModal')
const modalEl = document.getElementById('modal')
const modalHeaderTitle = document.getElementById('modalTitle')
const modalCloseButton = document.getElementById('buttonCloseModal')
let currentEditingTaskId = null

openAddModalButton.onclick = function () {
  modalAddTask.open()
}

buttunClearSearch.addEventListener('click', () => {
  inputSearchTask.value = ''
  renderTasks()
})

inputSearchTask.addEventListener('input', renderTasks)
filterSelect.addEventListener('change', renderTasks)

function createTask() {
  const taskText = modalAddTask.getValue().trim()

  if (taskText === '') {
    alert('Пожалуйста, введите задачу')
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
  modalAddTask.close()
}

function handleModalAction() {
  const task = tasks.find(t => t.id === currentEditingTaskId)
  console.log(task)

  const text = modalEditTask.EditValue(task.text).trim()

  if (text === '') {
    alert('Пожалуйста, введите задачу')
    return
  }

  if (currentEditingTaskId) {
    if (!task) {
      currentEditingTaskId = null
      modalEditTask.close()
      return
    }
    task.text = text
    currentEditingTaskId = null
    modalEditTask.close()
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
      currentEditingTaskId = taskId
      modalEditTask.EditValue(task.text)
      modalEditTask.open()
    })
  }

  if (deleteImg) {
    deleteImg.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== taskId)
      renderTasks()
    })
  }
}
