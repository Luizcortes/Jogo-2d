const gravity = 0.4

const floorHeight = 96

const backgroundSpritePath = "../assets/placeholder.png"
const defautObjectSpritePath = "../assets/objects/square.svg"

class sprite{
    constructor({position, velocity, source, scale, offset, sprite}) {
        this.position = position
        this.velocity = velocity
        

        this.scale = scale || 1
        this.image = new image()
        this.image.src = source || defautObjectSpritePath

        this.width = this.image.width * this.scale
        this.height = this.image.height * this.scale

        this.offset = offset || {
            x: 0,
            y: 0 
        }
        this.sprite = sprite || {
            idle: {
                src: this.image.scr,
                totalSpriteFrames: 1,
                framesPerSpriteFrame: 1,
            }
        }

        this.currentSprite = this.sprite.idle

        this.elapsedTime = 0
        this.currentSpriteFrame = 0
        this.totalSpriteFrames = this.sprite.idle.totalSpriteFrames
        this.framesPerSpriteFrame = this.sprite.edle.framesPerSpriteFrame
   
}

setSprite(sprite){
    this.currentSprite = this.sprites[sprite]

    if(!this.currentSprite) {
        this.currentSprite = this.sprite.idle

    }
}
loadSprite(sprite) {
    let previousSprite = this.image.src

    this.image = new image()
    this.image.src = this.currentSprite.src
    this.width = this.image.width * this.scale
    this.height = this.image.height * this.scale

    this.totalSpriteFrames = this.currentSprite.totalSpriteFrames
    this.framesPerSpriteFrame = this.currentSprite.framesPerSpriteFrame

    let newsprite = this.image.src

    if (previousSprite !== newSprite) {

        console.log("detected sprite change: ", previousSprite.split("/").pop(), "->" , newSprite.split("/").pop())

        let previousSpriteimage = new this.image()
        previousSpriteimage.src = previousSprite

        this.position.y += (previousSpriteImage.height - this.image.height) * this.scale  
    }

}

    draw() {
        ctx.imageSmoothingEnabled = false
        const xScale = this.facing === "left" ? -1 : 1;

        ctx.save()
        ctx.translate(this.position.x + this.offset, this.position.y + this.offset);

        ctx.drawImage(
            this.image,
            this.currentSpriteFrame * this.image.width / this.totalSpriteFrames,
            0,
            this.image.width / this.totalSpriteFrames,
            this.image.height,
            0,
            0,
            this.width / this.totalSpriteFrames * xScale,
            this.height,
        )

        ctx.restore()
    }

    animate() {
        this.elapsedTime += 1

        if (this.elapsedTime >= this.framesPerSpriteFrame) {
            this.currentSpriteFrame += 1
            
            if (this.currentSpriteFrame >= this.totalSpriteFrames) {
                this.currentSpriteFrame = 0
            }
            this.elapsedTime = 0 

        }
    }

    update() {
        this.draw()
        this.animate()
      
    }
}

class fighter extends sprite {
    constructor({
        position,
        velocity,
        sprites,
        scale
        
    }) {
        super({
            position,
            velocity,
            scale,
            sprites
            

        })

        this.velocity = velocity
      
        this.isAttacking
        this.attackCooldown = 350
        this.onAttackcooldown

        this.lastKeyPressed

        this.onGround
    }

    gravity() {
    if (this.position.y+this.height >= canvas.height - floorHeight){
        this.onGround = true 
    } else {
        this.onGround = false
    }
    if (this.position.y+this.height > canvas.height - floorHeight) {
        this.position.Y = canvas.height-this.height - floorHeight
        this.velocity.y = 0 
    } else {
       if(!this.onGround) this.velocity.y += gravity
    }

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
}
update() {
    this.gravity()
    this.loadSprite()

    this.draw() 
    this.animate()
}

    attack() {
        if (this.onAttackcooldown) return

        this.isAttacking = true
        this.onAttackcooldown = true

        player.setSprite("attaking")

        setTimeout(() => {
            this.isAttacking = false
        }, 200)

        setTimeout(() => {
            this.onAttackcooldown = false
        }, this.attackCooldown)
    }   

    jump() {
        if(this.onGround) return
        this.velocity.y = -9.6
    }

}


const player = new fighter({
    position: {
        x: 100,
        y: 0
    },
    velocity: {
    x: 0,
    y: 10
    },
    scale:4,
    sprites: {
        idle: {
            src: "../assets/player/idle.png",
            totalSpriteFrames: 11,
            framesPerSpriteFrame: 18 
        },
        running: {
            src: "../assets/player/running.png",
            totalSpriteFrames: 10,
            framesPerSpriteFrame: 18
        },
        jumping: {
            src: "../assets/player/jumping.png",
            totalSpriteFrames: 4,
            framesPerSpriteFrame: 8
        },
        attaking: {
            src: "../assets/player/attaking.png",
            totalSpriteFrames: 7,
            framesPerSpriteFrame: 9  
        }
    }
    
})

const background = new sprite( {
    position: {
        x: 0,
        y: 0 
    },
    source: backgroundSpritePath
})