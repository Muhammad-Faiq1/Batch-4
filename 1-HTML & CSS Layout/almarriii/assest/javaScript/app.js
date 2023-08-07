const sr = ScrollReveal({
    distance: '65px',
    duration: 2400,
    delay: 450,
    reset: true
})
sr.reveal('.content', { delay: 200, origin: 'top' })
sr.reveal('.content-img', { delay: 450, origin: 'right' })
sr.reveal('.icons', { delay: 500, origin: 'left' })
sr.reveal('.scroll-down', { delay: 500, origin: 'right' })