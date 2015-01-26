var getDatasetKeyFromURL = function() {
    var pathArray = window.location.pathname.split('/');
    if (pathArray[1] == "dataset") {
        // On GBIF website, get datasetKey from URL.
        var datasetKey = pathArray[2];
    } else {
        // Elsewhere, e.g. demo pages, use demo datasetKey.
        var datasetKey = "42319b8f-9b9d-448d-969f-656792a69176"; // Coccinellidae
    }
    return datasetKey;
}

var loadMetricsData = function(datasetKey, showMetric, addToDOM) {
    // Get data from metrics store in CartoDB.
    var url = "http://datafable.cartodb.com/api/v2/sql?q=SELECT * FROM gbif_dataset_metrics WHERE dataset_key ='" + datasetKey + "'";
    $.getJSON(url,function(result) {
        if (result["rows"] == "") {
            console.log("No metrics for this dataset");
        } else {
            showMetric(result["rows"][0], addToDOM); // Only one row [0] expected
        }
    });
}

var showBasisOfRecordMetric = function(metrics, addToDOM) {
    var occurrences = metrics["occurrences"];
    var basisOfRecords = {
        labels: [
            "Preserved specimens",
            "Fossil specimens",
            "Living specimens",
            "Material samples",
            "Observations",
            "Human observations",
            "Machine observations",
            "Literature occurrences",
            "Unknown"
        ],
        metrics: [
            metrics["bor_preserved_specimen"],
            metrics["bor_fossil_specimen"],
            metrics["bor_living_specimen"],
            metrics["bor_material_sample"],
            metrics["bor_observation"],
            metrics["bor_human_observation"],
            metrics["bor_machine_observation"],
            metrics["bor_literature"],
            metrics["bor_unknown"]
        ]
    };

    // Create HTML
    var html = '<div class="progress">';
    for (var i = 0; i < basisOfRecords.metrics.length; i++) {
        var percentage = Math.round(basisOfRecords.metrics[i]/occurrences*100,1);
        html = html + '<div class="progress-bar basis-of-record-' + i + '" style="width: ' + percentage + '%" data-toggle="tooltip" data-placement="top" title="' + basisOfRecords.labels[i] + ' ' + percentage + '%"><span class="sr-only">' + basisOfRecords.labels[i] + '</span></div>';
    }
    var html = html + '</div>'

    // Add to DOM
    addToDOM(html);

    // Enable tooltip
    $('[data-toggle="tooltip"]').tooltip();
}