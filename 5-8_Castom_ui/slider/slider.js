{
  const srcImageList = [
    './images/img (1).jpg',
    './images/img (2).jpg',
    './images/img (3).jpg',
    './images/img (4).jpg',
    './images/img (5).jpg',
    './images/img (6).jpg',
  ]

  let currentIndexImg = 1

  const firstImg = document.querySelector('.slider__first-img')
  const mainImg = document.querySelector('.slider__main-img')
  const lastImg = document.querySelector('.slider__last-img')

  document.addEventListener('DOMContentLoaded', () => {
    render()
  })

  function render() {
    mainImg.src = srcImageList[currentIndexImg]

    if (currentIndexImg < 1) {
      firstImg.src = './images/white.png'
    } else {
      firstImg.src = srcImageList[currentIndexImg - 1]
    }

    if (currentIndexImg > srcImageList.length - 2) {
      lastImg.src = './images/white.png'
    } else {
      lastImg.src = srcImageList[currentIndexImg + 1]
    }
  }

  firstImg.addEventListener('click', () => {
    if (currentIndexImg < 1) return

    currentIndexImg--
    render()
  })
  lastImg.addEventListener('click', () => {
    if (currentIndexImg > srcImageList.length - 2) return

    currentIndexImg++
    render()
  })
}
