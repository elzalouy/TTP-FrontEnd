import * as React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import IMAGES from "../../../../assets/img/Images";
import { formatFileName } from "../../../../helpers/equations";
import { TaskFile } from "../../../../types/models/Projects";
import { taskFilesStyles } from "../styles";

interface TaskFilesProps {
  taskFiles?: TaskFile[];
  cardId: string;
}

const TaskFiles: React.FC<TaskFilesProps> = ({ taskFiles, cardId }) => {
  const styles = taskFilesStyles()();
  const onDownload = (file: TaskFile) => {
    window.open(file.url);
  };

  return (
    <Box className={styles.container}>
      {taskFiles && taskFiles.length > 0 && (
        <>
          <img src={IMAGES.attachment} alt="more" />
          <Typography style={{ paddingLeft: "5px", color: "#92929D" }}>
            {taskFiles?.length}
          </Typography>
        </>
      )}
      <Box className={styles.scrollContent}>
        {taskFiles &&
          taskFiles.length > 0 &&
          taskFiles.map((item) => {
            let name = formatFileName(item.name);
            return (
              <>
                <Typography
                  onClick={() => onDownload(item)}
                  className={styles.file}
                >
                  {name}
                </Typography>
              </>
            );
          })}
      </Box>
    </Box>
  );
};

export default TaskFiles;
