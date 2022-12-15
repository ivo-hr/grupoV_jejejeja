export default class EndingFlag extends Phaser.GameObjects.Sprite {

   
    constructor(scene, x, y) {
    
     super(scene, x, y, 'flag');
     
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
     this.body.setCollideWorldBounds(); 
     this.scene=scene;
    
          
   }
   
   /**
   * Used to destroy a power up after making its effect
   */
   destroyObject(){
     this.destroy();
   }
 
 
   preUpdate(t,dt)
   {
    super.preUpdate(t,dt);
    this.onCollisionPlayer();
   }

   onCollisionPlayer(){
    if (this.scene.physics.overlap(this.scene.player, this)) {

        //cambio escena
  }
   }
 }