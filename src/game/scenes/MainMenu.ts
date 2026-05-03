import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
	background: GameObjects.Image;
	logo: GameObjects.Image;
	title: GameObjects.Text;
	logoTween: Phaser.Tweens.Tween | null;

	constructor() {
		super('MainMenu');
	}

	create() {
		const { width, height } = this.scale;
		const dpr = window.devicePixelRatio || 1;

		this.background = this.add.image(width / 2, height / 2, 'background')
			.setDisplaySize(width, height);

		this.logo = this.add.image(width / 2, height * 0.39, 'logo').setDepth(100);

		this.title = this.add.text(width / 2, height * 0.6, 'Main Menu', {
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
		this.logo.setPosition(width / 2, height * 0.39);
		this.title.setPosition(width / 2, height * 0.6);
	}

	changeScene() {
		if (this.logoTween) {
			this.logoTween.stop();
			this.logoTween = null;
		}

		this.scale.off('resize', this.handleResize, this);
		this.scene.start('Game');
	}

	moveLogo(reactCallback: ({ x, y }: { x: number, y: number }) => void) {
		if (this.logoTween) {
			if (this.logoTween.isPlaying()) {
				this.logoTween.pause();
			}
			else {
				this.logoTween.play();
			}
		}
		else {
			this.logoTween = this.tweens.add({
				targets: this.logo,
			x: { value: this.scale.width * 0.73, duration: 3000, ease: 'Back.easeInOut' },
			y: { value: this.scale.height * 0.1, duration: 1500, ease: 'Sine.easeOut' },
				yoyo: true,
				repeat: -1,
				onUpdate: () => {
					if (reactCallback) {
						reactCallback({
							x: Math.floor(this.logo.x),
							y: Math.floor(this.logo.y)
						});
					}
				}
			});
		}
	}
}
