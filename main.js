// 整個十進位section
const decInput = document.querySelector('.dec-input')
// 十進位輸入框
const redInput = document.querySelector('#red-input')
const greenInput = document.querySelector('#green-input')
const blueInput = document.querySelector('#blue-input')
// 十進位顏色顯示
const redDisplay = document.querySelector('#red-display')
const greenDisplay = document.querySelector('#green-display')
const blueDisplay = document.querySelector('#blue-display')
//十進位按鈕
const button = document.querySelector('button')
// 16進位
const hexInput = document.querySelector('#hex-input')
const hexDisplay = document.querySelector('#hex-display')
const guide = document.querySelector('.guide')
const alphaValue = document.querySelector('.alpha-value')
//整個滑桿section
const sliderChange = document.querySelector('.slider-change')
// 滑桿
const redSlider = document.querySelector('#red-slider')
const greenSlider = document.querySelector('#green-slider')
const blueSlider = document.querySelector('#blue-slider')
// 滑桿顏色顯示
const redSliderDisplay = document.querySelector('#red-slider-display')
const greenSliderDisplay = document.querySelector('#green-slider-display')
const blueSliderDisplay = document.querySelector('#blue-slider-display')
//滑桿16進位顯示
const sliderValue = document.querySelector('.slider-value')
//全域功能
const body = document.querySelector('body')
const title = document.querySelector('.title')

//按ESC可清空全部數值及狀態
body.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    console.log(`按下『${event.key}』鍵`)
    hexInput.classList.remove('is-invalid', 'is-valid')
    displayHint('esc', 1000)
    cleanDisplay()
  }
})


//監聽10進位
decInput.addEventListener('keyup', event => {
  console.log(`${event.target.id} 輸入${event.target.value}觸發keyup事件`)
  processDecValue(redInput.value, greenInput.value, blueInput.value)
})

// 監聽10進位按鈕
button.addEventListener('click', event => {
  console.log(`點擊『${event.target.innerText}』`)
  processDecValue(redInput.value, greenInput.value, blueInput.value)
})
//打包10進位轉換，處理並輸出到toDisplay
function processDecValue(redValue, greenValue, blueValue) {
  let red = decCorrect(redValue)
  let green = decCorrect(greenValue)
  let blue = decCorrect(blueValue)
  //組合為HEX
  let hexColor = toHexColor(red, green, blue)
  //輸出所有輸入框及色塊
  toDisplay(red, green, blue, hexColor)
}

//轉換成HEX，大於255皆為255，小於0為及其他狀況歸零
function decCorrect(decValue) {
  let num = Math.floor(Number(decValue))
  //if-else return的縮寫
  return num >= 0 && num <= 255 ? num
    : num > 255 ? 255
      : 0
  //正寫如下
  // if (num >= 0 && num <= 255) {
  //   return num
  // } else if (num < 0) {
  //   return 0
  // } else if (num > 255) {
  //   return 255
  // } else { return 0 }
}
//轉換成HEX後，用來幫hex值補零
function fixZero(hexValue) {
  //縮寫
  return hexValue.length === 1
    ? `0${hexValue}`
    : hexValue
  // if (hexValue.length === 1) {
  //   return `0${hexValue}`
  // } else {
  //   return hexValue
  // }
}
//RGB組裝成HEX Code，可用template literal
function toHexColor(red, green, blue) {
  return `${fixZero(red.toString(16)).toUpperCase()}${fixZero(green.toString(16)).toUpperCase()}${fixZero(blue.toString(16)).toUpperCase()}`
}

