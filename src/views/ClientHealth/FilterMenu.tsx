import { Box, Drawer, Grid, Typography } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Range, RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { MulitSelectDialogComponent } from "src/coreUI/components/Inputs/SelectDialog/MuliSelectFilterDialog";
import ControlledSelect from "src/coreUI/compositions/Select/ControlledSelect";
import {
  selectAllCategories,
  selectCategoriesDialogOptions,
  selectCategoriesOptions,
} from "src/models/Categories";
import { useAppSelector } from "src/models/hooks";
import categories from "src/services/endpoints/categories";
import { DialogOption } from "src/types/components/SelectDialog";

type formType = {
  date: {
    startDate?: Date;
    endDate?: Date;
  };
  categories: DialogOption[];
  selectedAllCategories: boolean;
  subCategories: DialogOption[];
  selectedAllSubCategories: boolean;
};
type filterBarProps = {
  filterPopup: boolean;
  closeFilterPopup: any;
  onSetFilter: any;
  start: string | null;
  end: string | null;
};

const FiltersBar = ({
  filterPopup,
  closeFilterPopup,
  onSetFilter,
  start,
  end,
}: filterBarProps) => {
  const categoriesOptions = useAppSelector(selectCategoriesDialogOptions);
  const categories = useAppSelector(selectAllCategories);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState<
    DialogOption[]
  >([]);

  const { control, watch, setValue } = useForm<formType>({
    defaultValues: {
      date: {
        startDate: start ? new Date(start) : undefined,
        endDate: end ? new Date(end) : undefined,
      },
      categories: categoriesOptions,
      selectedAllCategories: true,
      subCategories: [],
      selectedAllSubCategories: true,
    },
  });
  useEffect(() => {
    setValue("categories", categoriesOptions);
    let subs = _.flattenDeep(
      categories.map((item) =>
        item.subCategoriesId
          ? item?.subCategoriesId?.map((sub) => {
              return { id: sub._id, label: sub.subCategory };
            })
          : []
      )
    );
    setSubCategoriesOptions(subs);
    setValue("subCategories", subs);
    onSetFilter("categories", categoriesOptions);
    onSetFilter("subCategories", subs);
  }, [categoriesOptions]);

  // filter the subcategories options
  useEffect(() => {
    let catsIds = watch().categories.map((i) => i.id);
    let selectedCategories = categories.filter((i) => catsIds.includes(i._id));
    let subCategories = _.flattenDeep(
      selectedCategories.map((i) => i.subCategoriesId)
    );
    let subCategoriesOptions = subCategories.map((i) => {
      return { id: i._id, label: i.subCategory };
    });
    setSubCategoriesOptions(subCategoriesOptions);
    setValue("subCategories", subCategoriesOptions);
    if (subCategoriesOptions.length === 0)
      setValue("selectedAllSubCategories", false);
  }, [watch().categories]);

  const onSelectAllSubCategories = (selected: boolean) => {
    setValue("selectedAllSubCategories", selected);
    let selectedCategories = watch().categories;
    if (selected === true) {
      let subCategories = _.flattenDeep(
        selectedCategories.map(
          (i) =>
            categories.find((sub) => sub._id === i.id)?.subCategoriesId ?? []
        )
      );
      let subOptions = subCategories.map((item) => {
        return {
          id: item._id,
          label: item.subCategory,
          value: item._id,
        };
      });
      setValue("subCategories", subOptions);
      onSetFilter("subCategories", subOptions);
    } else {
      setValue("subCategories", []);
      onSetFilter("subCategories", []);
    }
  };
  const onSelectAllCategories = (selected: boolean) => {
    setValue("selectedAllCategories", selected);
    setValue("categories", selected ? categoriesOptions : []);
    onSetFilter("categories", selected ? categoriesOptions : []);
  };

  const onDisSelectCategory = (item: DialogOption) => {
    if (item.id !== "all") {
      let catOptions = watch().categories.filter(
        (option) => option.id !== item.id
      );
      setValue("categories", catOptions);
      onSetFilter("categories", catOptions);
      if (catOptions.length === 0) setValue("selectedAllCategories", false);
    }
  };
  const onSelectCategory = (item: DialogOption) => {
    if (item.id !== "all") {
      setValue("categories", [...watch().categories, item]);
      onSetFilter("categories", [...watch().categories, item]);
    }
  };
  const onDisSelectSubCategory = (item: DialogOption) => {
    if (item.id !== "all") {
      setValue(
        "subCategories",
        watch().subCategories.filter((option) => option.id !== item.id)
      );
      onSetFilter(
        "subCategories",
        watch().subCategories.filter((option) => option.id !== item.id)
      );
    }
  };

  const onSelectSubCategory = (item: DialogOption) => {
    if (item.id !== "all") {
      setValue("subCategories", [...watch().subCategories, item]);
      onSetFilter("subCategories", [...watch().subCategories, item]);
    }
  };
  return (
    <Drawer
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          background: "#FAFAFB",
          width: "400px",
          transition: "all 0.5s ease !important",
        },
      }}
      open={filterPopup}
      variant="temporary"
      onClose={closeFilterPopup}
    >
      <Grid
        container
        justifyContent={"space-between"}
        p={2}
        alignItems="center"
      >
        <Grid item xs={12} justifyContent={"space-between"} container>
          <Typography mt={1} variant="h4">
            Filter By Projects
          </Typography>
        </Grid>
        <Grid paddingX={0.5} item sm={12} marginY={1}>
          <Box className="tasks-option">
            <ControlledSelect
              name="date"
              selected={
                `${start ? new Date(start).toDateString() : ""}` +
                `${end ? " : " : " "}` +
                `${end ? new Date(end).toDateString() : ""}`
              }
              label="TimeFrame :"
              elementType="filter"
              optionsType="date-picker"
              control={control}
              options={[]}
              onSelect={(value: Range) => {
                setValue("date", {
                  startDate: value.startDate,
                  endDate: value.endDate,
                });
                onSetFilter("startDate", value.startDate);
                onSetFilter("endDate", value.endDate);
              }}
            />
          </Box>
          <Box className="tasks-option">
            <MulitSelectDialogComponent
              name="categories"
              selected={watch().categories}
              options={categoriesOptions}
              label="Categories :-"
              allOption={true}
              onSelectAll={(selected: boolean) =>
                onSelectAllCategories(selected)
              }
              onDiselect={(item) => onDisSelectCategory(item)}
              onSelect={(item) => onSelectCategory(item)}
            />
          </Box>
          <Box className="tasks-option" mt={0.5}>
            <MulitSelectDialogComponent
              name="subCategories"
              selected={watch().subCategories}
              options={subCategoriesOptions}
              label="Sub Categories :-"
              allOption={true}
              onSelectAll={(selected: boolean) =>
                onSelectAllSubCategories(selected)
              }
              onDiselect={(item) => onDisSelectSubCategory(item)}
              onSelect={(item) => onSelectSubCategory(item)}
            />
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default FiltersBar;
