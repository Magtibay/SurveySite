// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/survey-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();

/// Take you for participating

(function(){

    function Start()
    {

        let submitAnswer = document.querySelector(".btn-primary");
        
        for(button of submitAnswer)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Thank you for responding!")) 
                {
                    event.preventDefault();
                    window.location.assign('/survey-list/participate');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();