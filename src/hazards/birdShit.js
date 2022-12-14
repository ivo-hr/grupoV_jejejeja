export default class BirdShit extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y, nombreImg) {
      super(scene, x, y, nombreImg); 
  
      this.player=player;
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(); //Collision with the limits of the world
      this.body.setGravity(0,300);

      this.body.moves=true;  //Whether the Body's position and rotation are affected by its velocity, acceleration, drag, and gravity.
      this.y -= this.height;
  
    }
  
    preUpdate() {
      super.preUpdate();
      this.handleCollision();

    
  
    }
  

    //Handles the collision with player and floor
    
    handleCollision(){
     if (this.scene.physics.overlap(this.scene.player, this)) {
        this.scene.player.minusHealth(1)
        this.destroy();
      }
    }
  
    
  }