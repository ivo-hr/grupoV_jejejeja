
/**
 * Clase que representa el dial, en forma de container
*/
export default class scoreDial extends Phaser.GameObjects.Container {

    /**
     * Constructor del dial
     * @param {Phaser.Scene} scene Escena del juego
     */
    constructor(scene, x, y, maxValue) {
        super(scene, x, y);

        this.displayWidth = x;
        this.displayHeight = y;
        this.value = 0;
        this.maxValue = maxValue;
        this.scale = 3;

        this.bckgrd = this.initBackground(this.scale, x, y);
        this.handle = this.initHand(this.scale, x, y);

        //hace que el dial no se mueva con la cámara
        this.bckgrd.setScrollFactor(0,0);
        this.handle.setScrollFactor(0,0);

        this.scene.add.existing(this);
    }
    //inicializa el fondo del dial
    initBackground(scale, x, y) {
        let bck = this.scene.add.image(x, y, 'dial');
        bck.setScale(scale);
        bck.setOrigin(0.5, 1);
        bck.x = x;
        bck.y = y -2;
        bck.setRotation(Phaser.Math.DegToRad(180));
        return bck;
    }
    //inicializa la mano del dial
    initHand(scale, x, y) {
        let hand = this.scene.add.sprite(x, y, 'dialHand');
        hand.setScale(scale);
        hand.setOrigin(0.5, 1);
        hand.x = x;
        hand.y = y;
        hand.setRotation(Phaser.Math.DegToRad(-100));
        return hand;
    }

    //actualiza el valor del dial
     update(value) {
        this.value += value;
        if(this.value > this.maxValue)
        {
            this.value = this.maxValue;
        }

        this.handle.setRotation(Phaser.Math.DegToRad(-100 - (this.value * 160 / this.maxValue)));
        console.log("score updated");
    }

    //devuelve el valor del dial
    getScore(){
        return this.value;
    }
}   