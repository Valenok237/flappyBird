const canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');

let bird = new Image();
    bg = new Image();
    fg = new Image();
    pipeUp = new Image();
    pipeBottom = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';

let flyAudio = new Audio();
    scoreAudio = new Audio();

flyAudio.src = 'audio/fly.mp3';
scoreAudio.src = 'audio/score.mp3';

let score = 0;
    gap = 90;
    xPos = 10;
    yPos = 150;

function moveUp(){
    yPos -= 50;
    flyAudio.play();
}

document.addEventListener('keydown', moveUp);

let pipe =[];

pipe[0] = {
    x: canvas.width,
    y: 0
}

const draw = () => {
    context.drawImage(bg, 0, 0);
    for (let i = 0; i < pipe.length; i++){
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y);

        pipe[i].x--;

        if(pipe[i].x == 100) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        };

        if(xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= canvas.height - fg.height + 45) {
            location.reload(); 
        };

        if (pipe[i].x == 5){
            score++;
            scoreAudio.play();
        }
    };
    
    context.drawImage(fg, 0, bg.height - fg.height + 45);
    context.drawImage(bird, xPos, yPos);
    

    yPos += 1.5;

    context.fillStyle = '#000';
    context.font = '24px Verdana';
    context.fillText('Ваш счёт:' + score, 10, canvas.height - 20); 

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;