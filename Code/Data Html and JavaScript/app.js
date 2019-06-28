// Load data from hours-of-tv-watched.csv
d3.csv("data.csv", function(error, newsData) {
  if (error) return console.warn(error);

  console.log(newsData);

  newsData.forEach(function(d) {
    d.healthcare = +d.healthcare;
    d.poverty = +d.poverty;
   console.log(d);
  });

  // svg container
var svgHeight = 800;
var svgWidth = 1000;

// margins
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 100
};

// chart area minus margins
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;

// create svg container
var svg = d3.select("#scatter").append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // shift everything over by the margins
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

var pov = newsData.map(d => d.poverty)

var health = newsData.map(d => d.healthcare)

// scale y to chart height
var yScale = d3.scaleLinear()
  .domain([4, d3.max(health) + 2])
  .range([chartHeight, 0]);

  var xScale = d3.scaleLinear()
  .domain([d3.min(pov) - 1, d3.max(pov) + 2])
  .range([0, chartWidth]);


  // create axes
var yAxis = d3.axisLeft(yScale).tickValues([6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26]);
// var xAxis = d3.axisBottom(xScale);

var xAxis = d3.axisBottom(xScale)
    .tickValues([10, 12, 14, 16, 18, 20, 22])

// set x to the bottom of the chart
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);



// set y to the y axis
// This syntax allows us to call the axis function
// and pass in the selector without breaking the chaining
chartGroup.append("g")
  .call(yAxis);


// var xMap = function(d) { return xScale(d.poverty);}
// var yMap = function(d) { return yScale(d.health);}

var selection = chartGroup.selectAll("circle").data(newsData)

selection.enter().append("circle")
  .attr("opacity", 0.9)
  .attr("fill", "blue")
  .attr("stroke", "black")
  .attr("r", 10)
  .attr("cx", (d) => xScale(d.poverty))
  .attr("cy", (d) => yScale(d.healthcare));

selection.enter().append("text")
.attr("x", (d) => xScale(d.poverty))
.attr("y", (d) => yScale(d.healthcare) + 5)
.attr("text-anchor", "middle")
.attr("font-size", "14px")
.attr("fill", "white")
.style("font-weight", "bold")
.text((d) => `${d.abbr}`)

// chartGroup.selectAll("text").data(newsData)
// .enter().append("text")
// .attr("text-anchor", "middle")
// .attr("x", (d) => xScale(d.poverty))
// .attr("y", (d) => yScale(d.healthcare))
// .text("NJ")

chartGroup.append("text")
// Position the text
// Center the text:
.attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top - 10})`)
.attr("text-anchor", "middle")
// .attr("dy", "1em")
.attr("font-size", "20px")
.attr("fill", "green")
.style("font-weight", "bold")
.text("In Poverty (%)");


chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("text-anchor", "middle")
.attr("y", 50 - margin.left)
.attr("x",0 - (chartHeight / 2))
.attr("font-size", "20px")
.style("font-weight", "bold")
.text("Lack of Healthcare (%)");

});
