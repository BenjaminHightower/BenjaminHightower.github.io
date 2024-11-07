function tellFortune(numChildren, partnerName, location, jobTitle) {
    return (`You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`);
  }

  tellFortune(2, "Leslie", "Texas", "Software Engineer");  
  tellFortune(0, "Nick", "London", "Teacher");
  tellFortune(3, "Ben", "Boulder", "Chef");

  document.getElementById("para1").innerHTML =   tellFortune(2, "Leslie", "Texas", "Software Engineer");
  document.getElementById("para2").innerHTML =   tellFortune(0, "Nick", "London", "Teacher");
  document.getElementById("para3").innerHTML =   tellFortune(3, "Raphaelle", "France", "Chef");