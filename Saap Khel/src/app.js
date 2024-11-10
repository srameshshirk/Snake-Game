(function(){
    var size = 700;
    var grid = size / 70;
    var field = document.getElementById('field');
    // @ts-ignore
    field.height = field.width = size * 2;
    var newDirection;
    var direction = newDirection = -1; // -2: up, 2: down, -1: left, 1: right
    field.style.height = field.style.width = size + 'px';
    // @ts-ignore
    var context = field.getContext('2d');
    context.scale(2,2);

    var food = null;
    var snakelength = 5;
    var snake = [{x: size/2,y: size/2}];
    var end = false;
    var score = 0;

    function randomOf() {
        console.log();
        return Math.floor(Math.random() * (size / grid)) * grid;
    }

    function coordtoString(obj) {
        return [obj.x, obj.y].join(',');
    }


    function tick(){
        var snakeObj = {x: snake[0].x, y: snake[0].y};

        if (Math.abs(direction) !== Math.abs(newDirection)) {
            direction = newDirection;
          }
    
    
          var axis = Math.abs(direction) === 1 ? 'x' : 'y'; // 1, -1 are X; 2, -2 are Y
          if (direction < 0) {
            snakeObj[axis] -= grid; // Move left or down
          } else {
            snakeObj[axis] += grid; // Move right or up
          }

        if(food && food.x == snakeObj.x && food.y == snakeObj.y){
            
            food = null;
            score++;
            snakelength += 1; 
        }
      

        context.fillStyle = '#000000';
        context.fillRect(0,0,size,size);

        if(end){
            context.fillStyle = '#FF0000';
            context.font = '30px Arial';
            context.fillText('Game Over', size/2 - 100, size/2);
            context.fillText('Score: ' + score, size/2 - 100, size/2 + 30);
            if(newDirection == 5){ // will have to edit here
                location.reload();
            }
        }else {
            snake.unshift(snakeObj);
            snake = snake.slice(0,snakelength);
            context.fillStyle = '#e8dbb0'; //score
            context.font = '20px Monospace';
            context.fillText('Score:'+score, 5, 20);
            
        }

       

        if(snakeObj.x < 0 || snakeObj.y < 0 || snakeObj.x >= size || snakeObj.y >= size){
            end = true;
        } //  collosion with the wall 



        context.fillStyle = '#00FF00';
        var snakePart = {};
        for(var i=0;i<snake.length; i++){
            var a = snake[i];
            context.fillRect(a.x, a.y, grid-1, grid-1);
            console.log('snake', snake);
            if (i > 0) snakePart[coordtoString(a)] = true;
        }

        if (snakePart[coordtoString(snakeObj)]) {
            end = true; // Collided with the snake tail
          }

          while(!food || snakeObj[coordtoString(food)]){
            food = {x: randomOf(), y: randomOf()};
        }

        context.fillStyle = '#e8dbb0';
        context.fillRect(food.x, food.y, grid, grid);
        console.log('food', food);
    }
    window.onload = function(){
        setInterval(tick, 100);
        window.onkeydown = function(e){
            newDirection = {37: -1, 38: -2, 39: 1, 40: 2, 32: 5}[e.keyCode] || newDirection;
        }
    }
})()