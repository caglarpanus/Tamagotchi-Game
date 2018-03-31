$(document).ready(function() {
  
    //Displaying the weather condition as background image when the page is loaded.
    function weather(){
        var Geo ={};
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success,error);
        }else{
          alert("Geolocation is not supported");
        }
        function error(){
          alert("Sorry, your background won't be able to change.")
        }
        //If the user's browser is compatible to detect the location, then this function works.Otherwise, it will give the error above.
        function success(position){
          Geo.lat = position.coords.latitude;
          Geo.lon = position.coords.longitude;
          var appID = "&appid=96d9998aea65bf4a2c82d20b6f51afde";
          var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + Geo.lat + "&lon=" + Geo.lon + "&appid=96d9998aea65bf4a2c82d20b6f51afde";
          $.ajax({
              url:weatherUrl,
              method:"GET"
            }).done(function(response){
              
              
              console.log(response);
              var weatherIcon = response.weather[0].icon;
              var imagePath = "/images/"+ weatherIcon + ".jpg";
              console.log(imagePath);
            
              // $('.app-wrapper').css('background-image','url('+ imagePath +')');
              // $(".app-wrapper").show();
            });
        }
    }
    weather();
     // Show sideNav
      // Materialize requires initialize the select element. You will need a seperate call for any dynamically generated select elements your page generates.
      //See the documentation as well.
    // Grab if the user wants to enter his/her own name post it 

      //Grab if the user wants to go with a tamagochi that he/she likes.
      $(document).ready(function(){
        $("select").formSelect();
      });
      
      $(document).ready(function(){
        $('.sidenav').sidenav();
      });
    });