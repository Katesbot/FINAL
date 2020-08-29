/* data routes */
const wineurl = "/data";
d3.json(wineurl).then(function(response) {
  console.log(response);
})
const wineurl2 = "/data2";
d3.json(wineurl2).then(function(response) {
  console.log(response);
})
const wineurl3 = "/data3";
d3.json(wineurl3).then(function(response) {
  console.log(response);
})
const wineresponse = "/user_answer";
d3.json(wineresponse).then(function(response) { 
  console.log(response);
})

// Import Data
//Form subimssion & sending response to app.py for Machine Learning
function handleFormSubmit() {
  d3.event.preventDefault();
  var responsearray = [];
  var genderChosen = d3.select("#genderSelect").node().value;
  var ehtnicityChosen = d3.select("#ethnicitySelect").node().value;
  var loctionChosen = d3.select("#selectLocation").node().value;
  var educationChosen = d3.select("#selectEducation").node().value;
  var maritalChosen = d3.select("#maritalSelect").node().value;
  var chocolateChosen = d3.select("#selectChocolate").node().value;
  var cheeseChosen = d3.select("#selectCheeese").node().value;
  var alcoholChosen = d3.select("#selectAlcohol").node().value;
  var coffeeChosen = d3.select("#selectCoffee").node().value;
  var candyChosen = d3.select("#selectCandy").node().value;
  var scentChosen = d3.select("#selectScent").node().value;
  var dressingChosen = d3.select("#selectDressing").node().value;
  var ageChosen = d3.select("#ageInput").node().value;
  var responsearray = [ageChosen, genderChosen, ehtnicityChosen, loctionChosen, 
  educationChosen, maritalChosen, chocolateChosen, cheeseChosen, 
  alcoholChosen, coffeeChosen, candyChosen, scentChosen, dressingChosen];
  console.log(responsearray);
  d3.json("/user_answer",{
    method: "POST",
    body: JSON.stringify({responses: responsearray}),
    headers: {
    "content-type": "application/json"
  }
  }).then(response => {
  var wineselection = response[0].Results;
  document.getElementById("winePrediction").innerHTML = wineselection;
  buildPlot(wineselection)
  });
}
//clear form entries
function handleFormClear() {
  document.getElementById("#genderSelect").reset();
  document.getElementById("#ethnicitySelect").reset();
  document.getElementById("#selectLocation").reset();
  document.getElementById("#selectEducation").reset();
  document.getElementById("#maritalSelect").reset();
  document.getElementById("#selectChocolate").reset();
  document.getElementById("#selectCheeese").reset();
  document.getElementById("#selectAlcohol").reset();
  document.getElementById("#selectCoffee").reset();
  document.getElementById("#selectCandy").reset();
  document.getElementById("#selectScent").reset();
  document.getElementById("#selectDressing").reset();
  document.getElementById("#ageInput").reset();
}

//build visualizations 
function basePlot() {
  d3.json(wineurl).then(function(dataWine) {
    var wineData = dataWine.map(function(x) {
      return x.Description;
    });
    console.log(wineData);
    var wineDescription = []
    // Iterate through each  object
    for (var i = 0; i < wineData.length; i++) {
      var value = wineData[i].split(" ")
      wineDescription.push(value);
      }
    var myWords = wineDescription.toString().split(",").join(" ")
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; 
    let chartConfig = {
      type: 'wordcloud',
      backgroundColor:'none',
      plotarea: {
        backgroundColor: 'transparent'
      },
      options: {
        text: myWords,
        aspect: 'spiral',
        colorType: 'palette',
        ignore: ['&', 'and', 'very', 'is', 'wine', 'often', 'with', 'thats', 'usually','Usually','than','of','wines','wine', 'make', 'notes', 'full', 'flavors', 'flavours', 'tannin', 'from'],
        maxItems: 50,
        minLength: '4px',
        palette: ["#4ecdc4","#cb30a6","#f6b9c0","#e75e78","#CB3059","#E7885E","#E75EBD","#f5c0e4","#4c4c4c","#000000"],
        rotate: true,
        style: {
          tooltip: {
            text: '%hits',
            padding: '5px',
            alpha: 0.9,
            backgroundColor: '#D32F2F',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white',
            fontFamily: 'Ranchers',
            textAlpha: 1,
            visible: true,
            width: '50px',
            wrapText: true
          },
          fontFamily: 'Ranchers',
          hoverState: {
            backgroundColor: '#1976D2',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white'
          } 
        }
      }
    };

    zingchart.render({
      id: 'wineWords',
      data: chartConfig
    });
  });
}



