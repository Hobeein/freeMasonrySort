window.onload = () => {
  const squares = []
  for (let i = 0; i < 10; i++) {
    const square = document.createElement('div')
    square.classList.add('square_' + i, 'draggable-item')
    const width = (Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1))
    const height = (Math.floor((Math.random() * 100) + 1) + Math.floor((Math.random() * 100) + 1))
    const bgColor = '#'
    for (var i = 0; i < 6; i++) {
      bgColor += parseInt(Math.random() * 16).toString(16)
    }
    square.style.width = width + 'px'
    square.style.height = height + 'px'
    square.style.backgroundColor = bgColor
    squares.push(square)
  }
  const viewBox = document.querySelector('.right-viewBox')
  console.log(viewBox)
  console.log(squares)
  for (const square of squares) {
    viewBox.appendChild(square)
  }
}