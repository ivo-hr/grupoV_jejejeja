/**
 * Clase para los objetos ball que chocan con el jugador
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
 export default class Ball extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de Ball
     * @param {Sceme} scene Escena en la que aparece la bola
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {number} tam tamaño del sprite
     */
    constructor(scene, x, y, tam) {
      super(scene, x, y, 'star');
      this.scene.add.existing(this);
      this.size = tam;
      this.sizeManag();
      this.scene.physics.add.existing(this);
      //this.body.setCollideWorldBounds();
      //this.y -= this.height;
      this.scene.physics.add.collider(this, this.scene.walls);
      this.body.setVelocity(100,100).setBounce(Phaser.Math.FloatBetween(-1, 1),Phaser.Math.FloatBetween(-1, 1));
      this.body.setCollideWorldBounds();
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
    onDestroy(){
      this.destroy();
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate() {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate();
      //this.body.setVelocity(100,100).setBounce(1,1);
      if (this.scene.physics.overlap(this.scene.player, this)) {
          this.scene.player.minusHealth(10)
          this.destroy();
          
      }
      
    }
  }