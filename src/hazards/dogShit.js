export default class DogShit extends Phaser.GameObjects.Sprite {

    constructor(scene, player, x, y, nombreImg) {
        super(scene, x, y, nombreImg);

        this.player = player;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(); //Collision with the limits of the world 
        this.shitIsOnFloor = false;
    }

    preUpdate() {
        super.preUpdate();
        this.falling();
        this.handleCollision();
    }

    falling(){
        if(!shitIsOnFloor) this.body.setGravity(0, 350);
    }
    //Handles the collision with player and floor

    handleCollision() {
        if (this.scene.physics.collide(this.scene.layer5, this)) {
            this.shitIsOnFloor = true;
        }
    }
}