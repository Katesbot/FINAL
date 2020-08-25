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
    function handleSubmit() {
      d3.event.preventDefault();
      var wineChosen = d3.select("#wineInput").node().value;
      console.log(wineChosen);
      d3.select("#wineInput").node().value = "";
      buildPlot(wineChosen);
    }
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
        console.log(response)})
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

    //create a guage with alcohol content - range is for all wines, with buffer for red/white/rose - add in types of wine?
    var wineContent = [{wine: "White", content: .1},{wine: "Red", content: .14},{wine: "Rose", content: .7} ];

    var values = [];

    var content = wineContent.filter(s => s.wine === wineChosen);
  
    content.forEach((x) => {
      Object.entries(x).forEach(([key, value]) => {
        if (key === "content") {
          values.push(value);
        }
       });
    });

    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: values[1],
        type: "indicator",
        mode: "gauge+number+delta",
        gauge: {
          axis: { range: [null, .15] },
          steps: [
            { range: [.07, .12], color: "#96433c" }
          ]
        }
      }
    ];

    var layout = {
      plot_bgcolor:"rgba(0,0,0,0)",
      paper_bgcolor:"rgba(0,0,0,0)",
      title: {
        text:'Alcohol Content',
        font: {
          family: 'Courier New, monospace',
          size: 24
        }
      }
    }
    
    // RENDER CHARTS
    // -----------------------------
    Plotly.newPlot('alcoholContent', data, layout);
    zingchart.render({
      id: 'wineWords',
      data: chartConfig
    });
}
  );
}
d3.select("#submit").on("click", handleSubmit);
d3.select("#submit-form").on("click", handleFormSubmit);
