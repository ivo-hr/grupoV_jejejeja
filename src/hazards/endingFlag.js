export default class EndingFlag extends Phaser.GameObjects.Sprite {

   
    constructor(scene, x, y) {
    
     super(scene, x, y, 'flag');
     
     this.scene.add.existing(this);
     this.scene.physics.add.existing(this);
     this.body.setCollideWorldBounds(); 
     this.scene=scene;
    
     
    this.scene.anims.create({
        key: 'flagMoving',
        frames: scene.anims.generateFrameNumbers('flag', {start:0, end:1}),
        frameRate: 4,
        repeat: -1
    });

    //animation
    this.play('flagMoving');
          
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

   //al choca con el jugador se llama a la funcion gameWin
   onCollisionPlayer(){
    if (this.scene.physics.overlap(this.scene.player, this)) {

        this.scene.gameWin();
  }
   }
 }