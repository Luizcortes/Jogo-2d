const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false,
        hold: false
    },
    space: {
        pressed: false,
        hold: false      
    },

}


window.addEventListener("keydown", e  => {
    let key = e.key

    switch(key) {
        case "arrowLeft":
        case "a":
            keys.a.pressed = true 
            player.lastKeyPressed = key 
            break
        case "arrowRight":
        case "d":
            keys.d.pressed = true 
            player.lastKeyPressed = key 
            break
        case "arrowUp":    
        case "w":
            keys.w.pressed = true 
            break
        case "z":
        case "space":
            keys.space.pressed = true 
            break
    }
})

window.addEventListener("keyup", e  => {
    let key = e.key

    switch(key) {
        case "arrowLeft":
        case "a":
            keys.a.pressed = false
            break
        case "arrowRight":
        case "d":
            keys.d.pressed = false
            break
        case "arrowUp":    
        case "w":
            keys.w.pressed = false 
            keys.w.hold = false
            break
        case "z":
        case "":
            keys.space.pressed = false
            keys.space.hold = false 
            break
    }
})

function handlecontrole() {
    player.setSprite("idle")

    if (!player.onGround) player.setSprite("jumping")
    if (player.isAttacking) player.setSprite("attacking")
    movement()
    attacks()
    function movement() {
        player.velocity.x = 0 
        if (player.isAttacking) return

        if (keys.a.pressed  && ["a", "arrowleft"].includes(player.lastKeyPressed)) {
            player.velocity.x = -1.5 * 3.5
            player.facing = "left"

            if (!player.onGround) return
            
            player.setSprite("running")
        }

        if (keys.d.pressed  && ["d", "arrowRigth"].includes(player.lastKeyPressed)){
            player.velocity.x = 1.5 * 3.5 
            player.facing = "right"

            if (!player.onGround) return
            
            player.setSprite("running")
        }

        if (keys.w.pressed && !keys.w.hold) {
            player.jump()
            keys.w.hold = true 

            player.setSprite("jumping")
        }
    }
    function attacks() {
        if (keys.space.pressed && !keys.space.hold) {
            player.attack()
            keys.space.hold = true 
        }
    }
}