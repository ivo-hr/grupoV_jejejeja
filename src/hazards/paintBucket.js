import PaintStain from "./paintStain.js";

export default class PaintBucket extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Star
     * @param {Sceme} scene Escena en la que aparece la estrella
     * @param {Base} base Objeto base sobre el que se va a dibujar la estrella
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     */
    constructor(scene, x, y, tam) {
      super(scene, x, y, 'bucket');
      this.initialize(tam);
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(); //Collision with the limits of the world
      this.body.moves=false;
      this.isMoving=false;
      //rango de distancia en el que se empieza a caer el cubo
      this.range = 200;
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
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    onFloorCollision(){
      this.scene.obstacles.add(new PaintStain(this.scene, this.x, this.y));
      this.destroy();
    }
    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate();
      // If player enters the range
    if(this.scene.player.x + this.range >= this.x) 
    {
      //Fall
      this.body.moves=true;
      this.isMoving=true;
    }
    if(this.isMoving)
    {
      //Rotate
      if (this.angle===360) this.angle=0;
      this.angle++; 
    } 

    //si colsiona con el suelo crea una mancha de pintura y se destruye
    if(this.scene.physics.collide(this.scene.layer5, this) || this.scene.physics.collide(this.scene.layer3, this)){
      this.onFloorCollision(); 
      this.fall.play();
    }

    //si colisiona con el jugador le quita vida y se destruye
    else if (this.scene.physics.overlap(this.scene.player, this)) {
          this.scene.player.minusHealth(1);
          this.scene.player.slowDown(50, 60);
          this.fall.play();
          this.destroy();
      }
    }

    //Genera los sonidos del cubo
    generateSounds(sfxConfig){
      this.fall = this.scene.sound.add('bucket', sfxConfig);
    }
  }

