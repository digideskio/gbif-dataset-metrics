# GBIF dataset metrics

## Rationale

The [Global Biodiversity Information Facility (GBIF)](http://www.gbif.org) facilitates access to over 13,233 species occurrence datasets, collectively holding more than 570 million records. GBIF **dataset pages** are important access points to GBIF-mediated data (e.g. via DOIs) and currently show dataset metadata, a map of georeferenced occurrences, some basic statistics, and a paged table of download events. If a user wants to know more about the occurrences a dataset contains, he/she has to filter/page through a table of occurrences or download the data. Neither are convenient ways to get quick insights or assess the fitness for use.

## Result

For the [2015 GBIF Ebbe Nielsen challenge](http://gbif.devpost.com/), we developed a proof of concept for **enhancing GBIF dataset pages with aggregated occurrence metrics**. These metrics are visualized as stacked bar charts - showing the occurrence distribution for basis of record, coordinates, multimedia, and taxa matched with the GBIF backbone - as well as an interactive taxonomy partition and a recent downloads chart. Metrics that score particularly well are highlighted as achievements. Collectively these features not only inform the user what a dataset contains and if it is fit for use, but also help data publishers discover what aspects could be improved.

![Screenshot](images/screenshots/screenshot.png)

The proof of concept consists of two parts: 1) an extraction and aggregation module to process GBIF occurrence downloads and calculate, aggregate, and store the metrics for each dataset and 2) a [Google Chrome extension](https://chrome.google.com/webstore/detail/gbif-dataset-metrics/kcianglkepodpjdiebgidhdghoaeefba), allowing you to view these metrics in context on the GBIF website.

For the [2015 GBIF Ebbe Nielsen Challenge - Round 2](http://gbif2.devpost.com/), we added a sample of the images referenced in (the occurrences of) a dataset. Together with the multimedia bar and achievement, it highlights the currently undervalued multimedia richness of some datasets. We also improved our extraction and aggregation module to process all GBIF occurrences on the [Amazon EC2 infrastructure](https://aws.amazon.com/ec2/) and are now able to provide metrics for all GBIF occurrence datasets. We strongly believe however, that the functionality of our proof of concept - if considered useful - should be implemented on the GBIF infrastructure. For our motivation on this, including its challenges and opportunities, see our [feedback to the jury comments](documentation/feedback-to-comments.md).

## Installation

[Install the Google Chrome Extension](https://chrome.google.com/webstore/detail/gbif-dataset-metrics/kcianglkepodpjdiebgidhdghoaeefba) and visit a [GBIF dataset page](http://www.gbif.org/dataset/85930e96-f762-11e1-a439-00145eb45e9a).

* Don't want to install the extension, but just see a preview? [See this demo page](http://datafable.com/gbif-dataset-metrics/).
* Want to calculate the metrics yourself (i.e. run the backend)? Read the documentation on the [extraction](extraction_module/README.md) and [aggregation module](aggregation_module/README.md).

## How it works

* [Basis of record bar](documentation/basis-of-record-bar.md)
* [Coordinates bar](documentation/coordinates-bar.md)
* [Multimedia bar](documentation/multimedia-bar.md)
* [Taxon match bar](documentation/taxon-match-bar.md)
* [Achievements](documentation/achievements.md)
* [Taxonomy partition](documentation/taxonomy-partition.md)
* [Download chart](documentation/download-chart.md)
* [Sample of images](documentation/sample-of-images.md)

----

* [Extraction module](extraction_module/README.md)
* [Aggregation module](aggregation_module/README.md)

## Limitations

* The metrics are processed using a download of all occurrences on September 1, 2015. It contains 13,221 occurrences datasets, covering 570,238,726 occurrences. If a dataset is published or republished since then, it respectively won't have metrics or those might be out of date. If so, a message will be shown on the dataset page. If you want us to reprocess a specific dataset, [submit an issue](https://github.com/datafable/gbif-dataset-metrics/issues/new).

Follow [@Datafable](https://twitter.com/datafable) to be notified of new metrics or improvements.

## Contributors

Developed by [Datafable](http://datafable.com):

* [Peter Desmet](https://twitter.com/peterdesmet) (frontend)
* [Bart Aelterman](https://twitter.com/bartaelterman) (aggregation)
* [Nicolas Noé](https://twitter.com/niconoe) (extraction)

## License

[LICENSE](LICENSE)