// 監聽16進位
hexInput.addEventListener('change', event => {
  console.log(`${event.target.id}輸入 ${hexInput.value}`)
  let hexValue = hexInput.value
  if (findNaN(hexValue)) {
    cleanDisplay()
  } else if (hexValue.length === 3) {
    let red = toDec(hexValue, 0)
    let green = toDec(hexValue, 1)
    let blue = toDec(hexValue, 2)
    let hexColor = toHexColor(red, green, blue)
    console.log(`輸入有效3位數`)
    toDisplay(red, green, blue, hexColor)
  } else if (hexValue.length === 4) {
    let red = toDec(hexValue, 0)
    let green = toDec(hexValue, 1)
    let blue = toDec(hexValue, 2)
    let alpha = toDec(hexValue, 3)
    let hexColor = toHexColor(red, green, blue)
    alpha = Math.round((alpha / 255) * 1000) / 1000
    console.log(`輸入4位數，alpha的透明度${alpha}`)
    toDisplay(red, green, blue, hexColor, 'rgba', alpha)
  } else if (hexValue.length === 6) {
    let red = parseInt(hexValue.slice(0, 2), 16)
    let green = parseInt(hexValue.slice(3, 5), 16)
    let blue = parseInt(hexValue.slice(-2), 16)
    let hexColor = toHexColor(red, green, blue)
    console.log(`輸入6位數`)
    toDisplay(red, green, blue, hexColor)
  } else {
    console.log(`輸入無效${hexValue.length}位數`)
    cleanDisplay()
  }
})
//找到NaN回傳true，沒有NaN則回傳false並紀錄找到幾個NaN
function findNaN(hexValue) {
  let record = 0
  for (let i = 0; i < hexValue.length; i++) {
    let decValue = parseInt(hexValue[i], 16)
    if (isNaN(decValue)) {
      // console.log(`第${i + 1}個值『${hexValue[i]}』為NaN`)
      record++
    }
  }
  switch (record) {
    case 0:
      return false
    default:
      // console.log(`共找到${record}個NaN`)
      return true
  }
}
//轉換3位數及4位數縮寫成6位數，轉再換成十進位
function toDec(hexValue, index) {
  let color = hexValue[index] + hexValue[index]
  color = parseInt(color, 16)
  return color
}


//用keyup即時更新狀態跟色塊
hexInput.addEventListener('keyup', () => {
  let hexValue = hexInput.value
  // 即時更新HEX色塊
  // console.log(`${event.target.id}即時顯示的色碼#${hexValue}`)
  hexDisplay.style.backgroundColor = `#${hexValue}`

  //即時判斷輸入內容是否在範圍內
  if (findNaN(hexValue) || hexValue.length < 3 || hexValue.length === 5) {
    hexInput.classList.add('is-invalid')
    hexInput.classList.remove('is-valid')
  } else {
    hexInput.classList.remove('is-invalid')
    hexInput.classList.add('is-valid')
  }
  // 根據輸入內容長度切換提示
  switch (hexValue.length) {
    case 1:
    case 2:
      guide.classList.remove('support')
      break
    case 3:
    case 4:
      guide.classList.add('support')
      break
    default:
      guide.classList.remove('support')
      break
  }

})
//16進位輸入取得焦點時，顯示操作提示
hexInput.addEventListener('focus', () => {
  displayHint('input', 3000)
})
//16進位輸入失去焦點時，清除輸入位數提示狀態
hexInput.addEventListener('blur', () => {
  guide.classList.remove('support')
  // hexInput.classList.remove('is-invalid', 'is-valid')
})

// 監聽滑桿
sliderChange.addEventListener('change', event => {
  console.log(`${event.target.id} 變為${event.target.value}，觸發change事件`)
  let red = Number(redSlider.value)
  let green = Number(greenSlider.value)
  let blue = Number(blueSlider.value)
  let hexColor = toHexColor(red, green, blue)
  toDisplay(red, green, blue, hexColor)
})

