window.onload = () => {
  const squares = []
  const randomMax = 250
  for (let i = 0; i < 10; i++) {
    const { width, height } = random_width_height(randomMax)
    const bgColor = random_color()
    squares.push(createSquare(width, height, bgColor, i))
  }
  const viewBox = document.querySelector('.right-viewBox')
  appendSquare(viewBox, ...squares)
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
  square.onmousedown = (e) => {
    e.stopPropagation()
    move(e, square)
  }
  return square
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

// 将创建的方块插入到选定的父元素里
function appendSquare(parent, ...squares) {
  for (const square of squares) {
    parent.appendChild(square)
  }
}
