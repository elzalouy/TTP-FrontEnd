import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useDispatch } from "react-redux";
import IMAGES from "../../../../assets/img/Images";
import { downloadAttachment } from "../../../../redux/Projects";

interface TaskFilesProps {
  taskFiles?: any[];
  cardId: string;
}

const TaskFiles: React.FC<TaskFilesProps> = ({ taskFiles, cardId }) => {
  const dispatch = useDispatch();
  const onDownload = (file: any) => {
    dispatch(
      downloadAttachment({
        cardId: cardId,
        attachmentId: file.trelloId,
      })
    );
  };
  return (
    <Stack
      direction="row"
      marginTop="12px"
      justifyContent="flex-start"
      alignItems="center"
      overflow={"hidden"}
      width="100%"
    >
      {taskFiles && taskFiles.length > 0 && (
        <>
          <img src={IMAGES.attachment} alt="more" />
          <Typography style={{ paddingLeft: "5px", color: "#92929D" }}>
            {taskFiles?.length}
          </Typography>
        </>
      )}
      <Box
        flexDirection={"row"}
        sx={{
          display: "inline-flex",
          width: "100%",
          overflowX: "scroll",
        }}
      >
        {taskFiles &&
          taskFiles.length > 0 &&
          taskFiles.map((item) => (
            <>
              <Typography
                variant={"body2"}
                onClick={() => onDownload(item)}
                className="fileUpload"
              >
                {item?.name}
              </Typography>
            </>
          ))}
      </Box>
    </Stack>
  );
};

export default TaskFiles;
