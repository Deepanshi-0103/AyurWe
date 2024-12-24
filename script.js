gsap.to("#nav",{
    backgroundColor:"#F1C6C1",
    duration: 1,
    height:"100px",
    scrollTrigger:{
        trigger:"#nav",
        scroller:"body",
        // markers:"true",
        start: "top -10%",
        end: "top -11%",
        scrub: 3   /*for smoothness */
    }
})
gsap.to("#main",{
    backgroundColor:"#B7C5A8",
    scrollTrigger:{
        trigger:"#main",
        scroller:"body",
        start:"top -30%",
        end:"top -70%",
        scrub: 2
    }
})
