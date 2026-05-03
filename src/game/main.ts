import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game';
import { MainMenu } from './scenes/MainMenu';
import { AUTO, Game, Scale } from 'phaser';
import { Preloader } from './scenes/Preloader';

const dpr = window.devicePixelRatio || 1;

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: Math.round(window.innerWidth * dpr),
	height: Math.round(window.innerHeight * dpr),
	parent: 'game-container',
	backgroundColor: '#028af8',
	scale: {
		mode: Scale.NONE,
	},
	scene: [
		Boot,
		Preloader,
		MainMenu,
		MainGame,
		GameOver
	]
};

const StartGame = (parent: string) => {

	return new Game({ ...config, parent });

}

export default StartGame;
