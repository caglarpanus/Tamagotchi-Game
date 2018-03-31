const dogArr = [
  "./../images/dog-normal.gif",
  "./../images/dog-sleep.gif",
  "./../images/dog-fed.gif"
];
const catArr = [
  "./../images/cat-normal.gif",
  "./../images/cat-sleep.gif",
  "./../images/cat-fed.gif"
];
const birdArr = [
  "./../images/bird-normal.gif",
  "./../images/bird-sleep.gif",
  "./../images/bird-fed.gif"
];
const gorillaArr = [
  "./../images/happy-gorilla.gif",
  "./../images/sleepy-gorilla.gif",
  "./../images/mad-gorilla.gif"
];
const sonicArr = [
  "./../images/happy-sonic.gif",
  "./../images/sleepy-sonic.gif",
  "./../images/mad-sonic.gif"
];

$(document).ready(() => {
  //alert(Date.now();
  const charButton = $("#character-button");
  const sleepButton = $("#sleep-button");
  const cleanButton = $("#clean-button");
  const feedButton = $("#feed-button");
  const hungerLevel = $("#hunger-level");
  let petId;
  let petLastFed;
  var iterate = true;

  function secondCounter(time, petName) {
    var newTime = parseInt(time);
    function displayNum() {
      if(!iterate){
        clearInterval(iterator)
      }
      newTime += 0.008;
      hungerLevel.text(
        `${newTime.toFixed(
          1
        )} minutes have passed since ${petName} was last fed`
      );
    }
    var iterator = setInterval(displayNum, 500);
  }

  //ajax call to get timestamp from database
  $.ajax({ url: "/my-pet/api", method: "GET" })
    .then(pets => {
      console.log(pets);
      console.log(pets)
      let chosenPet;
      console.log(window.location.href.split('/'))
      var nameArr = window.location.href.split('/');
      var petName = nameArr[4]
      pets.forEach(({name, petType, id, lastFed}) => {
        if(name === petName){
          chosenPet = petType;
          petId = id;
          petLastFed = lastFed;
          console.log(chosenPet,petId,petLastFed)
        }
      })
      
      switch (chosenPet) {
        case "dog":
          chosenPet = dogArr;
          break;
        case "cat":
          chosenPet = catArr;
          break;
        case "gorilla":
          chosenPet = gorillaArr;
                  break;
        case "sonic":
          chosenPet = sonicArr;
      }

      console.log(chosenPet);

      charButton.attr("src", chosenPet[0]);
      // Pet is asynchronously acquired
      // Put click functions within ajax call since pet is set asynchrously
      //
      feedButton.click(function() {
        charButton.attr("src", chosenPet[2]);
        iterate = false;
        setTimeout(function(){
          iterate = true;
          secondCounter(0,petName)
          setTimeout(function(){
            $('#character-button').attr('src',chosenPet[0])
          },500)
        },1000)
        $.ajax({
          url: "/my-pet/api",
          method: "PATCH",
          data: { id: petId },
          success: data => location.reload()
        }).then(data => location.reload());
      });
      //
      var sleep = false;
      sleepButton.click(function() {
        if (sleep) {
          charButton.attr("src", chosenPet[1]);
          sleep = false;
        } else {
          charButton.attr("src", chosenPet[0]);
          sleep = true;
        }
      });
      //
      var elapsedTime = (Date.now() - parseFloat(petLastFed)) / 1000 / 60;
      console.log(
        `${elapsedTime} minutes have passed since ${petName} was last fed`
      );
      hungerLevel.html(
        `${elapsedTime.toFixed(2)} minutes have passed since ${
          petName
        } was last fed`
      );
      secondCounter(elapsedTime.toFixed(2), petName);
    })
    .catch(err => console.log(err));
});
