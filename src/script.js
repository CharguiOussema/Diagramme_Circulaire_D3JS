var width = 1000,
  height = 500;
/*
*question 3
*/
var couleur = d3.scaleOrdinal(d3.schemeCategory10); 
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background", "pink");
var data = [
  { Type_de_mission: "BI/décisionnel", Nombre_etudiants: 8 },
  { Type_de_mission: "CRM", Nombre_etudiants: 1 },
  { Type_de_mission: "Data Minig/Data Science", Nombre_etudiants: 15 },
  { Type_de_mission: "Statistiques - Etudes", Nombre_etudiants: 2 }
];
var base_diagramme = d3.pie().value(function (d) {
  return d.Nombre_etudiants;
})(data);

var segments = d3
  .arc()
  .innerRadius(0)
  .outerRadius(200)
  .padAngle(0.05)
  .padRadius(50);

var sections = svg
  .append("g")
  .attr("transform", "translate(250,250)")
  .selectAll("path")
  .data(base_diagramme);
sections.enter().append("path").attr("d", segments)
 .attr("fill", function (d) {
    return couleur(d.data.Nombre_etudiants);
  });
/*
*question 4 
*/
var libelle = d3.select("g")
.selectAll("text")
.data(base_diagramme);
libelle.enter()
  .append("text")
  .classed("inside", true)
  .each(function(d){
var center = segments.centroid(d);
 // console.log(center)
  d3.select(this)
  .attr("x", center[0])
  .attr("y", center[1])
  .text(d.data.Nombre_etudiants);});
/*
*question 5
*/
var legends=svg.append("g")
.attr("transform","translate(500,200)")
.selectAll(".legends")
.data(base_diagramme);
var legend = legends.enter()
.append("g")
.classed("label", true)
.attr("transform", function(d,i){
  return "translate(0," + (i+1)*50 + ")";
});
legend.append("rect")
  .attr("width", 20)
  .attr("height", 20)
  .attr("fill", function(d){
  return couleur(d.data.Nombre_etudiants);
});
legend.append("text")
  .classed("label", true)
.style("fill", "black")
  .text(function(d){
  return d.data.Type_de_mission;
})
.attr("fill", function(d){
  return couleur(d.data.Nombre_etudiants);
})
.attr("x", 30)
.attr("y", 15);
svg.append("text")
.attr("x", 400)
.attr("y", 25)
.attr("text-anchor", "middle")
.style("font-size", "30px")
.style("fill", "red")
.style("text-decoration", "underline")
.text("chargui oussema");