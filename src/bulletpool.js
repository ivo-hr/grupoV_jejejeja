import Bullet from "./bulletres.js";

export default class BulletPool extends Phaser.Physics.Arcade.Sprite{

 /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   */

 constructor(scene){
     super(scene);

     
    
 }
 fireBullet (x, y)
 {
     let bullet = this.getFirstDead(false);

     if (bullet)
     {
         bullet.fire(x, y);
     }
 }

}