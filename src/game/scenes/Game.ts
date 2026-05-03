import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
	camera: Phaser.Cameras.Scene2D.Camera;
	background: Phaser.GameObjects.Image;
	gameText: Phaser.GameObjects.Text;

	constructor() {
		super('Game');
	}

	create() {
		const { width, height } = this.scale;
		const dpr = window.devicePixelRatio || 1;

		this.camera = this.cameras.main;
		this.camera.setBackgroundColor(0x00ff00);

		this.background = this.add.image(width / 2, height / 2, 'background')
			.setAlpha(0.5)
			.setDisplaySize(width, height);

		this.gameText = this.add.text(width / 2, height / 2, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
			fontFamily: 'Arial Black', fontSize: 38 * dpr, color: '#ffffff',
			stroke: '#000000', strokeThickness: 8 * dpr,
			align: 'center'
		}).setOrigin(0.5).setDepth(100);

		this.scale.on('resize', this.handleResize, this);

		EventBus.emit('current-scene-ready', this);
	}

	handleResize(gameSize: Phaser.Structs.Size) {
		const { width, height } = gameSize;
		this.background.setPosition(width / 2, height / 2).setDisplaySize(width, height);
		this.gameText.setPosition(width / 2, height / 2);
	}

	changeScene() {
		this.scale.off('resize', this.handleResize, this);
		this.scene.start('GameOver');
	}
}
