const dock = document.querySelector('.dock');
let dockList = dock.querySelectorAll('li');

dockList.forEach(li => [
    li.addEventListener('click', _ => {
        li.classList.add('opened')
        console.log('clicked on ' + li);
        // li.style.marginBottom = "15px";
        // console.log(li.style);
    })
]);
