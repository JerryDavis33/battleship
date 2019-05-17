


//creating board 
for(let i = 0, j=0; i<121; i++){
    
     
                    
    if(i == 0){
     
        elementCreator('span','class','coordinates','board','');
    }
        else if(i > 0 && i < 11){ 
            
             elementCreator('span','class','coordinates', 'board', String.fromCharCode(i+64));
        }
        else if(i % 11 == 0){
          
            elementCreator('span','class','coordinates', 'board', i /11);
            
        } 
    
        else{
            
            content  =j;
            elementCreator('button','class','btns', 'board', j);
            j++;
        }
}


    


//creates dom elements 
function elementCreator(elementType, attribute, attributeName, parentElement, tagContent){
     let newElement = document.createElement(elementType);
        newElement.setAttribute(attribute, attributeName);
        document.getElementById(parentElement).appendChild(newElement);
        newElement.innerHTML =tagContent ;
     
}




