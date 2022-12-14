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
        this.maxRange=false; //Booleano que determina si ha llegado al rango maximo de altura el lanzamiento
        this.range = Phaser.Math.Between(100, x); //rango de distancia en el que se empieza a caer la botella
        this.speed = 10;
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
        this.handleCollision();
        this.movement();
    }
    
    movement(){
        let a = Phaser.Math.Between(5, 15);
        let b = Phaser.Math.Between(10, 40);
        let c = Phaser.Math.Between(200, 400);
        this.body.setGravity(this.speed, 15);
        // this.body.setVelocityX(this.speed);
        // this.body.setVelocityY(15);//-a*this.x*this.x -b*this.x - c);
        
       // console.log("x " + this.x + " y " + this.y);
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