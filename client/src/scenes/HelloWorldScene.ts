import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private platform!: Phaser.Physics.Arcade.StaticGroup;
  private player1!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private filped = false;

  constructor() {
    super("helloworld");
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    // store the width and height of the game screen
    const width = this.scale.width;
    const height = this.scale.height;

    // change this.add.image to this.add.tileSprite
    // notice the changed parameters
    this.background = this.add
      .tileSprite(0, 5000, width, -Number.MAX_SAFE_INTEGER, "background")
      .setOrigin(0)
      .setScale(2)
      .setScrollFactor(1, 1);

    // this.anims.create({
    //   key: "climb",
    //   frames: this.anims.generateFrameNumbers("player1_climb", {}),
    //   frameRate: 8,
    //   repeat: -1,
    // });
    //const map = this.make.tilemap({ key: "infinite" });
    //const tileset = map.addTilesetImage("infinite", "tiles", 16, 16, 1, 2);

    //map.createLayer("infinite_wall", tileset as Phaser.Tilemaps.Tileset, 0, 0);

    //this.physics.add.collider(this.player1, wallsLayer);

    // this.add.image(300, 400, "player1_walk");
    // const map = this.make.tilemap({ key: "tilemap" });

    // // add the tileset image we are using
    // const tileset = map.addTilesetImage("tilemap", "base_tiles");

    // // create the layers we want in the right order
    // map.createLayer("TileLayer1", tileset as Phaser.Tilemaps.Tileset, 0, 0);

    this.player1 = this.physics.add.sprite(width / 2, height / 2, "player1");
    this.player1.setScale(2);
    this.player1.setBounce(0);
    this.player1.setCollideWorldBounds(false);
    this.player1.play("climb", true);

    this.platform = this.physics.add.staticGroup();
    this.platform
      .create(width / 2, height + 200, "ground")
      .setScale(2, 2)
      .refreshBody();
    this.physics.add.collider(this.player1, this.platform);
    this.createEmitter();

    this.cameras.main.startFollow(this.player1);
  }

  createEmitter() {
    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 10,
      scale: { start: 0.2, end: 0 },
      blendMode: "ADD",
    });

    const rock = this.physics.add.image(
      Phaser.Math.Between(0, 1000),
      Phaser.Math.Between(-500, 200),
      "rock"
    );
    this.physics.add.collider(rock, this.player1);

    rock.setScale(0.5);
    rock.setVelocity(Phaser.Math.Between(100, 300), 200);
    rock.setBounce(1.2);
    rock.setAngularVelocity(Phaser.Math.Between(10, 90));

    emitter.startFollow(rock);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-800);
    } else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(800);
    } else if (this.cursors.down.isDown) {
      this.player1.setVelocityY(800);
    } else {
      this.player1.setVelocityX(0);
      this.player1.setVelocityY(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up!)) {
      this.filped = !this.filped;
      this.player1.setVelocityY(-800);
    }
    this.player1.setFlipX(this.filped);
  }
}
