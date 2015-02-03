<!--Line Graph-->

var h = 250;
var w = 500;

var padding = 40;

monthlySales = [
  {"month": 10, "sales": 100},
  {"month": 20, "sales": 130},
  {"month": 30, "sales": 250},
  {"month": 40, "sales": 300},
  {"month": 50, "sales": 265},
  {"month": 60, "sales": 225},
  {"month": 70, "sales": 180},
  {"month": 80, "sales": 120},
  {"month": 90, "sales": 145},
  {"month": 100, "sales": 130}
];

// https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear-scales
var xScale = d3.scale.linear()
              .domain([
                d3.min(monthlySales, function(d){ return d.month; }),
                d3.max(monthlySales, function(d){ return d.month; })
                ])
              .range([padding, w - padding]);

var yScale = d3.scale.linear()
              .domain([0, d3.max(monthlySales, function(d){ return d.sales })])
              .range([h - padding, 10]); // inversed because of svg coordinates being reversed.

// axis takes a scale
var yAxisGen = d3.svg.axis().scale(yScale).orient('left');
var xAxisGen = d3.svg.axis().scale(xScale).orient('bottom');

var lineFun = d3.svg.line()
              .x(function(d) { return xScale(d.month); })
              .y(function(d) { return yScale(d.sales); })
              .interpolate('linear');

var svg = d3.select("div#testing").append("svg").attr({
            width: w,
            height: h
          });

// g is svg group element
// call adds the axis
// transform moves the group
var yAxis = svg.append("g").call(yAxisGen)
              .attr({"transform": "translate(" + padding + ", 0)"});
var xAxis = svg.append("g").call(xAxisGen)
              .attr({"transform": "translate(0, " + (h - padding) + ")"});

              console.log(h - padding);

var viz = svg.append("path")
              .attr({
                d: lineFun(monthlySales),
                "stroke": "purple",
                "stroke-width": 2,
                "fill": "none"
              });

// add labels
var labels = svg.selectAll("text").data(monthlySales).enter()
              .append("text")
              .text(function(d) { return d.sales; })
                .attr({
                  x: function(d) { return xScale(d.month) - 25; },
                  y: function(d) { return yScale(d.sales); },
                  "font-family": "sans-serif",
                  "font-size": "12px",
                  "fill": "#666666",
                  "text-anchor": "start",
                  "dy": ".35em", // line size
                  "font-weight": function(d, i) {
                    if (i === 0 || i === monthlySales.length - 1) { // if is first element or last element in array
                      return "bold";
                    } else {
                      return "normal";
                    }
                  }
                });