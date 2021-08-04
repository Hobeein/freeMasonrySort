window.onload = () => {
  const squares = []
  const randomMax = 250
  for (let i = 0; i < 10; i++) {
    const { width, height } = random_width_height(randomMax)
    const bgColor = random_color()
    squares.push(createSquare(width, height, bgColor, i))
  }
  const viewBox = document.querySelector('.right-viewBox')
  appendElementToparent(viewBox, ...squares)
}

// 创造方块
function createSquare(width, height, bgColor, index = 'index') {
  const square = document.createElement('div')
  square.classList.add('square_' + index, 'draggable-item')
  square.style.position = 'absolute'
  square.style.cursor = 'move'
  square.style.width = width + 'px'
  square.style.height = height + 'px'
  square.style.backgroundColor = bgColor
  square.style.zIndex = 1
  square.onmousedown = (e) => {
    e.stopPropagation()
    move(e, square)
  }

  const resizer = createResizeBox(20, 20)
  resizer.onmousedown = (e) => {
    e.stopPropagation()
    resize(e, square)
  }

  square.appendChild(resizer)

  return square
}

// 创建重定义宽高的盒子
function createResizeBox(width, height) {
  const resizer = document.createElement('div')
  resizer.style.position = 'absolute'
  resizer.style.cursor = 'se-resize'
  resizer.style.width = width + 'px'
  resizer.style.height = height + 'px'
  resizer.style.right = 0
  resizer.style.bottom = 0
  resizer.style.borderRight = '2px solid #000000'
  resizer.style.borderBottom = '2px solid #000000'

  const innerResizer = document.createElement('div')
  innerResizer.style.position = 'absolute'
  innerResizer.style.width = '60%'
  innerResizer.style.height = '60%'
  innerResizer.style.right = '3px'
  innerResizer.style.bottom = '3px'
  innerResizer.style.borderRight = '2px solid #000000'
  innerResizer.style.borderBottom = '2px solid #000000'

  const inner_innerResizer = document.createElement('div')
  inner_innerResizer.style.position = 'absolute'
  inner_innerResizer.style.width = '60%'
  inner_innerResizer.style.height = '60%'
  inner_innerResizer.style.right = '3px'
  inner_innerResizer.style.bottom = '3px'
  inner_innerResizer.style.borderRight = '2px solid #000000'
  inner_innerResizer.style.borderBottom = '2px solid #000000'

  innerResizer.appendChild(inner_innerResizer)
  resizer.appendChild(innerResizer)
  return resizer
}

// 随机颜色
function random_color() {
  let color = '#'
  for (let x = 0; x < 6; x++) {
    color += Number.parseInt(Math.random() * 16).toString(16)
  }
  return color
}

// 随机宽高
function random_width_height(random_num_max) {
  const width = (Math.floor((Math.random() * random_num_max) + 1) + Math.floor((Math.random() * random_num_max) + 1))
  const height = (Math.floor((Math.random() * random_num_max) + 1) + Math.floor((Math.random() * random_num_max) + 1))
  return { width, height }
}

// 将创建的HTMLElementObject插入到选定的父元素里
function appendElementToparent(parent, ...squares) {
  for (const square of squares) {
    parent.appendChild(square)
  }
}
