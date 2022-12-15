import Enemy from "./enemy.js";

 export default class Baby extends Enemy {
  
    /**
     * Constructor de Ball
     * @param {Sceme} scene Escena en la que aparece la bola
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {number} tam tamaño del sprite
     */
    constructor(scene, x, y, tam) {
      super(scene, x, y, tam, 'baby');
      
      this.speed = 300;
      this.movingRight = true;
      this.xPosIni = x;
      this.maxMovement = 100;
      this.currentMovement = 0;
      this.body.moves=true;
      this.body.setGravity(0,5000);
      this.myScore = 50;

    }

    /**
     * Redefinición del animation de Enemy
     * @override
     */
    animation(){
      
      this.scene.anims.create({
        key: 'movingBaby',
        frames: this.scene.anims.generateFrameNumbers('baby', { start: 0, end: 3 }),
        frameRate: 10,
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

        this.baby.play();
      }

      if(this.movingRight){
        this.body.setVelocity(this.speed, 0);      }
      else
      this.body.setVelocity(-this.speed, 0);

      //this.body.setVelocity(100,100).setBounce(1,1);
      if (this.scene.physics.overlap(this.scene.player, this)&&!this.scene.player.invincible) {
        this.scene.player.setInvincible();
          this.scene.player.minusHealth(2)        
      }
      this.checkHP();

    }

    generateSounds(sfxConfig){
      this.baby = this.scene.sound.add('baby', sfxConfig);
    }
  }