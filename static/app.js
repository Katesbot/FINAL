  /* data route */
  const wineurl = "/data";
  d3.json(wineurl).then(function(response) {
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
        
    // RENDER CHARTS
    // -----------------------------
    // Plotly.newPlot('distRate', data15);
    // Plotly.newPlot("topTen", data10);
    // Plotly.newPlot("violinRate", data11, layout11);
    // Plotly.newPlot("perStyle", data12);
    zingchart.render({
      id: 'wineWords',
      data: chartConfig
    });
}
  );
}
d3.select("#submit").on("click", handleSubmit);