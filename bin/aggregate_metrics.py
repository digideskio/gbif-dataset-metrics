import sys
import csv
import os
SRC_DIR = os.path.dirname(os.path.dirname(os.path.realpath(__file__))) + '/src'
sys.path.append(SRC_DIR)
from aggregator import ReportAggregator

def check_arguments():
    if len(sys.argv) != 2:
        print 'usage: aggregate_metrics.py <data directory>\n'
        print '    data directory:  this should point to a directory'
        print '                     containing chunks of metric data.'
        print '                     metric data should be in json and'
        print '                     ordered by dataset key.'
        sys.exit(-1)
    data_dir = sys.argv[1]
    return data_dir

def aggregate_metrics(data_dir):
    agg = ReportAggregator()
    data = agg.aggregate(data_dir)
    return data

def write_data(data):
    writer = csv.writer(sys.stdout, delimiter=',')
    basis_of_records_metrics = ['PRESERVED_SPECIMEN', 'FOSSIL_SPECIMEN', 'LIVING_SPECIMEN', 'OBSERVATION', 'HUMAN_OBSERVATION', 'MACHINE_OBSERVATION', 'MATERIAL_SAMPLE', 'LITERATURE', 'UNKNOWN']
    header = ['dataset_key', 'bor_preserved_specimen', 'fossil_specimen', 'bor_living_specimen', 'bor_observation', 'bor_human_observation', 'bor_machine_observation', 'bor_material_sample', 'bor_literature', 'bor_unknown']
    writer.writerow(header)
    for dataset in data:
        row = [dataset]
        basis_of_records = data[dataset]['basisofRecords']
        for metric_name in basis_of_records_metrics:
            if metric_name in basis_of_records:
                row.append(basis_of_records[metric_name])
            else:
                row.append(0)
        writer.writerow(row)

def main():
    data_dir = check_arguments()
    data = aggregate_metrics(data_dir)
    write_data(data)

main()
