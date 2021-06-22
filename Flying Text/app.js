const text = document.querySelector(".text");

text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

// console.log(document.querySelectorAll('span'))
const animation = anime.timeline({
    targets: '.text span',
    easing: 'easeInOutExpo',
    loop: true
});

console.log(animation);

animation
    .add({
        rotate: () => {
            return anime.random(-360, 360);
        },
        translateX: () => {
            return anime.random(-500, 500);
        },
        translateY: () => {
            return anime.random(-500, 500);
        },
        duration: 5000,
        delay: anime.stagger(5)
    })
    .add({
        rotate: 0,
        translateX: 0,
        translateY: 0,
        duration: 5000,
        delay: anime.stagger(5)
    });


