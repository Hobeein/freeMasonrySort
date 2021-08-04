window.onload = () => {
  const squares = []
  const randomMax = 250
  for (let i = 0; i < 10; i++) {
    const square = document.createElement('div')
    square.classList.add('square_' + i, 'draggable-item')
    const width = (Math.floor((Math.random() * randomMax) + 1) + Math.floor((Math.random() * randomMax) + 1))
    const height = (Math.floor((Math.random() * randomMax) + 1) + Math.floor((Math.random() * randomMax) + 1))
    let bgColor = '#'
    for (let x = 0; x < 6; x++) {
      bgColor += Number.parseInt(Math.random() * 16).toString(16)
    }
    square.style.position = 'absolute'
    square.style.cursor = 'move'
    square.style.width = width + 'px'
    square.style.height = height + 'px'
    square.style.backgroundColor = bgColor
    square.onmousedown = (e) => {
      e.stopPropagation()
      move(e, square)
    }
    squares.push(square)
  }
  const viewBox = document.querySelector('.right-viewBox')
  for (const square of squares) {
    viewBox.appendChild(square)
  }
}