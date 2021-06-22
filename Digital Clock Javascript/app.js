const clock = document.querySelector('.clock');

document.addEventListener("mousemove", e => {
    let x = (window.innerWidth / 2 - e.pageX) / 50;
    let y = (window.innerHeight / 2 - e.pageY) / 50;
    clock.style.transition = "0.1s ease"
    clock.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

document.addEventListener("mouseleave", e => {
    clock.style.transition = "0.5s ease"
    clock.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

setInterval(e => {
    const hours = document.querySelector("#hour");
    const min = document.querySelector("#min");
    const sec = document.querySelector("#sec");
    const ampm = document.querySelector("#ampm");

    let date = new Date();

    let h = '0' + date.getHours();
    let m = '0' + date.getMinutes();
    let s = '0' + date.getSeconds();
    let meridian = 'AM';

    if (h > 12) {
        h -= 12;
        meridian = 'PM'
    }

    hours.innerHTML = h.slice(-2);
    min.innerHTML = m.slice(-2);
    sec.innerHTML = s.slice(-2);
    ampm.innerHTML = meridian;

}, 1000);

