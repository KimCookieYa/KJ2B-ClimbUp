import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private platform!: Phaser.Physics.Arcade.StaticGroup;
  private player1!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("helloworld");
  }

  preload() {
    this.load.image("background", "wall.png");
    this.load.image("ground", "ground.png");
    this.load.image("logo", "phaser3-logo.png");
    this.load.image("red", "red.png");
    this.load.image("player1_climb1", "Biker_climb_1.png");
    this.load.image("player1", "Biker_climb_2.png");
    this.load.image("player1_climb3", "Biker_climb_3.png");
    this.load.image("player1_climb7", "Biker_climb_7.png");
    this.load.image("player1_climb6", "Biker_climb_6.png");
    this.load.image("player1_walk", "Biker_punch_1.png");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.load.spritesheet("player1_climb", "Biker_climb.png", {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    // store the width and height of the game screen
    const width = this.scale.width;
    const height = this.scale.height;

    // change this.add.image to this.add.tileSprite
    // notice the changed parameters
    this.background = this.add
      .tileSprite(
        -1000,
        2000,
        Number.MAX_SAFE_INTEGER,
        -Number.MAX_SAFE_INTEGER,
        "background"
      )
      .setOrigin(0)
      .setScale(1, 1)
      .setScrollFactor(1, 1);

    this.anims.create({
      key: "climb",
      frames: this.anims.generateFrameNumbers("player1_climb", {}),
      frameRate: 8,
      repeat: -1,
    });

    this.player1 = this.physics.add.sprite(
      width / 2,
      height / 2,
      "player1_climb"
    );
    this.player1.setScale(3);
    this.player1.setBounce(0.2);
    this.player1.setCollideWorldBounds(false);
    this.player1.play("climb", true);

    this.platform = this.physics.add.staticGroup();
    this.platform
      .create(width / 2, height + 200, "ground")
      .setScale(1)
      .refreshBody();

    this.physics.add.collider(this.player1, this.platform);
    this.createEmitter();

    this.cameras.main.startFollow(this.player1);
  }

  createEmitter() {
    const particles = this.add.particles("red");

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");
    this.physics.add.collider(logo, this.platform);
    this.physics.add.collider(logo, this.player1);

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-800);

      this.player1.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(800);

      this.player1.anims.play("right", true);
    } else if (this.cursors.down.isDown) {
      this.player1.setVelocityY(800);

      this.player1.anims.play("down", true);
    } else {
      this.player1.setVelocityX(0);
      this.player1.setVelocityY(0);
      this.player1.anims.play("turn");
    }

    if (this.cursors.up.isDown) {
      this.player1.setVelocityY(-800);
      this.player1.anims.play("climb");
    }
  }
}
