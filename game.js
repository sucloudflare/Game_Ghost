class mainScene {
    preload() {
        this.load.image('player', 'assets/01.png');
        this.load.image('coin', 'assets/02.png');
        this.load.audio('collectCoinSound', 'assets/03.mp3');
    }

    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 300, 'coin');

        this.score = 0;
        this.highScore = localStorage.getItem('highScore') || 0; // Recupera o recorde máximo do armazenamento local

        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'Pontuação: ' + this.score + '\nRecorde: ' + this.highScore, style);

        this.arrow = this.input.keyboard.createCursorKeys();
        this.collectCoinSound = this.sound.add('collectCoinSound', { loop: true });
        this.collectCoinSound.play();
    }

    update() {
        if (this.arrow.right.isDown) {
            this.player.x += 3;
        } else if (this.arrow.left.isDown) {
            this.player.x -= 3;
        } 

        if (this.arrow.down.isDown) {
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        } 

        if (this.physics.overlap(this.player, this.coin)) {
            this.hit();

            this.tweens.add({
                targets: this.player,
                duration: 200,
                scaleX: 1.2,
                scaleY: 1.2,
                yoyo: true,
            });
        }
    }

    hit() {
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);

        this.score += 10;

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('highScore', this.highScore); // Atualiza o recorde máximo no armazenamento local
        }

        this.scoreText.setText('Pontuação: ' + this.score + '\nRecorde: ' + this.highScore);
    }
}

new Phaser.Game({
    width: 700,
    height: 400,
    backgroundColor: '#333',
    scene: mainScene,
    physics: { default: 'arcade' },
    parent: 'game',
});
