const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = 676;

const gravity = 0.5;
const platformImage = new Image();
platformImage.src = 'Images/platform.png';

const hillsImage = new Image();
hillsImage.src = 'Images/hills.png';

const backgroundImage = new Image();
backgroundImage.src = 'Images/background.png';

const platformSmallTallImage = new Image();
platformSmallTallImage.src = 'Images/platformSmallTall.png';

const spriteRunLeftImage = new Image();
spriteRunLeftImage.src = 'Images/spriteRunLeft.png';
const spriteRunRightImage = new Image();
spriteRunRightImage.src = 'Images/spriteRunRight.png';
const spriteStandLeftImage = new Image();
spriteStandLeftImage.src = 'Images/spriteStandLeft.png';
const spriteStandRightImage = new Image();
spriteStandRightImage.src = 'Images/spriteStandRight.png';
let win = 0;

class Player {
    constructor() {
        this.speed = 10,
        this.position = {
            x: 100,
            y: 100
        };
        this.image = spriteStandRightImage
        this.width = 66;
        this.height = 150;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.frames = 0
        this.sprites = {
            stand :{
                right:spriteStandRightImage,
                left:spriteStandLeftImage,
                cropWidth:177,
                width:66
               // left:spriteStandLeftImage
            },
            run:{
                right:spriteRunRightImage,
                left:spriteRunLeftImage,
                cropWidth:341,
                width:127.875

                // left:spriteRunLeftImage
            }

        }
        this.currentImage = this.sprites.stand.right;
        this.cureentCropwidth = 177;
    }

    draw() {
        c.drawImage(this.currentImage,
            this.cureentCropwidth * this.frames,
            0,
            this.cureentCropwidth ,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height);
    }

    update() {
        this.frames++
        if(this.frames > 28 ){
            this.frames = 0
        }else if(this.frames > 29 && this.currentImage === this.sprites.run.right){
            this.frames = 0
        }
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } 
    }
}

class Platform {
    constructor(image, x, y) {
        this.position = {
            x,
            y,
        };
        this.image = image;
        this.height = image.height;
        this.width = image.width;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}
class GenericObject {
    constructor(image, x, y) {
        this.position = {
            x,
            y,
        };
        this.image = image;
        this.height = image.height;
        this.width = image.width;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

let player = new Player();
let platforms = [
    ];
let genericObjects = [
    ]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

let scrollOffset = 0;
function init(){

     player = new Player();
     platforms = [
        new Platform(platformImage, 0, 550), 
        new Platform(platformImage, 500, 550),
        new Platform(platformImage, 1200, 550),
        new Platform(platformImage, 2000, 480),
        new Platform(platformImage, 2400, 400),
        new Platform(platformImage, 2800, 550),
        new Platform(platformImage, 3200, 550),
        new Platform(platformSmallTallImage, 3900, 400),
        new Platform(platformImage, 4400, 300),
        new Platform(platformSmallTallImage, 5500, 500),
        new Platform(platformImage, 6000, 200),
        new Platform(platformSmallTallImage, 6700, 450),
        new Platform(platformSmallTallImage, 7200, 400),
        new Platform(platformImage, 7900, 200),
        new Platform(platformImage, 8900, 200),
        new Platform(platformSmallTallImage, 9900, 450),
        new Platform(platformSmallTallImage, 10900, 450),
        new Platform(platformSmallTallImage, 11500, 450),
        new Platform(platformSmallTallImage, 11600, 450),
        new Platform(platformSmallTallImage, 11700, 450),
        new Platform(platformSmallTallImage, 11900, 450),
        new Platform(platformSmallTallImage, 12100, 450),
        new Platform(platformSmallTallImage, 12200, 450),
        new Platform(platformSmallTallImage, 12500, 450),
        new Platform(platformSmallTallImage, 12800, 450),
        new Platform(platformSmallTallImage, 13200, 450),
    
    
    ];
     genericObjects = [
        new GenericObject(backgroundImage,-1,-1),
        new GenericObject(hillsImage,-1,-1)
    ]
    
    let scrollOffset = 0
     win = 0;
    }
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })
    // Update platforms positions based on scrollOffset
    platforms.forEach(platform => {
        platform.position.x -= scrollOffset;
    });
  
    // Draw player and platforms
    player.draw();
    platforms.forEach(platform => {
        platform.draw();
    });
  // Update player
  player.update();

    // Check for collision
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height +player.velocity.y >= platform.position.y 
            && player.position.x + player.width >= platform.position.x 
            && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0;
        }
       
    });

    // Reset scrollOffset
    scrollOffset = 0;
        // Update scrollOffset based on key presses
        if (keys.left.pressed && win > 0) {
            scrollOffset -= player.speed;
            win-=5;
            // genericObjects.forEach((genericObject) => {
            //     genericObject.position.x += 5;
            // })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66;
            });
            
        } else if (keys.right.pressed) {
            scrollOffset += player.speed;
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -=player.speed * 0.66;
            });
            win+=5;
        } else {
            scrollOffset = 0;
        }
     console.log(win)
        // Check win condition
        if (win > 5700) {
            c.fillStyle = 'rgba(0, 0, 0, 0.5)';
            c.fillRect(0, 0, canvas.width, canvas.height);
        
            c.fillStyle = 'aliceblue';
            c.font = '100px Helvetica';
            c.textAlign = 'center';
            c.fillText('YOU WON', canvas.width / 2, canvas.height / 2);
           
        
        }
        //lose condition
        if(player.position.y > canvas.height){
           c.fillStyle = 'rgba(0, 0, 0, 0.5)';
                c.fillRect(0, 0, canvas.width, canvas.height);
            
                c.fillStyle = 'aliceblue';
                c.font = '100px Helvetica';
                c.textAlign = 'center';
                c.fillText('YOU LOST', canvas.width / 2, canvas.height / 2);    
           
     
            init();
        }
    
}
init();
animate();

// Add event listeners for keydown and keyup events
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = true;
            player.currentImage = player.sprites.run.left;
            player.cureentCropwidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width
           

            break;
        case 83:
            player.velocity.y += 20;
            break;
        case 87:
            player.velocity.y -= 20;
            break;
        case 68:
            keys.right.pressed = true;
            player.currentImage = player.sprites.run.right;
            player.cureentCropwidth = player.sprites.run.cropWidth;
            player.width = player.sprites.run.width
            break;
    }
})
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            player.currentImage = player.sprites.stand.left;
            player.cureentCropwidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width
           
            break;
        case 83:
            player.velocity.y = 0;

            break;
        case 87:
            player.velocity.y = 0;
            break;
        case 68:
            keys.right.pressed = false;
            player.currentImage = player.sprites.stand.right;
            player.cureentCropwidth = player.sprites.stand.cropWidth;
            player.width = player.sprites.stand.width
           
            break;
    }
})
