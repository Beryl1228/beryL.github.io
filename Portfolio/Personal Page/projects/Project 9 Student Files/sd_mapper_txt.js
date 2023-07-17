/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 9
   Case Problem 1

   Planisphere Script
   Author:Beryl Liu  
   Date:12/07/2022   

*/

var thisTime = new Date(); //correct format would be "February 3,2018 3:15:28 AM"
// creating a constructor function to show the time. 
var timeStr = thisTime.toLocaleString();
document.getElementById("timeStamp").innerHTML = timeStr;
// change the value of timestamp

var thisHour = thisTime.getHours();
var thisMonth = thisTime.getMonth();
var thisDay = thisTime.getDay();
var mapNum = (2*thisMonth+ thisHour)%24; 
// this steps were used to select the number of the image. 

var imgStr = "<img src='sd_sky"+ mapNum +".png' />";
//insert the selected image to the HTML file


var div = document.getElementById("planisphere").insertAdjacentHTML("afterbegin", imgStr);
// insert the image to div with id="planisphere" 