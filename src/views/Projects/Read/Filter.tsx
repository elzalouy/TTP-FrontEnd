import { Box, Grid, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Controller } from "react-hook-form";
import IMAGES from "src/assets/img/Images";
import SearchBox from "src/coreUI/components/Inputs/Search/SearchBox";
import Filter from "src/coreUI/components/Inputs/SelectFields/Select";
import { filterOptions } from "src/helpers/generalUtils";
import { selectClientOptions } from "src/models/Clients";
import { selectPMOptions } from "src/models/Managers";
import { useAppSelector } from "src/models/hooks";

interface ProjectsFilterProps {
  control: any;
  onSetFilter: () => void;
  onChange: (
    e: any,
    name: "name" | "clientId" | "projectManager" | "projectStatus" | "deadline"
  ) => void;
  setValue: any;
}

const ProjectsFilter: FC<ProjectsFilterProps> = ({
  control,
  onSetFilter,
  onChange,
  setValue,
}) => {
  const pmOptions = useAppSelector(selectPMOptions);
  const clientOptions = useAppSelector(selectClientOptions);
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Grid container xs={12} direction={"row"}>
        <Grid item xs={3} sm={3} md={3} lg={12} mb={4}>
          <Typography variant="h2" fontFamily={"Cairo"}>
            Projects
          </Typography>
        </Grid>
        <Grid
          container
          xs={9}
          sm={9}
          md={9}
          lg={12}
          justifyContent="flex-end"
          alignItems={"center"}
          alignContent="center"
          display={{ sm: "block", md: "block", lg: "none", xl: "none" }}
        >
          <Grid item xs={2} sm={2} md={0} lg={0} margin={1} marginLeft={0}>
            <Box
              textAlign={"center"}
              sx={{
                cursor: "pointer",
                bgcolor: !visible ? "black" : "right",
                borderRadius: 3,
                paddingTop: 1.2,
                float: "right",
              }}
              width={38}
              height={38}
              onClick={() => setVisible(!visible)}
            >
              <img
                src={!visible ? IMAGES.filtericonwhite : IMAGES.filtericon}
                alt="FILTER"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            sm={8}
            md={8}
            lg={8}
            alignItems="center"
            justifyContent={{
              xs: "",
              sm: "flex-end",
              md: "flex-end",
              lg: "flex-end",
            }}
            display={{ md: "none", lg: "none", sm: "flex", xs: "flex" }}
          >
            <Controller
              name="name"
              control={control}
              render={(props) => (
                <SearchBox
                  value={props.field.value}
                  placeholder="Search"
                  onChange={(e: any) => {
                    props.field.onChange(e);
                    onSetFilter();
                  }}
                  size={"custom"}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid
          sx={{ gridRow: { sm: "initial", md: "initial", lg: "unset" } }}
          data-test-id="filter-projects"
          marginX={0.5}
          item
          xs={5}
          sm={4.5}
          md={4.5}
          lg={2.2}
        >
          <Controller
            name="projectManager"
            control={control}
            render={(props) => (
              <Filter
                elementType="filter"
                name={"projects-" + props.field.name}
                selected={props.field.value}
                label="Project Manager: "
                optionsType="dialog"
                options={[{ id: "", value: "", text: "All" }, ...pmOptions]}
                onSelect={(e: any) => {
                  setValue("projectManager", e.id);
                  onSetFilter();
                }}
                textTruncate={6}
              />
            )}
          />
        </Grid>
        <Grid
          data-test-id="filter-projects"
          marginX={0.5}
          item
          xs={5}
          sm={4}
          md={4}
          lg={2}
        >
          <Controller
            name="clientId"
            control={control}
            render={(props) => (
              <Filter
                elementType="filter"
                name={"projects-" + props.field.name}
                selected={props.field.value}
                label="Client: "
                optionsType="dialog"
                options={[
                  { id: "", value: "", text: "All", image: "avatar" },
                  ...clientOptions,
                ]}
                onSelect={(e: any) => {
                  setValue("clientId", e.id);
                  onSetFilter();
                }}
                textTruncate={10}
              />
            )}
          />
        </Grid>
        <Grid
          data-test-id="filter-projects"
          marginX={0.5}
          item
          xs={5}
          sm={4}
          md={4}
          lg={2}
        >
          <Controller
            name="projectStatus"
            control={control}
            render={(props) => (
              <>
                <Filter
                  elementType="filter"
                  name={"projects-" + props.field.name}
                  selected={props.field.value}
                  label="Status: "
                  options={filterOptions[1]}
                  onSelect={(e: any) => onChange(e, "projectStatus")}
                  optionsType="list"
                  textTruncate={5}
                />
              </>
            )}
          />
        </Grid>
        <Grid
          data-test-id="filter-projects"
          item
          marginX={0.5}
          display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
          md={3}
          lg={3}
        >
          <Controller
            name="name"
            control={control}
            render={(props) => (
              <SearchBox
                value={props.field.value}
                placeholder="Search"
                onChange={(e: any) => {
                  props.field.onChange(e);
                  onSetFilter();
                }}
                size={"custom"}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectsFilter;
