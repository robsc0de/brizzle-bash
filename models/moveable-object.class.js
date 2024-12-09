class MovableObject {
    X = 88;
    Y = 288;
    img;
    width = 64;
    height = 128;
    currentImage = 0;
    imageCache = {};
    flipImage = false;
    speedX = 0.5;
    speedY = 0;
    acceleration = 1.5;

    characterLife = 100;
    lastHitTime = 0;
    hitCooldown = 1000;

    static debugMode = false;

    static setDebugMode(isEnabled) {
        MovableObject.debugMode = isEnabled;
        console.log("Debug Mode: ", MovableObject.debugMode ? "enabled" : "disabled");
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.Y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (!this.isAboveGround()) {
                this.Y = 288;
                this.speedY = 0;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        return this.Y < 288;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.X, this.Y, this.width, this.height);
    }

    // drawCollisionFrame(ctx) {
    //     if (MovableObject.debugMode && (this instanceof Character || this instanceof Squid || this instanceof Plant || this instanceof Endboss)) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '4';
    //         ctx.strokeStyle = '#ff79c6';
    //         ctx.rect(this.X, this.Y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    drawCollisionFrame(ctx) {
        if (MovableObject.debugMode && (this instanceof Character )) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = '#ff79c6';
            ctx.rect(this.X, this.Y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(moveObj, offsetX = 0, offsetY = 0) {
        return (
            this.X + this.width - offsetX > moveObj.X + offsetX && // Rechte Kante überlappt linke Kante + Offset
            this.X + offsetX < moveObj.X + moveObj.width - offsetX && // Linke Kante überlappt rechte Kante - Offset
            this.Y + this.height - offsetY > moveObj.Y + offsetY && // Untere Kante überlappt obere Kante + Offset
            this.Y + offsetY < moveObj.Y + moveObj.height - offsetY // Obere Kante überlappt untere Kante - Offset
        );
    }

    getHit() {
        const currentTime = new Date().getTime();
        if (this.lastHitTime && (currentTime - this.lastHitTime) < this.hitCooldown) {
            return;
        }

        // Leben reduzieren und Fortschrittsbalken aktualisieren
        this.characterLife -= 10;
        if (this.characterLife < 0) {
            this.characterLife = 0;
        }

        // Fortschrittsbalken nach jedem Treffer aktualisieren
        this.updateProgressBar();
        this.lastHitTime = currentTime;
    }

    updateProgressBar() {
        const progressBar = document.getElementById('progress-bar-health');
        progressBar.style.width = `${this.characterLife}%`;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHitTime;
        return timePassed < this.hitCooldown;
    }

    isDead() {
        return this.characterLife == 0;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        this.X += this.speedX;
    }

    moveLeft() {
        this.X -= this.speedX;
    }

    isRunning() {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.world.keyboard.SHIFT) {
            this.speedX = this.speedRun;
            return true;
        } else {
            this.speedX = 2;
            return false;
        }
    }

    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 25;
        }
    }

    down() {
        if (this.world.keyboard.DOWN) {
            this.Y = 320;
            return true;
        } else {
            return false;
        }
    }

    punch() {
        if (this.world.keyboard.ATTACK_ONE) {
            return true;
        } else {
            return false;
        }
    }

    playAnimation(images) {
        let imgIndex = this.currentImage % images.length;
        let path = images[imgIndex];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}