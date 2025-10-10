const list = document.getElementById('list')
const search = document.getElementById('search')
const btnSearch = document.getElementById('search-btn')
const btnNote = document.getElementById('btn-note')
const btnModalClose = document.getElementById('btn')
const menu = document.getElementById('menu')
let activeTag = 1
let editinItem=null
const tags = [
    {
        id:1,
        title:'Все'   
    },
    {
        id:2,
        title:'Идея'    
    },
    {
        id:3,
        title:'Личное'    
    },
    {
        id:4,
        title:'Работа'    
    },
{
        id:5,
        title:'Список покупок'    
    }]
const notes = [
    {
    id:1,
    title:'Сдать отчет',
    tag: 4,
    updateAt: new Date().toDateString()//сделать сюда формат date string типа
    },
    {
    id:2,
    title:'Note 2',
    tag: 3,
    updateAt: new Date().toDateString()
    },
    {
    id:3,
    title:'Note 2',
    tag: 3,
    updateAt: new Date().toDateString()
    }

]
search.addEventListener('keydown', function(event) { //Поиск по нажатию Enter
    if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault(); // Предотвращаем стандартное действие Enter
    btnSearch.click();   // Имитируем клик по кнопке
}
});

function createTag(tag){
    const element = document.createElement('li')
    element.classList.add('list-item')
    element.innerText = tag.title
    return element
}



function createNote(note){
    const element = document.createElement('div')
    element.classList.add("list_otch")

    const title = document.createElement('span')
    title.innerText = note.title
    title.classList.add("list_otch-title")

    const date = document.createElement('span')
    date.classList.add("list_otch-date")
    date.innerText = new Date().toDateString()

    const tag = document.createElement('span')
    tag.classList.add("list_otch-tag")
    tag.innerText = tags.find( obj => obj.id === note.tag).title
    
    
    element.appendChild(title)
    element.appendChild(date)
    element.appendChild(tag)
    return element
}
function getNotes(searchValue){
    const filteredNotes =  notes.filter((i) => {
        return i.title.startsWith(searchValue)
    })
    return filteredNotes
}
function renderMenu(){
    for(let tag of tags){
        const element = createTag(tag)
        element.addEventListener("click",() =>{
            activeTag = tag.id
            render()
        })
        menu.appendChild(element)
    }
}



function render(){
    list.innerHTML=''
    let filtered=getNotes(search.value)

    // let filtered = notes
    if (activeTag !== 1){
        filtered=filtered.filter(i => i.tag === activeTag)

    }
    if(filtered.length === 0){
        list.innerText = 'Ничего не найдено('
        return
    }
    for (let i of filtered){
        const element = createNote(i)
        list.appendChild(element)
    }

}
function init(){
    // const list = document.getElementById('list')
    // for (let i of notes){
    //     const element = createNote(i)
    //     list.appendChild(element)
    // }
    renderMenu()
    render()
    btnSearch.addEventListener('click',render)
    btnNote.addEventListener('click', openModal)
}
init()