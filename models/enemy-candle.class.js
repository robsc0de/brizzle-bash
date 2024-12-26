class Candle extends MovableObject {

    Y = 296;
    width = 171;
    height = 150;
    enemyLife = 100;
    damage = 100;


    IMAGES_WALK = [
        '../assets/img/monsters/candle/cm-00.png',
        '../assets/img/monsters/candle/cm-01.png',
        '../assets/img/monsters/candle/cm-02.png',
        '../assets/img/monsters/candle/cm-03.png',
        '../assets/img/monsters/candle/cm-04.png',
        '../assets/img/monsters/candle/cm-05.png',
        '../assets/img/monsters/candle/cm-06.png',
        '../assets/img/monsters/candle/cm-07.png',
        '../assets/img/monsters/candle/cm-08.png',
        '../assets/img/monsters/candle/cm-09.png',
        '../assets/img/monsters/candle/cm-10.png',
        '../assets/img/monsters/candle/cm-11.png',
        '../assets/img/monsters/candle/cm-12.png',
        '../assets/img/monsters/candle/cm-13.png',
        '../assets/img/monsters/candle/cm-14.png',
        '../assets/img/monsters/candle/cm-15.png',
        '../assets/img/monsters/candle/cm-16.png',
        '../assets/img/monsters/candle/cm-17.png',
        '../assets/img/monsters/candle/cm-18.png',
        '../assets/img/monsters/candle/cm-19.png',
        '../assets/img/monsters/candle/cm-20.png',
        '../assets/img/monsters/candle/cm-21.png',
        '../assets/img/monsters/candle/cm-22.png',
        '../assets/img/monsters/candle/cm-23.png',
        '../assets/img/monsters/candle/cm-24.png',
        '../assets/img/monsters/candle/cm-25.png',
        '../assets/img/monsters/candle/cm-26.png',
        '../assets/img/monsters/candle/cm-27.png',
        '../assets/img/monsters/candle/cm-28.png',
        '../assets/img/monsters/candle/cm-29.png',
        '../assets/img/monsters/candle/cm-30.png',
        '../assets/img/monsters/candle/cm-31.png',
        '../assets/img/monsters/candle/cm-32.png',
        '../assets/img/monsters/candle/cm-33.png',
        '../assets/img/monsters/candle/cm-34.png',
        '../assets/img/monsters/candle/cm-35.png',
        '../assets/img/monsters/candle/cm-36.png',
        '../assets/img/monsters/candle/cm-37.png',
        '../assets/img/monsters/candle/cm-38.png',
        '../assets/img/monsters/candle/cm-39.png'
    ];

    constructor(posX, varSpeedX) {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.name = "Candle Bug";
        this.X = posX;
        this.speedX = varSpeedX;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 1000 / 60);
    }


    getHit() {
        this.enemyLife -= this.damage;
        if (this.enemyLife <= 0) {
            this.isDead();
        }
    }


    isDead() {
        console.log(`${this.name} has died!`);

        const index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
            this.world.level.enemies.splice(index, 1);
        }

        console.log(`Enemies alive:`, this.world.level.enemies);
    }
}
