export default class HealthBar {

    constructor(scene, x, y, maxValue) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.maxValue = maxValue;
        this.value = this.maxValue;
        this.proportion = 172 / this.maxValue;
        this.draw();
        scene.add.existing(this.bar);
    }

    draw() {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 180, 28);

        //  Health

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 4, this.y + 4, 172, 20);
    }

    update(value) {
        this.value = value

        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 4, this.y + 4, 172, 20);


        if (this.value < this.maxValue / 3) {
            this.bar.fillStyle(0xff0000);
        } else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.proportion * this.value);

        this.bar.fillRect(this.x + 4, this.y + 4, d, 20);
    }

}