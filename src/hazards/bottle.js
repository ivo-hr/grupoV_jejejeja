export default class Bottle extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de Botella
     * @param {Sceme} scene Escena en la que aparece la botella
     * @param {Base} base Objeto base sobre el que se va a dibujar la botella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, tam) {
        super(scene, x, y, 'bottle');
        this.initialize(tam);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(); //Collision with the limits of the world
        this.maxHeight = Phaser.Math.Between(250, 400); //Parametro que dicta la altura max a la que llegara la botella
        this.reachMaxHeight = false; //Boolean de si ha llegado a la altura tope
        this.itsFalling = false; //Boolean que dice si esta cayendo la botella
        this.speed = Phaser.Math.Between(160, 200); //Velocidad de la botella
    }
  
    initialize(tam){
        this.size = tam;  
        this.sizeManag();
    }
    sizeManag(){
        if(this.size == 0){
            this.setScale(0.25);
        }
        else if(this.size == 1){
            this.setScale(0.5);
        }
        else{
            this.setScale(1);
        }
    }
    preUpdate() {
        super.preUpdate();
        this.movement();
        if(this.itsFalling) this.handleCollision();
    }
    
    movement(){
        
        if(this.y >= this.maxHeight && !this.reachMaxHeight){
            if(this.speed > 50) this.body.setVelocityX(--this.speed);
            this.body.setVelocityY(-this.speed);
        }
        else {
            this.reachMaxHeight = true;
            this.itsFalling = true;
            if(this.speed < 250) this.body.setVelocityX(++this.speed);
            this.body.setVelocityY(this.speed);
        }

        //Rotate
        if (this.angle === 360) this.angle = 0;
        this.angle += Phaser.Math.Between(5, 15);
    }

    //Handles the collision with player and floor
    
    handleCollision(){
        if(this.scene.physics.collide(this.scene.layer5, this) 
        || this.scene.physics.collide(this.scene.layer3, this)) {
            this.destroy();
          }
    }
}