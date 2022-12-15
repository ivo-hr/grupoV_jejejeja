import Enemy from "./enemy.js";
import Bottle from "../hazards/bottle.js"

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

    this.speed = 50;
    this.movingRight = true;
    this.setFlip(true, false);
    this.maxMovement = 150;
    this.currentMovement = 0;
    this.missilCooldown = 0;
    this.missilFrequency = 5000;
    this.myScore = 30;
  }

  /**
   * Redefinición del animation de Enemy
   * @override
   */
  animation() {

    this.scene.anims.create({
      key: 'movingdrunk',
      frames: this.scene.anims.generateFrameNumbers('drunk', { start: 0, end: 4 }), //Cambiar por drunk
      frameRate: 4,
      repeat: -1
    })

    this.play('movingdrunk');
  }

  //lanza botella en forma de parabola contra el suelo
  throwbottle() {
    new Bottle(this.scene, this.x, this.y, 15, this.movingRight);
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
    //comprueba si se choca con los limites del mundo
    if (this.body.blocked.left || this.body.blocked.right) {
      this.movingRight = !this.movingRight;
      if (this.movingRight) this.setFlip(true, false);
      else this.setFlip(false, false);
    }
    this.missilCooldown += Math.round(dt);
    if ((this.missilCooldown) > this.missilFrequency) {
      this.missilCooldown = 0;
      this.throwbottle();
    }

    if (this.currentMovement >= this.maxMovement) {
      //se resetea la cuenta
      this.currentMovement = Phaser.Math.Between(this.maxMovement / 5, this.maxMovement);

      if (this.movingRight) this.setFlip(false, false);
      else this.setFlip(true, false);

      this.movingRight = !this.movingRight;
    }

    if (this.movingRight)
      this.body.setVelocity(this.speed, 0);
    else
      this.body.setVelocity(-this.speed, 0);

    if (this.scene.physics.overlap(this.scene.player, this) && !this.scene.player.invincible) {
      this.scene.player.setInvincible();
      this.scene.player.minusHealth(1);
    }
    this.checkHP();
  }

  //genera sonidos
  generateSounds(sfxConfig) {
    
  }
}