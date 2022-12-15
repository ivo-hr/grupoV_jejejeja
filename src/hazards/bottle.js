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
        this.maxHeight = Phaser.Math.Between(200, 300) + y; //Parametro que dicta la altura max a la que llegara la botella
        this.reachMaxHeight = false; //Boolean de si ha llegado a la altura tope
        this.speed = 60; //Velocidad de la botella
        this.gravitySpeed = 10;
        this.x = x;
        this.y = y;
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
        this.handleCollision();
        
    }
    
    movement(){
        this.body.setVelocityX(this.speed);
        if(this.y < this.maxHeight && !this.reachMaxHeight){
            this.body.setVelocityY(this.speed * 3);
        }
        else {
            this.reachMaxHeight = true;
            //this.body.setVelocityY(-this.gravitySpeed);
            this.gravitySpeed += 10;
        }
        console.log(" y " + this.y);
        //Rotate
        if (this.angle===360) this.angle=0;
        this.angle += 10;
    }

    //Handles the collision with player and floor
    
    handleCollision(){
        if (this.scene.physics.overlap(this.scene.player, this)) {
            this.scene.player.minusHealth(1)
            this.destroy();
        }
    }
}