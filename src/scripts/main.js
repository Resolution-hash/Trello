

let menuItem = document.querySelectorAll('.menu__item')
let lastClicked = menuItem[0];

for (let i = 0; i < menuItem.length; i++) {
  menuItem[i].addEventListener('click', function () {
    lastClicked.classList.remove('menu__item_active')
    this.classList.add('menu__item_active')

    lastClicked = this
  })
}



//Плавная прокрутка 
menuItem.forEach(link => {
  // Выполняем функция 1 раз для каждого элемента
  link.addEventListener('click', function (e) {
    // Отменяем дефолтное действие при нажатии на ссылку
    e.preventDefault()

    // Получаем значение в атрибуте href
    const href = this.getAttribute('href').substring(1)
    console.log(href)

    //находим id со значением href
    const scrollTarget = document.getElementById(href)
    console.log(scrollTarget)

    // Получаем позици элемента от начала vieport
    const elementPosition = scrollTarget.getBoundingClientRect().top
    console.log(elementPosition)

    const topOffset = 50
    const offsetPosition = elementPosition + topOffset
    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth"
    })
  })
})




// let lastClickedTab = tabItem[0]

// for (let i = 0; i < tabItem.length; i++) {
//   tabItem[i].addEventListener('click', function () {
//   //получаем data-атрибут у нажатого таба
//     let tabId = tabItem[i].getAttribute('data-tab')
//     console.log(tabId)
//   //Находим элемент по id
//     let currentTab = document.querySelector(tabId)
//     console.log(currentTab)

//     currentTab.classList.add('active')


//     lastClickedTab.classList.remove('tabs__item_active')
//     tabItem[i].classList.add('tabs__item_active')

//     lastClickedTab = this

//   })
// }
const tabItem = document.querySelectorAll('a.tabs__item')
const cardBlock = document.querySelectorAll('.card__block')

tabItem.forEach(function(item){
  item.addEventListener('click', function () {
    console.log(item)
    let tabId = item.getAttribute('data-tab')
    console.log(tabId)
  //Находим элемент по id
    let currentCardBlock = document.querySelector(tabId)
    console.log(currentCardBlock)

    cardBlock.forEach(function(item){
      item.classList.remove('card__block_active')
    })

    tabItem.forEach(function(item){
      item.classList.remove('tabs__item_active')
    })

    item.classList.add('tabs__item_active')
    currentCardBlock.classList.add('card__block_active')
    
  })
})
