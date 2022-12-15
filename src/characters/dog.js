import Enemy from "./enemy.js";
import DogShit from "../hazards/dogShit.js";
/**
 * Clase para los objetos ball que chocan con el jugador
 * Una estrella aparece sobre una base. Cuando el jugador la recoge, se crea 
 * una nueva estrella en otra posición, si el juego no ha terminado.
 * @extends Phaser.GameObjects.Sprite
 */
export default class Dog extends Enemy {

    /**
     * Constructor de Ball
     * @param {Sceme} scene Escena en la que aparece la bola
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {number} tam tamaño del sprite
     */
    constructor(scene, x, y, tam) {
        super(scene, x, y, tam, 'dog');

        this.speed = 130;
        this.movingRight = true;
        this.setFlip(false, false);
        this.body.onWorldBounds = true;
        this.shitIsTaken = true;
        this.setScale(0.6)

        this.myScore = 60;
    }

    animation() {
        this.scene.anims.create({
            key: 'movingDog',
            frames: this.scene.anims.generateFrameNumbers('dog', { start: 0, end: 3 }),
            frameRate: 12,
            repeat: -1

        })

        this.play('movingDog');
    }

    /**
     * Redefinición del preUpdate de Phaser
     * @override
     */

    //caga
    poop() {
        this.scene.obstacles.add(new DogShit(this.scene, this.x, this.y));
    }
    cagable(){  
        let timer=this.scene.time.addEvent({
          delay: 3000, 
          callback: this.setCagable,
          callbackScope: this,
       });
    }
    setCagable(){
        if(!this.shitIsTaken) 
        this.shitIsTaken = true;
    }
    preUpdate(t, dt) {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate(t, dt);

        //comprueba si se choca con los limites del mundo
        if(this.body.blocked.left || this.body.blocked.right){
            this.movingRight = !this.movingRight;
            if(this.movingRight) this.setFlip(false, false);
            else this.setFlip(true, false);
        }

        if(this.shitIsTaken){
            this.poop();
            this.shitIsTaken = false;
            this.cagable();
        }

        if (!this.shitIsTaken) {
            if (this.movingRight) {
                this.body.setVelocityX(this.speed);
            }
            else {
                this.body.setVelocityX(-this.speed);
            }
        }

        if (this.scene.physics.overlap(this.scene.player, this) && !this.scene.player.invincible) {
            this.scene.player.setInvincible();
            this.scene.player.minusHealth(1);
        }
        this.checkHP();


        //Darle sonido de perro
        /*generateSounds(sfxConfig) {
            this.pengu = this.scene.sound.add('pengu', sfxConfig);

        }*/
    }
}