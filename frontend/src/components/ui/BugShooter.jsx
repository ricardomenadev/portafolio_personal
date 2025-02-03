// components/ui/BugShooter.jsx
import React, { useState, useEffect, useRef } from 'react';

const BugShooter = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  class Player {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = 50;
      this.height = 50;
      this.x = canvas.width / 2 - this.width / 2;
      this.y = canvas.height - this.height - 10;
      this.speed = 5;
      this.bullets = [];
    }

    draw() {
      this.ctx.fillStyle = '#61dafb';
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      
      // Dibujar símbolo de código
      this.ctx.font = '30px monospace';
      this.ctx.fillStyle = '#000';
      this.ctx.fillText('</>', this.x + 5, this.y + 35);
      
      // Dibujar balas
      this.bullets.forEach(bullet => bullet.draw());
    }

    moveLeft() {
      if (this.x > 0) this.x -= this.speed;
    }

    moveRight() {
      if (this.x < this.canvas.width - this.width) this.x += this.speed;
    }

    shoot() {
      this.bullets.push(new Bullet(this.canvas, this.x + this.width / 2, this.y));
    }

    update() {
      this.bullets = this.bullets.filter(bullet => bullet.y > 0);
      this.bullets.forEach(bullet => bullet.update());
    }
  }

  class Bullet {
    constructor(canvas, x, y) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.x = x;
      this.y = y;
      this.speed = 7;
      this.radius = 5;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#fff';
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    update() {
      this.y -= this.speed;
    }
  }

  class Bug {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.width = 30;
      this.height = 30;
      this.x = Math.random() * (canvas.width - this.width);
      this.y = 0;
      this.speed = 2;
    }

    draw() {
      this.ctx.font = '20px monospace';
      this.ctx.fillStyle = '#ff0000';
      this.ctx.fillText('🐛', this.x, this.y);
    }

    update() {
      this.y += this.speed;
    }

    checkCollision(bullet) {
      return (
        bullet.x > this.x &&
        bullet.x < this.x + this.width &&
        bullet.y > this.y &&
        bullet.y < this.y + this.height
      );
    }
  }

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let player;
    let bugs = [];
    let animationFrameId;
    let bugSpawnInterval;

    const init = () => {
      canvas.width = 600;
      canvas.height = 400;
      player = new Player(canvas);
      bugs = [];
    };

    const spawnBug = () => {
      bugs.push(new Bug(canvas));
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') player.moveLeft();
      if (e.key === 'ArrowRight') player.moveRight();
      if (e.key === ' ') player.shoot();
    };

    const gameLoop = () => {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      player.draw();
      player.update();

      bugs.forEach((bug, bugIndex) => {
        bug.draw();
        bug.update();

        // Revisar colisiones con balas
        player.bullets.forEach((bullet, bulletIndex) => {
          if (bug.checkCollision(bullet)) {
            bugs.splice(bugIndex, 1);
            player.bullets.splice(bulletIndex, 1);
            setScore(prevScore => prevScore + 10);
          }
        });

        // Game Over si el bug llega abajo
        if (bug.y + bug.height > canvas.height) {
          setGameOver(true);
          setGameStarted(false);
          cancelAnimationFrame(animationFrameId);
          clearInterval(bugSpawnInterval);
        }
      });

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    init();
    window.addEventListener('keydown', handleKeyDown);
    bugSpawnInterval = setInterval(spawnBug, 2000);
    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationFrameId);
      clearInterval(bugSpawnInterval);
    };
  }, [gameStarted]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-700 rounded-lg"
        />
        
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setGameStarted(true)}
            >
              Iniciar Juego
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            <h2 className="text-white text-2xl mb-4">Game Over</h2>
            <p className="text-white mb-4">Score: {score}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => {
                setGameOver(false);
                setScore(0);
                setGameStarted(true);
              }}
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-white">
        <p>Score: {score}</p>
        <p className="text-sm mt-2">
          Usa ← → para moverte y ESPACIO para disparar
        </p>
      </div>
    </div>
  );
};

export default BugShooter;