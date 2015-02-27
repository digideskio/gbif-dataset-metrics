ALTER TABLE gbif_dataset_metrics
ADD COLUMN archive_generated_at date,
ADD COLUMN occurrences integer,
ADD COLUMN bor_preserved_specimen integer,
ADD COLUMN bor_fossil_specimen integer,
ADD COLUMN bor_living_specimen integer,
ADD COLUMN bor_material_sample integer,
ADD COLUMN bor_observation integer,
ADD COLUMN bor_human_observation integer,
ADD COLUMN bor_machine_observation integer,
ADD COLUMN bor_literature integer,
ADD COLUMN bor_unknown integer,
ADD COLUMN coordinates_not_provided integer,
ADD COLUMN coordinates_major_issues integer,
ADD COLUMN coordinates_minor_issues integer,
ADD COLUMN coordinates_valid integer,
ADD COLUMN taxon_not_provided integer,
ADD COLUMN taxon_match_none integer,
ADD COLUMN taxon_match_higherrank integer,
ADD COLUMN taxon_match_fuzzy integer,
ADD COLUMN taxon_match_complete integer,
ADD COLUMN multimedia_not_provided integer,
ADD COLUMN multimedia_url_invalid integer,
ADD COLUMN multimedia_valid integer,
ADD COLUMN taxonomy text
ADD COLUMN images_sample text;
