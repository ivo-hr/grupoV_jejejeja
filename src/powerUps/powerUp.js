export default class PowerUp extends Phaser.GameObjects.Sprite {

   
    constructor(scene, x, y, nombreImg, type) {
    
     super(scene, x, y, nombreImg);
     
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
     this.body.setCollideWorldBounds(); 
     this.y -= this.height;

     this.body.moves=false;
     this.movesbyTween = true;
     this.scene=scene;
    
     this.nameImg= nombreImg;
     this.type = type;
     
     this.createTweenMovement(y);
     
   }
   
   /**
   * Used to destroy a power up after making its effect
   */
   destroyObject(){
     this.destroy();
   }
 
 
   createTweenMovement(y)
   {
     this.rndDuration= Phaser.Math.Between(1000, 2000);
     this.rndY=Phaser.Math.Between(y, y+100);
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

    if (this.scene.physics.overlap(this.scene.player, this)) {
        //this.scene.player.lesspoint();
        this.scene.player.state = this.type;
        this.destroy();
    }
   }
 }