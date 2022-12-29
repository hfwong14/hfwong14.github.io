
var restNameList = [
    '吉野家',
    'Itamama',
    '太興',
    '八方雲集',
    'McDonald\'s',
    'Mos Burger',
    'Subway',
    '東泰',
    '南記',
    'KFC',
    '大快活',
    'Pizza Hut',
    '七喜',
    '鐵花村',
    '趣園麵家',
    '壽司'
]

var restCount = restNameList.length

function randomRest() {
    randomIndex = Math.floor(Math.random() * restCount);
    randomRestName = restNameList[randomIndex]
    document.getElementById('restNameDisplay').innerText = randomRestName
}

