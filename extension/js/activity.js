var main = function() {
    var datasetKey = getDatasetKeyFromURL();
    downloadChart(datasetKey,30);
};

var removeTimeFromDate = function(date) {
    return date.setUTCHours(0,0,0,0); // Floor date to midnight and return as time integer
};

var formatAsISODate = function(time) {
    var date = new Date(time);
    return date.toISOString().substring(0,10); // Return first 10 characters (yyyy-mm-dd) of full ISO date
};

var downloadChart = function(datasetKey, dayRange) {
    var oneDayInMs = 24 * 60 * 60 * 1000;
    var today = new Date();
    var startDay = removeTimeFromDate(today); // Set at midnight
        startDay = startDay - ((dayRange - 1) * oneDayInMs); // Substract dayRange in milliseconds
    var days = [];
    var downloads = [];
    for (var i = 0; i < dayRange; i++) {
        days[i] = formatAsISODate(startDay + i * oneDayInMs); // Populate array with all dates in ISO8601
        downloads[i] = null; // Populate array with null values (for empty chart)
    }

    // Update title
    var anchor = d3.select("#content .results .content");
    var currentTitle = anchor.select("h2");
    currentTitle.text(currentTitle.text() + " in total");

    // Add title and div for chart to DOM
    anchor.insert("div", ":first-child")
        .attr("class","fullwidth")
        .attr("id","downloadChart");
    anchor.insert("div", ":first-child")
        .attr("class", "header")
        .append("div")
            .attr("class", "left")
            .append("h2")
                .text("Download activity over the last 30 days");

    var downloadChart = c3.generate({
        bindto: "#downloadChart",
        data: {
            x: "days",
            columns: [
                ["days"].concat(days),
                ["downloads"].concat(downloads)
            ],
            type: "bar"
        },
        axis: {
            x: {
                type: "timeseries",
                tick: {
                    format: "%d/%m"
                }
            },
            y: {
                tick: {
                    outer: false
                }
            }
        },
        padding: {
            left: 30 // To make room for y-axis labels on data loading
        },
        bar: {
            width: {
                ratio: 0.9
            }
        },
        legend: {
            show: false
        }
    });

    loadDownloadData(datasetKey,1200,startDay,oneDayInMs,downloads,downloadChart);
};

var loadDownloadData = function(datasetKey, pageLimit, startDay, oneDayInMs, downloads, downloadChart) {
    /*  Note: this function does only one call to the GBIF API, so if dayRange 
        is high and pageLimit low, it might not retrieve all downloads. */
    
    var url = "http://api.gbif.org/v1/occurrence/download/dataset/" + datasetKey + "?limit=" + pageLimit;
    d3.json(url,function(error, result) {
        if (error) return console.warn(error);

        result.results.every(function(result) {
            var downloadDay = removeTimeFromDate(new Date(result.download.created));
            // console.log(downloadDay);
            
            if (downloadDay >= startDay) {
                if (result.download.status == "SUCCEEDED") {
                    var i = (downloadDay - startDay) / oneDayInMs; // Day index
                    downloads[i] += 1;
                }
                return true; // Continue looping
            } else {
                return false; // Passed beyond startDay, stop looping. Assumes API returns downloads in reversed chronology.
            }
        });

        downloadChart.load({
            columns: [
                ["downloads"].concat(downloads)
            ]
        });
    });
};

main();
