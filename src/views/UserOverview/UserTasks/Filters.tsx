import { Grid } from "@mui/material";
import React, { FC } from "react";
import Select from "src/coreUI/components/Inputs/SelectFields/Select";
import { selectCategoriesOptions } from "src/models/Categories";
import { selectProjectOptions } from "src/models/Projects";
import { useAppSelector } from "src/models/hooks";
import { FiltersProps } from "src/types/views/Overview";

const Filters: FC<FiltersProps> = ({ filters, setFilters }) => {
  const categories = useAppSelector(selectCategoriesOptions);
  const projects = useAppSelector(selectProjectOptions);
  return (
    <>
      <Grid pb={1} container direction={"row"}>
        <Grid item xs={6} pr={1}>
          <Select
            elementType="filter"
            optionsType="dialog"
            options={[{ id: "", value: "", text: "All" }, ...categories]}
            onSelect={(e: any) => setFilters({ ...filters, categoryId: e.id })}
            name="categoryId"
            label="Category: "
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            elementType="filter"
            optionsType="dialog"
            options={[{ id: "", value: "", text: "All" }, ...projects]}
            onSelect={(e: any) => setFilters({ ...filters, projectId: e.id })}
            name="projectId"
            label="Project: "
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Filters;
