import Enemy from "./enemys.js";

 export default class Drunk extends Enemy {
  
    /**
     * Constructor de Ball
     * @param {Sceme} scene Escena en la que aparece la bola
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {number} tam tamaño del sprite
     */
    constructor(scene, x, y, tam) {
      super(scene, x, y, tam, 'baby'); //Cambiar por drunk cuando tenga el sprite
      
      this.movingRight = true;
      this.throwBottle = false;
      this.time = Phaser.Math.RandomDataGenerator;
    }

    /**
     * Redefinición del animation de Enemy
     * @override
     */
    animation(){
      
      this.scene.anims.create({ 
        key: 'movingBaby',
        frames: this.scene.anims.generateFrameNumbers('baby', { start: 0, end: 3 }), //Cambiar por drunk
        frameRate: 12, 
        repeat: -1 
    })

      this.play('movingBaby');
    }
  
    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */
    preUpdate(t, dt) {
      // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
      // no se podrá ejecutar la animación del sprite. 
      super.preUpdate(t, dt);

      //se va sumando al contador de "pasos" para ver si cambia de dirección
      this.currentMovement++;

      if(this.currentMovement >= this.maxMovement) {
        this.currentMovement = 0;//se resetea la cuenta

        if(this.movingRight) this.setFlip(false, false);
        else this.setFlip(true, false);

        this.movingRight = !this.movingRight;
      }

      if(this.movingRight){
        this.body.setVelocityX(this.speed);
      }
      else
        this.body.setVelocityX(-this.speed);


      //this.body.setVelocity(100,100).setBounce(1,1);
      if (this.scene.physics.overlap(this.scene.player, this)) {
          this.scene.player.minusHealth(1)
          this.onDestroy();
        
      }
      
      
    }
  }