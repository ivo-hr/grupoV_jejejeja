export default class Dashield extends Phaser.GameObjects.Sprite {
    /**
     * Constructor de Hook
     * @param {Sceme} scene Escena en la que aparece el gancho
     * @param {number} x coordenada x
     * @param {number} y coordenada y
     * @param {Player} player el jugador
     */
    constructor(scene, x, y,scal){
        super(scene, x, y);
       
        this.setOrigin(0,0.5)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setGravity(0,-100);
        //this.body.setCollideWorldBounds(false,false);
        this.scaleX=1;
       
       

        //this.graph = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xaa00aa } });
        //this.line = this.scene.add.existing(new Phaser.Geom.Line(this.x, 500, this.x, this.y));
        

        //esto es para mostrar una linea de disparo, no tiene colisiones
        /*this.line = new Phaser.Geom.Line(400, this.y, this.x, this.y);
        this.graphics = this.scene.add.graphics({ lineStyle: { width: 4, color: 0xfa0307 } });
        this.graphics.strokeLineShape(this.line);*/
        
        //this.scene.physics.add.existing(this.line);
        //this.scene.physics.add.collider(this.graphics, this.scene.balls);
        
    }
    
    ent(){
       this.scaleX*=1.1
    }

    charging(){
       if(this.dir===1){

        this.charge=this.scene.tweens.add({
            targets: this,
           
            duration: 300,
            ease:'Linear',
            yoyo:false,
            scaleX: this.scaleX*this.elong,
            
            //onUpdate: this.scaleX*=1.3
            
           
        })
       }
       else if(this.dir===-1){
        this.x=this.x-30;
        this.charge=this.scene.tweens.add({
            targets: this,
           
            duration: 300,
            ease:'Linear',
            yoyo:false,
            scaleX: this.scaleX*this.elong,
            x: this.x-27.5*this.elong
            //onUpdate: this.scaleX*=1.3
            
        })



       }
       
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
                delay: 200, 
                callback: this.onDestroy,
                callbackScope: this,
                
            });
            
        this.x=this.scene.player.x;
        this.y=this.scene.player.y;

        this.scene.physics.add.collider(this.scene.allEnemies, this, (o1, o2) => {
            // hacer algo
            
            o1.minusHP(2); 
            
            //this.onDestroy();
        });

    }
}