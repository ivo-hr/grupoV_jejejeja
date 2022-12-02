
/**
 * Clase que representa el reloj, en forma de sprite
*/
export default class scoreDial extends Phaser.GameObjects.Container {

    /**
     * Constructor de la barra
     * @param {Phaser.Scene} scene Escena del juego
     * @param {ScoreDialCfg} scoreDialCfg Configuración del reloj
     */
    constructor(scene, scoreDialCfg) {
        super(scene, scoreDialCfg.x, scoreDialCfg.y, scoreDialCfg.initVal);

        this.displayWidth = scoreDialCfg.width;
        this.displayHeight = scoreDialCfg.height;
        this.value = scoreDialCfg.initVal;
        this.maxValue = 500;
        this.setDepth(9);
        this.scene.add.existing(this);
        this.bckgrd = this.initBackground(scoreDialCfg.scale, scoreDialCfg.x, scoreDialCfg.y);
        this.handle = this.initHand(scoreDialCfg.scale, scoreDialCfg.x, scoreDialCfg.y);
    }

    initBackground(scale, x, y) {
        let bck = this.scene.add.image(x, y, 'dial');
        bck.setScale(scale);
        this.bck.x = x;
        this.bck.y = y;
        return bck;
    }

    initHand(scale, x, y) {
        let hand = this.scene.add.sprite(x, y, 'hand');
        hand.setScale(scale);
        this.hand.x = x;
        this.hand.y = y;
        return hand;
    }

    /**
     * Actualiza la rotación del reloj en función del tiempo transcurrido en escena
     * @param {*} value
     * @param {*} dt 
     */
     update(value) {
        this.value += value;
        if(this.value > this.maxValue)
        {
            this.value = this.maxValue;
        }

        this.handle.angle = this.value * 0.36;
    }

    getScore(){
        return this.value;
    }
}   