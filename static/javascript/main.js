$(function() {
   $('#flash').delay(100).fadeIn('normal', function() {
      $(this).delay(2500).fadeOut();
   });
});

function showhide() {
    var divParam = document.getElementById("vulnParamschart");
    var divCmd = document.getElementById("divCmd");
    var elem = document.getElementById("paramBtn");

    if (divParam.style.display == "block") {
        divParam.style.display = "none";
    }
    else {
        divParam.style.display = "block";
    }

    if (elem.value == "Hide Parameters") {
        elem.value = "Show Parameters";
    }
    else {
        elem.value = "Hide Parameters";
    }
}

function createFilesystem(id, dict) {
    console.log(dict);
    var file_margins = {top: 30, right: 50, bottom: 30,left:50},
        file_width = $(id).parent().width() - file_margins.right -file_margins.left;
    var file_root = {}, path, node, next, i, j, N, M;

    for (i = 0, N = dict.length; i < N; i++) {
        path = dict[i];
        node = file_root;

        for (j = 0, M = path.length; j < M; j++) {
            if (node.children) {
            } else {
                node.children = {};
            }

            next = node.children[path[j]];

            if (!next) {
                next = node.children[path[j]] = {label: path[j]};
            }
            node = next;
        }

    }

    file_root = d3.values(file_root.children)[0];

    function childrenToArray(n) {
        if (!n.children) {
        } else {
            n.children = d3.values(n.children);
            n.children.forEach(childrenToArray)
        }
    }

    childrenToArray(file_root);
    var file_height = 400;

    var file_tree = d3.layout.tree().size([file_height, file_width]);

    var file_diag = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

    var file_svg = d3.select(id).append("svg")
        .attr("width", file_width + file_margins.left + file_margins.right + 200)
        .attr("height", file_height)
        .append("svg:g")
        .attr("transform", "translate(100, 0)");

    var file_nodes = file_tree.nodes(file_root).reverse(),
        file_links = file_tree.links(file_nodes);

    var file_link = file_svg.selectAll(".link")
        .data(file_links)
        .enter().append("svg:path")
        .attr("class", "link")
        .attr("d", file_diag);

    var file_node = file_svg.selectAll("g.node")
        .data(file_nodes, function(d) { return d.id || (d.id = ++i); })
        .enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    file_node.append("svg:circle")
        .attr("r", 3.5);

    file_node.append("svg:text")
        .attr("dx", function (d) {
            return d.children || d.children ?  -8 : 8;
        })
        .attr("dy", 11)
        .style("text-anchor", function (d) {
            return d.children ? "end" : "start";
        })
        .style("fill-opacity", 1)
        .text(function (d) {
            return d.label;
        });


}
