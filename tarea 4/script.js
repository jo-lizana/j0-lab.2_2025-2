// Los rachivos geojson fueron obtenidos del siguiente repositorio: https://github.com/caracena/chile-geojson/blame/master/regiones.json

import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

const width = 500, height = 500

const projection = d3.geoMercator()
    .fitSize([width, height], data);


const path = d3.geoPath(projection)

d3.select('.mapa')
    .attr('transform', 'translate(0, -10)')
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('d', path)
    .attr('fill', '#fff2ed')
    .attr("stroke", "#333")
    .attr("stroke-width", 1)

const etiqueta = d3.select('body').append('div')
    .classed('etiqueta', true)

d3.select('.mapa').selectAll('path')
    .on('mouseenter', (e, d) => {
        etiqueta.style('opacity', 1)
        etiqueta.style('top', e.pageY + 10 + 'px')
        etiqueta.style('left', e.pageX + 10 + 'px')
        etiqueta.html(`<p>${d.properties.Comuna}<p>`)
    })
    .on('mouseout', (e, d) => {
        etiqueta.style('opacity', 0)
    })

