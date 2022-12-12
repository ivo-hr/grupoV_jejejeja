export default class Laser extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Hook
     * @param {Sceme} scene Escena en la que aparece el gancho
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {Player} player el jugador
     */
    constructor(scene, x, y,scal){
        super(scene, x, y,scal,'laserp');
       
        this.setOrigin(0,0.5)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setGravity(0,-100);
        this.scaleX=scal;
        //this.toscal=scal*20;

        //this.setOrigin(x,y);

        
        
        
        //this.graph = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
        //this.line = this.scene.add.existing(new Phaser.Geom.Line(this.x, 500, this.x, this.y));
        this.body.setVelocity(0, 0);

        //esto es para mostrar una linea de disparo, no tiene colisiones
        /*this.line = new Phaser.Geom.Line(400, this.y, this.x, this.y);
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xfa0307 } });
        this.graphics.strokeLineShape(this.line);*/
        
        //this.scene.physics.add.existing(this.line);
        //this.scene.physics.add.collider(this.graphics, this.scene.balls);
        this.scene.physics.add.collider(this, this.scene.walls);
        this.body.setCollideWorldBounds();


        this.charge=this.scene.tweens.add({
            targets:[]
        })

        this.scene.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNumbers('laserp', { start: 0, end: 1 }),
            frameRate: 20,
            repeat: -1
          
            })
        
              this.play('attack');

        //for(let i=0;i<10;i++){
        this.charging();
       // }

    
    }
    
    ent(){
       this.scaleX*=1.1
    }

    charging(){
       

        this.charge=this.scene.tweens.add({
            targets: this,
           
            duration: 300,
            ease:'Linear',
            yoyo:false,
            scaleX: this.scaleX*10
            //onUpdate: this.scaleX*=1.3
            
           
        })
       
    }
    
    onDestroy(){
       // this.graphics.clear();
        //this.destroy(this.line);
       // this.destroy(this.graphics);
        this.destroy(this);
    }
   

    preUpdate(t, dt){
        super.preUpdate(t, dt);
       

            let timer=this.scene.time.addEvent({
                delay: 1000, 
                callback: this.onDestroy,
                callbackScope: this,
                
            });
            
        

        this.scene.physics.add.collider(this.scene.allEnemies, this, (o1, o2) => {
            // hacer algo
            this.scene.player.point();
            o1.onDestroy(); 
            this.body.setVelocity(0, 0);
            //this.onDestroy();
        });

        // if(this.scene.physics.overlap(this.scene.allEnemies, this,)){
        //     this.scene.player.point();
        //     this.onDestroy();
        // }

        // if(this.scene.physics.overlap(this.scene.allEnemies, this)){
        //     this.scene.player.point();
        //     this.onDestroy();
        //     //this.scene.allEnemies.onDestroy();
        // }
       // game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    }
}