
/**
 * Clase que representa el dial, en forma de container
*/
export default class scoreDial extends Phaser.GameObjects.Container {

    /**
     * Constructor del dial
     * @param {Phaser.Scene} scene Escena del juego
     */
    constructor(scene, x, y) {
        super(scene, x, y);

        this.displayWidth = x;
        this.displayHeight = y;
        this.value = 0;
        this.maxValue = 500;
        this.scale = 4;

        this.bckgrd = this.initBackground(this.scale, x, y);
        this.handle = this.initHand(this.scale, x, y);

        this.scene.add.existing(this);
    }

    initBackground(scale, x, y) {
        let bck = this.scene.add.image(x, y, 'dial');
        bck.setScale(scale);
        bck.setOrigin(0.5, 1);
        bck.x = x;
        bck.y = y +2;
        return bck;
    }

    initHand(scale, x, y) {
        let hand = this.scene.add.sprite(x, y, 'dialHand');
        hand.setScale(scale);
        hand.setOrigin(0.5, 1);
        hand.x = x;
        hand.y = y;
        hand.setRotation(Phaser.Math.DegToRad(-90));
        return hand;
    }


     update(value) {
        this.value += value;
        if(this.value > this.maxValue)
        {
            this.value = this.maxValue;
        }

        this.handle.setRotation(Phaser.Math.DegToRad(-90 + (this.value * 180 / this.maxValue)));
    }

    getScore(){
        return this.value;
    }
}   