/*

This contains the code relating to the visualizations of the learning overtime

*/

function createLineGraph(elementName, arrayToDisplay) {
  // clear it first
  var svg = d3.select(elementName);
  svg.selectAll("*").remove();

  var vis = d3.select(elementName),
    WIDTH = 600,
    HEIGHT = 300,
    MARGINS = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50
    },
    xRange = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, arrayToDisplay.length]),
    yRange = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain(
      [d3.min(arrayToDisplay)
    //   function () {
    //   console.log('here');
    //   var min = d3.min(arrayToDisplay);
    //   console.log('min: ' + min);
    //   if(min <= 0) {
    //     return min;
    //   }
    //   else {
    //     return 0;
    //   }
    // }
    , d3.max(arrayToDisplay)]),
    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(3)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yRange)
      .tickSize(3)
      .orient('left')
      .tickSubdivide(true);

  vis.append('svg:g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
    .call(yAxis);

  var currentXPosition = 0;

  // creates lines
  var lineFunc = d3.svg.line()
    .x(function(d) {
      currentXPosition++;
      return xRange(currentXPosition);
    })
    .y(function(d) {
      return yRange(d);
    })
    .interpolate('linear');

  vis.append('svg:path')
    .attr('d', lineFunc(arrayToDisplay))
    .attr('stroke', 'blue')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
}

function updateMovesPerGameVis() {
  createLineGraph('#movesPerGame', turnsinGameTotal);
}

function updateRewardsVis() {
  createLineGraph('#rewardOverTime', totalAverageRewards);
}