let profileMenu = document.getElementById("profileMenu")

function openUserMenu() {
    profileMenu.classList.toggle("open-menu")
}

gsap.from(".navbar", {
    y: -10,
    opacity: 0,
    delay: 0,
    duration: 0.8,
    stagger: 0.4
})

gsap.from(".inputLinksBox", {
    y: 80,
    opacity: 0,
    delay: 0.1,
    duration: 1,
    stagger: 0.4
})