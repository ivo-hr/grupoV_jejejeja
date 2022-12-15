export default class DogShit extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y, nombreImg) {
        super(scene, x, y, nombreImg);

        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(); //Collision with the limits of the world
        

        //Whether the Body's pos and rotation are affected by its velocity, acceleration, drag, and gravity.
        this.body.moves = true;  
    }

    preUpdate() {
        super.preUpdate();
        this.falling();
        this.handleCollision();
    }

    falling(){
        this.body.setGravity(0, 300);
    }
    //Handles the collision with player and floor

    handleCollision() {
        if (this.scene.physics.overlap(this.scene.player, this)) {

        }
    }
}