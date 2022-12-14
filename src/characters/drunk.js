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
      super(scene, x, y, tam, 'drunk'); //Cambiar por drunk cuando tenga el sprite
      
      this.speed = 200;
      this.movingRight = true;
      this.isBottlethrown = false;
      this.setFlip(true, false);
      this.time = Phaser.Math.RandomDataGenerator;
    }

    /**
     * Redefinición del animation de Enemy
     * @override
     */
    animation(){
      
      this.scene.anims.create({ 
        key: 'movingdrunk',
        frames: this.scene.anims.generateFrameNumbers('drunk', { start: 0, end: 4 }), //Cambiar por drunk
        frameRate: 12, 
        repeat: -1 
    })

      this.play('movingdrunk');
    }

    //lanza botella en forma de parabola contra el suelo
    throwbottle(){
      let aux = Phaser.Math.RandomDataGenerator; //random para settear la forma de parabola del lanzamiento
      if(movingRight){
        new Bottle(this.scene, this.scene.player, this.x, this.y, 'bottle');
      }
      else{
        new Bottle(this.scene, this.scene.player, this.x, this.y, 'bottle');
      }

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

      //comprueba si se choca con los limites del mundo
      if(this.body.blocked.left || this.body.blocked.right){
        this.movingRight = !this.movingRight;
        if(this.movingRight) this.setFlip(true, false);
        else this.setFlip(false, false);
      }
      this.missilCooldown += Math.round(dt);
      if((this.missilCooldown) > this.missilFrequency){
          this.missilCooldown = 0;
          this.isBottlethrown = true;
          this.throwbottle();
          this.isBottlethrown = false;
          console.log("disparo");
      }

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
          this.scene.player.minusHealth(1);   
      }
      
      
    }

    generateSounds(sfxConfig){
      this.pengu = this.scene.sound.add('pengu', sfxConfig);
      this.shot = this.scene.sound.add('shot', sfxConfig);
      this.laser = this.scene.sound.add('laser', sfxConfig);
      this.dmg = this.scene.sound.add('dmg', sfxConfig);
      this.jump = this.scene.sound.add('jump', sfxConfig);
    }
  }