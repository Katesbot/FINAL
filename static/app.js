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
        ignore: ['&', 'and', 'very', 'is', 'wine', 'often', 'with', 'thats', 'usually','Usually'],
        maxItems: 50,
        minLength: '4px',
        palette: ["#e09f7d","#e87e6f","#ef5d60","#ec4067","#c62d72","#9e1a7b","#761a68","#4d1955","#311847","#1f1528"],
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