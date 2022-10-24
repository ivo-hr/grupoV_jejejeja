export default class Bullet extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Hook
     * @param {Sceme} scene Escena en la que aparece el gancho
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {Player} player el jugador
     */
    constructor(scene, x, y){
        super(scene, x, y, 'star');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        
        //this.graph = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
        //this.line = this.scene.add.existing(new Phaser.Geom.Line(this.x, 500, this.x, this.y));
        this.body.setVelocity(400, 0);

        //esto es para mostrar una linea de disparo, no tiene colisiones
        /*this.line = new Phaser.Geom.Line(400, this.y, this.x, this.y);
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xfa0307 } });
        this.graphics.strokeLineShape(this.line);*/
        
        //this.scene.physics.add.existing(this.line);
        //this.scene.physics.add.collider(this.graphics, this.scene.balls);
        this.scene.physics.add.collider(this, this.scene.walls);
        this.body.setCollideWorldBounds();
        
    
    }

    onDestroy(){
        this.graphics.clear();
        this.destroy(this.line);
        this.destroy(this.graphics);
        this.destroy(this);
    }
   

    preUpdate(){
        super.preUpdate();
        if(this.body.newVelocity.y <= 0){ 
            this.line.y2 = this.y;
            this.graphics.strokeLineShape(this.line);
        }
        else{

            let timer=this.scene.time.addEvent({
                delay: 2000, 
                callback: this.onDestroy,
                callbackScope: this,
                
            });
            
        }
        if(this.scene.physics.overlap(this.scene.allballs, this)){
            this.scene.player.point();
            this.onDestroy();
            //this.scene.allballs.onDestroy();
        }
        
    }
}