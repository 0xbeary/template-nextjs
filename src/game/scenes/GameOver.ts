import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
	camera: Phaser.Cameras.Scene2D.Camera;
	background: Phaser.GameObjects.Image;
	gameOverText: Phaser.GameObjects.Text;

	constructor() {
		super('GameOver');
	}

	create() {
		const { width, height } = this.scale;
		const dpr = window.devicePixelRatio || 1;

		this.camera = this.cameras.main;
		this.camera.setBackgroundColor(0xff0000);

		this.background = this.add.image(width / 2, height / 2, 'background')
			.setAlpha(0.5)
			.setDisplaySize(width, height);

		this.gameOverText = this.add.text(width / 2, height / 2, 'Game Over', {
			fontFamily: 'Arial Black', fontSize: 64 * dpr, color: '#ffffff',
			stroke: '#000000', strokeThickness: 8 * dpr,
			align: 'center'
		}).setOrigin(0.5).setDepth(100);

		this.scale.on('resize', this.handleResize, this);

		EventBus.emit('current-scene-ready', this);
	}

	handleResize(gameSize: Phaser.Structs.Size) {
		const { width, height } = gameSize;
		this.background.setPosition(width / 2, height / 2).setDisplaySize(width, height);
		this.gameOverText.setPosition(width / 2, height / 2);
	}

	changeScene() {
		this.scale.off('resize', this.handleResize, this);
		this.scene.start('MainMenu');
	}
}
