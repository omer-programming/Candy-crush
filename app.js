//whole our code is written within this block 
document.addEventListener("DOMContentLoaded", ()=> {
    
    const grid = document.querySelector('.grid'); //getting grid
    const scoreDisplay = document.getElementById('score'); //getting score
    const startbtn = document.querySelector('#start-button'); //getting start button id
    const resetbtn = document.querySelector('#reset-button'); // getting reset button class
    const width = 8; // width equal to 8
    const squares = []; //empty array
    let score = 0 ; //score 0
    
    //arrays of candy images
    const candycolors = [
        'url(/images/red_candy.png)',
        'url(/images/yellow_candy.png)',
        'url(/images/orange_candy.png)',
        'url(/images/purple_candy.png)',
        'url(/images/green_candy.png)',
        'url(/images/blue_candy.png)'
        
    ]
    
    //create board function 
    function createboard(){
        
        for(let i = 0; i < width*width ; i++ ){
            //creating div using create element method
            const square = document.createElement('div');
            //setting draggable attribute
            square.setAttribute('draggable', true );
            //setting id
            square.setAttribute('id', i);
            //getting random color
            let randomColor = Math.floor(Math.random()*candycolors.length);
            //assigning random color to aur squares array
            square.style.backgroundImage = candycolors[randomColor];
            //append child square
            grid.appendChild(square);
            //pushing child(square) to parent (squares)
            squares.push(square);
        }
    }
    
    createboard();

    let ColorBeingReplaced;      //declaring variable
    let ColorBeingDragged;       //declaring variable
    let SquareIdBeingReplaced;   //declaring variable
    let SquareIdBeingDragged;    //declaring variable
    
    squares.forEach(square => square.addEventListener('dragstart', dragStart)); //adding event listener to each squares 
    squares.forEach(square => square.addEventListener('dragend', dragEnd));     //adding event listener to each squares 
    squares.forEach(square => square.addEventListener('dragenter', dragEnter)); //adding event listener to each squares 
    squares.forEach(square => square.addEventListener('dragleave', dragLeave)); //adding event listener to each squares 
    squares.forEach(square => square.addEventListener('dragover', dragOver));   //adding event listener to each squares 
    squares.forEach(square => square.addEventListener('drop', dragDrop));       //adding event listener to each squares 
        
    function dragStart(){
        //assigning background image dragged by user to colorBeingDragged
        ColorBeingDragged= this.style.backgroundImage;
        // we make sure that id is number so using parseInt
        SquareIdBeingDragged = parseInt(this.id);
        console.log(ColorBeingDragged);
        console.log(this.id , 'dragStart' );
    }
    
    function dragOver(e){
        //preventing default functioning of dragover
        e.preventDefault();
        console.log(this.id , 'dragOver');
    }
    
    function dragEnter(e){
        //preventing default functioning of dragEnter
        e.preventDefault();
        console.log(this.id , 'dragEnter');
    }
    
    function dragLeave(e){
        //preventing default functioning of dragLeave
        e.preventDefault();
        console.log(this.id , 'dragLeave');
    }
     
    function dragDrop(){
        //assigning background image replaced by user to colorBeingReplaced
        ColorBeingReplaced = this.style.backgroundImage;
        // we make sure that id is number so using parseInt
        SquareIdBeingReplaced = parseInt(this.id);
        //assigning the color being dragged to color being replaced
        this.style.backgroundImage = ColorBeingDragged;
        //assigning the color being dragged to color being replaced
        squares[SquareIdBeingDragged].style.backgroundImage = ColorBeingReplaced;
        console.log(this.id , 'dragDrop');
    }
    
    function dragEnd() {
        console.log(this.id , 'dragEnd');
        
        //what are valid moves ?
        //two candies need to be directly in a square above , below , to the left , to the right of our current candy  
        let validmoves = [
            
            SquareIdBeingDragged -1, //to the left
            SquareIdBeingDragged -width, //one width back in our array
            SquareIdBeingDragged +1, //to the right
            SquareIdBeingDragged +width //one width forward in our array 
            
        ]
        
        //if the squareIdBeingReplaced includes in our validmoves array , then we store the boolean of true
        let validmove = validmoves.includes(SquareIdBeingReplaced);
        
        //if candy is replaced and validmove is true ,  we want something to happen.
        if( SquareIdBeingReplaced && validmove){
            //setting squareidbeingreplaced to null.
            SquareIdBeingReplaced = null ;
            //if candy is replaced and validmove is not true ,  we want following to happen
        }else if (SquareIdBeingReplaced && !validmove){
            //setting colorbeingreplaced to it's previous position.
            squares[SquareIdBeingReplaced].style.backgroundImage = ColorBeingReplaced;
            //setting colorbeingDragged to it's previous position.
            squares[SquareIdBeingDragged].style.backgroundImage = ColorBeingDragged;
            //in else case for example , if it is dragged outside the container or squares array , setting colorbeingDragged to it's previous position.
        }else squares[SquareIdBeingDragged].style.backgroundImage = ColorBeingDragged;
        
    }

    function MoveDown (){
        for( i = 0 ; i < 55 ; i++){
            //here i'm getting the index plus width and passing it through our sqaures array . once i'm in that square , i want to check that squares background image , if it has empty background image , i want this statement to be true.
               if(squares[i + width].style.backgroundImage === ""){
                //we want to essentially give our squares background image to it , we are passing image to empty square.
               squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                // removing image making it empty .
                // clearing the background image as we get matches  , so there is no space in between .
               squares[i].style.backgroundImage = "";
                 
                //if first row contains empty square , we wanna fill it with the image and we keep doing this until the first row is not empty anymore
                   
                //assigning background image
                //creating first row array
                const firstRow = [1 , 2, 3, 4 ,5, 6 ,7];
                //if (i) is in the first row array . this  statement will come back as the boolean of true.
                const isfirstRow = firstRow.includes(i);
                // if first row is true & and square is with empty background image ,then we need to fill it with color. 
                if(isfirstRow && squares[i].style.backgroundImage === ""){
                    //getting randomcolor 
                    let RandomColor = Math.floor(Math.random() * candycolors.length);
                    //we need to pass randomcolor through our array to get string of color name . we then, assign it to our square in our first row.
                    squares[i].style.backgroundImage = candycolors[RandomColor];
                }
            }
        }
    }
    
    
    function CheckrowForFour (){
        for(i=0; i < 60 ; i++){
            let rowoffour =[ i , i+1 , i+2 , i+3 ];
            //each time we loop over, we also wanna grab the color the first square is and assign it to a decided color.
            let decidedcolor = squares[i].style.backgroundImage ;
            //if the background image is empty which means its blank.
            const isblank = squares[i].style.backgroundImage === "";
            
            //every index i don't want my row of four to start at
            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55];
            //if this number(i) included in the array notvalid , then we wanna skip it
            if(notValid.includes(i)) continue ; 
            
            //if every index in our four array deeply equal to decided color(the color of our first square)and it should'nt be blank . then , we wanna execute the code in if block
            if(rowoffour.every(index => squares[index].style.backgroundImage === decidedcolor && !isblank)){
                score += 4;
                scoreDisplay.innerHTML = score;
                // we are simply taking the row of four array and assigning them empty background(means no image)
                rowoffour.forEach ( index => {
                    squares[index].style.backgroundImage = "";
                });
            
            }
        }
    }
    
    CheckrowForFour();
    
    function checkcolumnForFour (){
        for( i=0 ; i < 39 ; i++ ){
            let columnoffour = [ i , i+width , i+width*2 , i+width*3];
            //each time we loop over, we also wanna grab the color the first square is and assign it to a decided color.
            let decidedcolor = squares[i].style.backgroundImage;
            //if the background image is empty which means its blank.
            const isblank = squares[i].style.backgroundImage === "";
            
            //if every index in our four array deeply equal to decided color(the color of our first square)and it should'nt be blank . then , we wanna execute the code in if block
            if (columnoffour.every(index => squares[index].style.backgroundImage === decidedcolor && !isblank)){
                score +=4;
                scoreDisplay.innerHTML = score;
                // we are simply taking the column of four array and assigning them empty background(means no image)
                columnoffour.forEach (index => {
                    squares[index].style.backgroundImage= "";
                });
                
            }
        }
    }
    
    checkcolumnForFour();
    
    function checkrowforthree (){
        for (i=0 ; i < 61 ; i++){
            let rowofthree = [ i , i+1 , i+2 ];
            //each time we loop over, we also wanna grab the color the first square is and assign it to a decided color.
            let decidedcolor = squares[i].style.backgroundImage;
            //if the background image is empty which means its blank.
            const isblank = squares[i].style.backgroundImage === "";
            
            //every index i don't want my row of three to start at
            const notValid = [ 6 ,7 , 14 , 15 , 22 , 23 , 30 , 31 , 38 , 39 , 46 , 47 , 54 , 55 ];
            //if this number(i) included in the array notvalid , then we wanna skip it 
            if(notValid.includes(i)) continue;
            
            //if every index in our four array deeply equal to decided color(the color of our first square)and it should'nt be blank . then , we wanna execute the code in if block
            if(rowofthree.every(index => squares[index].style.backgroundImage === decidedcolor && !isblank)){
                score +=3;
                scoreDisplay.innerHTML =score;
                // we are simply taking the row of three array and assigning them empty background(means no image)
                rowofthree.forEach ( index => {
                    squares[index].style.backgroundImage="";
                });
            }
        }
    }
    
    checkrowforthree();
    
    function checkcolumnforthree (){
        for ( i = 0 ; i < 47 ; i++){
            let columnofthree = [i, i+width , i+width*2];
            //each time we loop over, we also wanna grab the color the first square is and assign it to a decided color.
            let decidedcolor = squares[i].style.backgroundImage ;
            //if the background image is empty which means its blank.
            let isblank = squares[i].style.backgroundImage === "";
            
            //if every index in our four array deeply equal to decided color(the color of our first square)and it should'nt be blank . then , we wanna execute the code in if block
            if(columnofthree.every(index => squares[index].style.backgroundImage === decidedcolor && !isblank)){
                score +=3;
                scoreDisplay.innerHTML = score;
                // we are simply taking the column of three array and assigning them empty background(means no image)
                columnofthree.forEach(index => {
                    squares[index].style.backgroundImage = "";
                });
            }
        }
    }
    
    checkcolumnforthree();
    
    //On click of start button i want following function to execute through out the game
    startbtn.addEventListener( 'click' , ()=> {
       window.setInterval (function(){
        MoveDown();
        CheckrowForFour();
        checkcolumnForFour();
        checkrowforthree();
        checkcolumnforthree();
    }, 100)
    });
    
    //On click of reset button the game will be reset
    resetbtn.addEventListener( 'click' , ()=> {
       location.reload(); 
    });
    
	
    
//    window.setInterval (function(){
//        MoveDown();
//        CheckrowForFour();
//        checkcolumnForFour();
//        checkrowforthree();
//        checkcolumnforthree();
//    }, 100)

});

