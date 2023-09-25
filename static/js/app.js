const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

function optionChanged(id){
    function getData(person){
        return person.id == id;
    }
    d3.json(url).then(function(data) {
        let names = data['names'];
        let samples = data['samples'].filter(getData);
        let metadata = data['metadata'].filter(getData);
        //let samples10 = samples.slice(0,10);
        for(let i = 0; i < names.length; i++){
            d3.select('select').append('option').text(names[i]);
        }
        let otus = samples[0].otu_ids.slice(0,10);
        let otuString = otus.map(otu => `OTU ${otu}`);

        let trace1 = {
            x: samples[0].sample_values.slice(0,10),
            y: otuString,
            text: samples[0].otu_labels.slice(0,10),
            type: 'bar',
            orientation: 'h'
        };

        let trace2 = {
            x: samples[0].otu_ids,
            y: samples[0].sample_values,
            type: 'scatter',
            mode: 'markers',
            marker: { 
                size: samples[0].sample_values,
                color: samples[0].otu_ids,
            },
            text: samples[0].otu_labels
        };
        let scatterPlot = [trace2];
        Plotly.newPlot('bubble',scatterPlot);

        let barPlot = [trace1];
        Plotly.newPlot("bar", barPlot);

        d3.select('#sample-metadata').selectAll('div').remove();
        d3.select('#sample-metadata').append('div').text(`id: ${metadata[0].id}`);
        d3.select('#sample-metadata').append('div').text(`ethnicity: ${metadata[0].ethnicity}`);
        d3.select('#sample-metadata').append('div').text(`gender: ${metadata[0].gender}`);
        d3.select('#sample-metadata').append('div').text(`age: ${metadata[0].age}`);
        d3.select('#sample-metadata').append('div').text(`location: ${metadata[0].location}`);
        d3.select('#sample-metadata').append('div').text(`bbtype: ${metadata[0].bbtype}`);
        d3.select('#sample-metadata').append('div').text(`wfreq: ${metadata[0].wfreq}`);
        
    });
}

optionChanged('940')
