export default class Bottle extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Botella
     * @param {Sceme} scene Escena en la que aparece la botella
     * @param {Base} base Objeto base sobre el que se va a dibujar la botella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, tam) {
        super(scene, x, y, 'botella');
        this.initialize(tam);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(); //Collision with the limits of the world
        this.body.moves=false;
        this.isMoving=false;
        this.maxRange=false; //Booleano que determina si ha llegado al rango maximo de altura el lanzamiento
        this.range = Phaser.Math.Between(0, x); //rango de distancia en el que se empieza a caer la botella
    }
  
    preUpdate() {
        super.preUpdate();
        this.handleCollision();
        this.movement();
    }
    
    movement(){
        this.x += x;
        if(this.y + y <= range){
            maxRange = true;
        }
        if(maxRange) {
            this.y += y;
        }
        else{
            this.y -= y;
        }
        //Rotate
        if (this.angle===360) this.angle=0;
        this.angle++;
    }

    //Handles the collision with player and floor
    
    handleCollision(){
        if (this.scene.physics.overlap(this.scene.player, this)) {
            this.scene.player.minusHealth(1)
            this.destroy();
        }
    }
}