function buildPlot(wineChosen) {
  d3.json(wineurl).then(function(dataWine) {

    var wineData = dataWine.filter(s => s.Type === wineChosen);
    console.log(wineData);

    var description = wineData.map(function(x) {
      return x.Description;
    });

    var wineDescriptions = []
    // Iterate through each  object
    for (var i = 0; i < description.length; i++) {
      var value = description[i].split(" ")
      wineDescriptions.push(value);
      }
    var myWords = wineDescriptions.toString().split(",").join(" ")
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"]; 
    let chartConfig = {
      type: 'wordcloud',
      backgroundColor:'none',
      plotarea: {
        backgroundColor: 'transparent'
      },
      options: {
        text: myWords,
        aspect: 'spiral',
        colorType: 'palette',
        ignore: ['&', 'and', 'very', 'is', 'wine', 'often', 'with', 'thats', 'usually','Usually','than','of','wines','wine', 'make', 'notes', 'full', 'flavors', 'flavours', 'tannin', 'from'],
        maxItems: 50,
        minLength: '4px',
        palette: ["#4ecdc4","#cb30a6","#f6b9c0","#e75e78","#CB3059","#E7885E","#E75EBD","#f5c0e4","#4c4c4c","#000000"],
        rotate: true,
        style: {
          tooltip: {
            text: '%hits',
            padding: '5px',
            alpha: 0.9,
            backgroundColor: '#D32F2F',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white',
            fontFamily: 'Ranchers',
            textAlpha: 1,
            visible: true,
            width: '50px',
            wrapText: true
          },
          fontFamily: 'Ranchers',
          hoverState: {
            backgroundColor: '#1976D2',
            borderColor: 'none',
            borderRadius: '3px',
            fontColor: 'white'
          } 
        }
      }
    };

    // RENDER WORD CHART
    // -----------------------------
    zingchart.render({
      id: 'wineWords',
      data: chartConfig
    });
  });

  // NEW CALL FOR NEXT DATASET - GUAGE CHART
  d3.json(wineurl2).then(function(content) {
    var wineContent = content.filter(s => s.Wine === wineChosen);
    console.log(wineContent);

    var min = wineContent.map(function(x) {
      return x.Min;
    });

    var max = wineContent.map(function(x) {
      return x.Max;
    });

    var average = wineContent.map(function(x) {
      return x.Average;
    });

    console.log(average);

    var data = [
        {
          domain: { x: [0, 20], y: [0, 1] },
          value: average[0],
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 20] },
            bar: { color: "#4ecdc4" },
            steps: [
              { range: [5, 15], color: "#cb30a6" },
              { range: [min[0], max[0]], color: "#fac4c0" }
            ],
          },
          
        }];

    var layout = {
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      title: {
        text:'Alcohol Content %',
        font: {
          family: 'Tangerine',
          size: 36,
          color: "#cb30a6"
        }
      }
    }

    // RENDER GAUGE
    // -----------------------------
    Plotly.newPlot('alcoholContent', data, layout);
  });

    // NEW CALL FOR NEXT DATASET - GUAGE CHART
    d3.json(wineurl3).then(function(counts) {
      var wineCounts = counts.filter(s => s.Wine === wineChosen);
      console.log(wineCounts);
  
      var count = wineCounts.map(function(x) {
        return x.Count;
      });

      console.log(count);

      var variety = wineCounts.map(function(x) {
        return x.Variety;
      });

      console.log(variety);
  
      var data1 = [{
        values: count,
        labels: variety,
        textinfo: 'none',
        type: 'pie',
        marker: {
          colors: ["#4ecdc4","#cb30a6","#F4AB26","#C2C0BE","#f6b9c0","#33B5AC","#CB3059","#E75EBD","#4c4c4c","#e75e78","#f5c0e4","#E99416"]
        },
      }];
  
      var layout1 = {
        plot_bgcolor:"rgba(0,0,0,0)",
        paper_bgcolor:"rgba(0,0,0,0)",
        title: {
          text:`Most Voted ${wineChosen} Wines`,
          font: {
            family: 'Tangerine',
            size: 36,
            color: "#cb30a6"
          }
        }
      }
  
      // RENDER PIE
      // -----------------------------
      Plotly.newPlot('wineCounts', data1, layout1);
    });
}

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
document.addEventListener("DOMContentLoaded", basePlot);
d3.select("#submit-form").on("click", handleFormSubmit);
d3.select("#reset-form").on("click", handleFormClear);
