
const boardRegions = document.querySelectorAll('#gameBoard span')
let vBoard = []
let turnPlayer = ''
const root = document.querySelector(':root')
const main = document.querySelector('main')

document.getElementById('themeSwitcher').addEventListener('click', function() {
  if(main.dataset.themes === 'light'){
      root.style.setProperty('--bg-color', '#212529')
      root.style.setProperty('--border-color', '#666')
      root.style.setProperty('--font-color', '#f1f5f9')
      root.style.setProperty('--primary-color', '#4dff91')
      main.dataset.themes = 'dark'
  }else {
      root.style.setProperty('--bg-color', '#f1f5f9')
      root.style.setProperty('--border-color', '#ddd')
      root.style.setProperty('--font-color', '#212529')
      root.style.setProperty('--primary-color', '#26834a')
      main.dataset.themes = 'light'
  }
})

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
  turnPlayer = 'player1'

  updateTitle()

  boardRegions.forEach(function (element) {
    element.addEventListener('click', handleBoardClick)
  })
}

function remove() {
  document.getElementById('player1').value = ''
  document.getElementById('player2').value = ''
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
  boardRegions.forEach(function(element){
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursor-pointer')
  })
}

function verificaSpan() {
  const win = []
  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    win.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    win.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    win.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    win.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    win.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    win.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    win.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    win.push("0.2", "1.1", "2.0")
  return win
}

function desabilitado(element) {
  element.classList.remove('cursor-pointer')
  element.removeEventListener('click', handleBoardClick)
}

function pintaRegion(regions) {
  regions.forEach(function(region){
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML = playerName + ' venceu!'
}

function handleBoardClick(ev) {
  const span = ev.currentTarget
  const region = span.dataset.region 
  const rowColumnPair = region.split('.')
  const row = rowColumnPair[0]
  const column = rowColumnPair[1]

  if (turnPlayer === 'player1') {
    span.innerText = 'X'
    vBoard[row][column] = 'X'
  } else {
    span.innerText = 'O'
    vBoard[row][column] = 'O'
  }

  console.clear()
  console.table(vBoard)
  desabilitado(span)

  const winVenc = verificaSpan()
  if(winVenc.length > 0) {
    pintaRegion(winVenc)
  }else if(vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1'? 'player2':'player1'
    updateTitle()
  }else{
    document.querySelector('h2').innerHTML = 'Empate!'
  }
}
document.getElementById('reiniciar').addEventListener('click', remove)

// Adiciona o evento no botão que inicia o jogo
document.getElementById('start').addEventListener('click', initializeGame)