
const h1 = document.getElementById("hello");

let isRed= false;

h1.addEventListener('click', function(){
    if(isRed){ 
        
        h1.style.color = 'green';
        isRed = false;
    }else{ 
        h1.style.color = 'red';
        isRed = true;
    }

});