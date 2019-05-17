
//keep track of space to check if boat can fit in specific 
//row or column
let rowEmptySpace = [10,10,10,10,10,10,10,10,10,10];
let colEmptySpace = [10,10,10,10,10,10,10,10,10,10];

//keep track open spots in row or column so when a collion happens we can relocate
//boat within same col or row that the boat was randomly assigned 
let rowOpenSpots = [['0123456789'],['0123456789'],['0123456789'],['0123456789'],['0123456789'],
                    ['0123456789'],['0123456789'],['0123456789'],['0123456789'],['0123456789']];
//let colOpenSpots = ['0123456789','0123456789','0123456789','0123456789','0123456789',
                    //'0123456789','0123456789','0123456789','0123456789','0123456789'];

let boats=[
    {name:'Carrier', size:5, cols: '', orientation:'x-axis', row:'', hits:0},
    {name:'BattleShip', size: 4, cols:'' , orientation:'x-axis', row:'', hits:0},
    {name:'Submarine', size:3, cols:'', orientation:'x-axis', row:'', hits:0},
    {name:'Cruiser', size: 3, cols:'', orientation: 'x-axis', row:'', hits:0},
    {name:'Destroyer', size:2, cols:'', orientation:'x-axis', row:'', hits:0},
     
    
];


let buttonArry = document.querySelectorAll('.btns');

function buttonEvents(){
    
    let boom = new Audio('sounds/boom.mp3');
    let blop = new Audio('sounds/blop.mp3')
    let content='';
    let deadBoats= 0;
    for(let i = 0; i < buttonArry.length; i++){
       
        buttonArry[i].addEventListener('click', 
        function(e){
            console.log(e.target);
            content = e.target.textContent;
            if(content >= 100){
                boom.play();
               
                e.target.style.backgroundImage= 'url(images/fireball.png)';
                
                boats[content-100].hits++;
                
                if(boats[content-100].hits == boats[content-100].size){
                    alert(boats[content-100].name +' is destroyed');
                    deadBoats++;
                }
                if(deadBoats == 5) alert('you win');
                
            }else{
                
                blop.play();
                
                
            }
            
            e.target.disabled=true;
        })
        
    }
    
    
    
}
buttonEvents();


function shipPlacement(){
    
    for(let i = 0; i<boats.length; i++){
        
        let randRow =randomRow(i);
        
        let colStart = randomCol(i);
        
        let colString = ''
        
        let x =' ';
        
        if(rowOpenSpots[randRow/10].length ==1){
            for(let j = 0; j < boats[i].size; j++ )
               colString += colStart+j;
              x = rowOpenSpots[randRow/10][0];
            
            if(x.substr(0,colStart) != "")
            rowOpenSpots[randRow/10].push(x.substr(0,colStart));
            if(x.substr(colStart+boats[i].size) != "")
            rowOpenSpots[randRow/10].push(x.substr(colStart+boats[i].size));
            
           
            
            
        }
        else{
            
            for(let j = 1; j< rowOpenSpots[randRow/10].length;j++){
                
                if(rowOpenSpots[randRow/10][j].length >= boats[i].size){
                     x = rowOpenSpots[randRow/10][j];
                     
                    colStart = parseInt(rowOpenSpots[randRow/10][j].charAt(0));
                    
                    if(x.substr(boats[i].size) != "")
                    rowOpenSpots[randRow/10].push(x.substr(boats[i].size));
                    rowOpenSpots[randRow/10].splice(j,1);
                      
                   
                   
                    
                    break;
                }
             //couldnt fit in row find empty row
                else if( j == rowOpenSpots[randRow/10].length-1){
                    console.log(boats[i].name + ' '+boats[i].row );
                    for(let k = 0; k < rowEmptySpace.length; k++){
                        if(rowEmptySpace[k] == 10){
                            randRow = k*10;
                            boats[i].row = randRow/10;
                            rowEmptySpace[k] -= boats[i].size
                            console.log(k);
                            break;
                        }
                    }
                }
                  
                }
             
        }
        
        let boatStart =randRow + colStart; 
        
         colStart = x.indexOf(colStart);
        
        rowOpenSpots[randRow/10][0] = x.substr(0,colStart) +x.substr(colStart+boats[i].size);
           
      
  
        
        for(let j =boatStart; j<boatStart+boats[i].size; j++){
            
                boats[i].cols += parseInt(buttonArry[j].textContent)%10;
                
                buttonArry[j].textContent = 100+i;
                colEmptySpace[j%10] -= 1;
            
            }
       
        
       
        
        
        
    }
}

shipPlacement();
console.log(boats);


//generates random number to start boat creation on grid and decides if a boat can be placed in 
//random starting location
function randomCol(boatIndex){
    
    let max = 10 - boats[boatIndex].size;
    
    let randCol = Math.floor(Math.random() * (max+1));

    return randCol;
    
    
}

function randomRow(boatIndex){
    
    let randRow = Math.floor(Math.random() *10)*10;
    
    //if theres enough room in row select row if not call this
    //function recursivly until theres a row with enough space
    if(rowEmptySpace[randRow/10] >= boats[boatIndex].size){
    
        boats[boatIndex].row = randRow/10;
    
        rowEmptySpace[randRow/10] -= boats[boatIndex].size;

         return randRow;
        
        }
    
    else return randomRow(boatIndex);
    
   
}

function play(){

    boardSetup();


    let bombsAway = prompt('Guess ship coordinates');
    while(bombsAway != 'quit'){

        
    
        if(board[bombsAway] == 0 || board[bombsAway]==null) alert('You missed');

        else if(board[bombsAway] == 1){ alert('You got em'); board[bombsAway] = 6; numbHits +=1;

                //check to know if ship is dead after every hit
               if(boatCord.includes(bombsAway) && numbHits ==3){ alert('you win'); break;}
              
                
            
        }
   
        console.log(bombsAway +'\n'+ board );
        bombsAway = prompt('Guess ship coordinates');
    }
    
}