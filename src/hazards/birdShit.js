export default class BirdShit extends Phaser.GameObjects.Sprite {

  //Constructor
  constructor(scene, x, y) {
    super(scene, x, y, 'birdShit'); 

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

  onDestroy(){
     this.destroy(this);
 }
 
  //Handles the collision with player and floor
  
  handleCollision(){
   if (this.scene.physics.overlap(this.scene.player, this)) {
      if(!this.scene.player.invincible){
        this.scene.player.setInvincible();
      }
      this.onDestroy();
    }
    else if(this.scene.physics.collide(this.scene.layer1, this)){
      this.onDestroy();
    }
    else if(this.scene.physics.collide(this.scene.layer3, this)){
      this.onDestroy();
    }
    else if(this.scene.physics.collide(this.scene.layer4, this)){
      this.onDestroy();
    }
    else if(this.scene.physics.collide(this.scene.layer5, this)){
      this.onDestroy();
    }
  }
}