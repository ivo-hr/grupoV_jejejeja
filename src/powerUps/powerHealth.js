import PowerUp from "./powerUp.js";

export default class PowerHealth extends PowerUp {

   
    constructor(scene, x, y) {
    
     super(scene, x, y, 'powerHealth');
     
     
   }

   onCollisionPlayer(){
    if (this.scene.physics.overlap(this.scene.player, this)) {
      this.scene.player.minusHealth(-2);
      this.destroy();
  }
   }
 }