//輸出至色塊、輸入框、色碼
function toDisplay(red, green, blue, hexColor, colorCode = 'rgb', alpha = 0) {
  //清除「hexInput」狀態
  hexInput.classList.remove('is-invalid', 'is-valid')
  // 輸出紅色值跟色塊
  redDisplay.style.backgroundColor = `rgb(${red}, 0, 0)`
  redSliderDisplay.style.backgroundColor = `rgb(${red}, 0, 0)`
  redInput.value = red
  redSlider.value = red
  redSliderDisplay.innerText = red
  // 輸出綠色值跟色塊
  greenDisplay.style.backgroundColor = `rgb(0, ${green}, 0)`
  greenSliderDisplay.style.backgroundColor = `rgb(0, ${green}, 0)`
  greenInput.value = green
  greenSlider.value = green
  greenSliderDisplay.innerText = green
  green >= 190
    ? greenSliderDisplay.style.color = "#323232"
    : greenSliderDisplay.style.color = "white"
  // 輸出藍色值跟色塊
  blueDisplay.style.backgroundColor = `rgb(0, 0, ${blue})`
  blueSliderDisplay.style.backgroundColor = `rgb(0, 0, ${blue})`
  blueInput.value = blue
  blueSlider.value = blue
  blueSliderDisplay.innerText = blue
  //輸出Ｈex值跟全色塊
  hexInput.value = hexColor
  sliderValue.innerText = `#${hexColor}`
  switch (colorCode) {
    case 'rgb':
      hexDisplay.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
      alphaValue.style.display = "none"
      break
    case 'rgba':
      hexDisplay.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
      alphaValue.innerHTML = `Alpha值為<br><big>${(alpha * 100).toFixed(2)}%</big>`
      alphaValue.style.display = "block"
      break
    default:
      hexDisplay.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
      break;
  }
  hexDisplay.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
  //輸出背景
  body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
  //轉換標題顏色
  red + green + blue < 470 || green < 200
    ? title.style.color = 'WhiteSmoke'
    : title.style.color = '#4c4c4c'
  console.log(`紅：${red} | 綠：${green} | 藍:${blue}|α：${alpha}｜色彩模式：${colorCode}`)
  //顯示ESC鍵操作提示
  displayHint('esc', 2000)
}
// 清空所有色塊、輸入框、色碼
function cleanDisplay() {
  // 輸出紅色值跟色塊
  redDisplay.style.backgroundColor = '#FFF'
  redSliderDisplay.style.backgroundColor = '#FFF'
  redInput.value = ""
  redSlider.value = ""
  redSliderDisplay.innerText = ""
  // 輸出綠色值跟色塊
  greenDisplay.style.backgroundColor = '#FFF'
  greenSliderDisplay.style.backgroundColor = '#FFF'
  greenInput.value = ""
  greenSlider.value = ""
  greenSliderDisplay.innerText = ""
  // 輸出藍色值跟色塊
  blueDisplay.style.backgroundColor = '#FFF'
  blueSliderDisplay.style.backgroundColor = '#FFF'
  blueInput.value = ""
  blueSlider.value = ""
  blueSliderDisplay.innerText = ""
  //清空Alpha值
  alphaValue.style.display = ""
  //輸出Ｈex值跟全色塊
  hexInput.value = ""
  sliderValue.innerText = "＃"
  hexDisplay.style.backgroundColor = '#FFF'
  //輸出背景
  body.style.backgroundColor = '#faf9f6'
  console.log('清空色塊、輸入框、色碼')
}

//左下方半透明操作提示
const hint = document.querySelector('.hint')
function displayHint(type, duration = 1500) {
  switch (type) {
    case 'esc':
      hint.style.display = ""
      hint.innerText = '按下ESC鍵，即可清空所有輸入內容'
      hint.classList.add('visible')
      setTimeout(() => {
        hint.classList.remove('visible')
      }, duration)
      break
    case 'input':
      hint.style.display = ""
      hint.innerText = '離開輸入框後，將立即開始轉換'
      hint.classList.add('visible')
      setTimeout(() => {
        hint.classList.remove('visible')
      }, duration)
      break
  }
}