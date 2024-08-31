let profileMenu = document.getElementById("profileMenu")

function openUserMenu() {
    profileMenu.classList.toggle("open-menu")
}

// We are hide this because cursor:pointer are not working on the navbar.
// gsap.from(".navbar", {
//     y: -10,
//     opacity: 0,
//     delay: 0,
//     duration: 0.8,
//     stagger: 0.4
// })

gsap.from(".inputLinksBox", {
    y: 80,
    opacity: 0,
    delay: 0.1,
    duration: 1,
    stagger: 0.4
})


document.querySelectorAll(".copyText").forEach((element) => {
    const inputText = element.querySelector(".inputField");
    const copyBtn = element.querySelector("i");

    inputText.addEventListener("focus", () => {
        inputText.select();
    })

    copyBtn.addEventListener("click", () => {
        const text = inputText.placeholder;

        inputText.select();
        navigator.clipboard.writeText(text);

        inputText.placeholder = "Copied!"

        setTimeout(() => {
            inputText.placeholder = text;
        }, [1000])
    })


})