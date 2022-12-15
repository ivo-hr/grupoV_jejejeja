export default class HealthBar extends Phaser.GameObjects.Graphics {

    constructor(scene, x, y, maxValue) {
        super(scene, x, y, 'healthbar');

        this.x = x/2;
        this.y = y/2;
        this.maxValue = maxValue;
        this.value = this.maxValue;
        this.proportion = 172 / this.maxValue;
        this.draw();
        scene.add.existing(this);
    }

    draw() {
        this.clear();

        //  BG
        this.fillStyle(0x000000);
        this.fillRect(this.x, this.y, 180, 28);

        //  Health

        this.fillStyle(0x00ff00);
        this.fillRect(this.x + 4, this.y + 4, 172, 20);
    }

    update(value) {
        this.value -= value;
        if(this.value > this.maxValue)
        {
            this.value = this.maxValue;
        }

        this.fillStyle(0xff0000);
        this.fillRect(this.x + 4, this.y + 4, 172, 20);

        this.fillStyle(0x00ff00);

        let d = Math.floor(this.proportion * this.value);

        this.fillRect(this.x + 4, this.y + 4, d, 20);
    }

}