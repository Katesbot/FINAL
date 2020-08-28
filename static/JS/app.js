/* data routes */
const wineurl = "/data";
d3.json(wineurl).then(function(response) {
  console.log(response);
})
const wineurl2 = "/data2";
d3.json(wineurl2).then(function(response) {
  console.log(response);
})
const wineresponse = "/user_answer";
d3.json(wineresponse).then(function(response) { 
  console.log(response);
})

// Import Data
//Form subimssion & sending response to app.py for ML 
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
        ignore: ['&', 'and', 'very', 'is', 'wine', 'often', 'with', 'thats', 'usually','Usually','than','of','wines','wine', 'make'],
        maxItems: 50,
        minLength: '4px',
        palette: ["#fae0de","#fcd0cc","#f7bab5","#96433c","#99382f","#9e1a7b","#b51f12","#a61307","#c41406","#ab271d"],
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
            bar: { color: "#eb3446" },
            steps: [
              { range: [5, 15], color: "#750a02" },
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
          family: 'Courier New, monospace',
          size: 24
        }
      }
    }

    // RENDER CHARTS
    // -----------------------------
    Plotly.newPlot('alcoholContent', data, layout);
  });
}
d3.select("#submit-form").on("click", handleFormSubmit);
d3.select("#reset-form").on("click", handleFormClear);
