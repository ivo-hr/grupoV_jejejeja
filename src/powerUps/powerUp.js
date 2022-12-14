export default class PowerUp extends Phaser.GameObjects.Sprite {

   
    constructor(scene, x, y, nombreImg, moving) {
    
     super(scene, x, y, nombreImg);
     
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
     this.body.setCollideWorldBounds(); 
     this.y -= this.height;

     this.body.moves=false;
     this.movesbyTween = moving;
     this.scene=scene;
    
     this.nameImg= nombreImg;
     
     this.createTweenMovement(y);
     
   }
   
   /**
   * Used to destroy a power up after making its effect
   */
   destroyObject(){
     this.destroy();
   }
 
 
   /**
   * Handle movement boolean in order to control de effect of power ups 
   */
   createTweenMovement(y)
   {
     this.rndDuration= Phaser.Math.Between(1000, 2000);
     this.rndY=Phaser.Math.Between(y, y+300);
     if(this.movesbyTween)
     {
       this.tweenMovement= this.scene.tweens.add({
       targets: this,
       y: this.rndY, 
       duration: this.rndDuration,
       ease: 'Linear',
       yoyo: true,
       repeat: -1,
       delay: 200 //Time to start
       });
     }
   }
 
   preUpdate(t,dt)
   {
    super.preUpdate(t,dt);
    this.powerupsound.setVolume(this.scene.ChangeVolume());
   }
 }