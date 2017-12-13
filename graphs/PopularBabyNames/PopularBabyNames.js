console.log("Popularnames here!");
const d3 = require('d3');

const config = {
  margin: {
    left: 10,
    right: 10,
    bottom: 10,
    top: 10
  },
  baseElement: "#graph-area"
};

config.height = 600 - config.margin.top - config.margin.bottom;
config.width = 600 - config.margin.left - config.margin.right;

const treemap = d3.treemap()
  .tile(d3.treemapResquarify)
  .size([config.width, config.height])
  .round(true)
  .paddingInner(1);

const colors = d3.scaleOrdinal(d3.schemeCategory10);

const nest = d3.nest() 
  .key(function(d) { return +d.count})
  .key(function(d) { return d.name })
  .rollup(function (leaves) {
    return {
      "total_count": d3.sum(leaves, function(d) { return +d.count }),
      "total_cpt": leaves.length,
      "rank" : d3.sum(leaves, function(d) {
        return +d.rank
      })
    }
  })

  const svg = d3.select(config.baseElement)
    .append("svg")
    .attr("width", config.width)
    .attr("height", config.height);

  const g = svg.append('g')
    .attr("transform", `translate(${config.margin.left}, ${config.margin.top})`);

d3.csv('../../graphs/PopularBabyNames/PopularBoyNames.csv', (err, info) => {
  if (err) {
    console.log(err)
  } else {
    console.log(info);
  }

  info.forEach((v, i) => {
    v["rank"] = i + 1;
  });

  const root = d3.hierarchy({
    values: nest.entries(info)
  }, function(d) { return d.values })
  .sum(function(d) {
    if ( d.value && d.value.total_count) {
      return +d.value.total_count
    }
  })
  .sort(function(a, b) {
    return +b.value.total_count - +a.value.total_count
  });


  treemap(root);

  const cell = g.selectAll('g')
    .data(root.leaves())
    .enter()
      .append("g")
        .attr("transform", function(d) {
          return `translate(${d.x0}, ${d.y0})`
        });
      
        cell.append("rect")
          .attr("id", function(d) { 
            return d.name

          })
          .attr("width", function(d) { return d.x1 - d.x0})
          .attr("height", function(d) { return d.y1 - d.y0})
          .attr("fill", function (d) { 
            return colors(d.parent.data.key)
          })

        cell.append("clipPath")
          .append("use")
          .attr("xlink:href", function(d) { return `#${d.data.key}`});

        cell.append("text")
          .attr("clip-path", function (d) { return `url(#clip-${d.data.key})`})
            .text(function(d) {
              // console.log("93", d);
              return d.data.key
            })
            .style("font-size", function (d) { 
              // console.log(d);
              let a = d3.select(this).node().getBoundingClientRect();
              return 1.1 - ( a.width / 100 ) + "rem";
            })
            .attr("x", 4)
            .attr("y", 10)
            .attr("dy", ".35em");

        cell.append("text")
            .text(function(d) {
              console.log(d);
              return d.data.value.rank;
            })
            .attr("x", function(d) {
              console.log(d);
              let diff = d.x1 - d.x0;
              return diff / 2;
            })
            .attr("y", function(d) {
              let diff = d.y1 - d.y0;
              return diff / 2;
            })
            .style("font-size", "0.75rem")


})