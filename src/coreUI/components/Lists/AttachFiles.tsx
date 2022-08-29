import * as React from "react";
import { Box } from "@mui/material";
import { AttachetFilesProps } from "../../../types/views/BoardView";
import Upload from "../Typos/UploadLabel";
import UploadLabel from "../Typos/FileLabel";

const AttachetFiles: React.FC<AttachetFilesProps> = ({
  register,
  newFiles,
  oldFiles,
  filesRef,
  onSetFiles,
  onChangeFiles,
  onRemoveFile,
}) => {
  return (
    <>
      <input
        {...register("file")}
        onChange={onSetFiles}
        ref={filesRef}
        type="file"
        data-test-id="project-task-file"
        style={{ display: "none" }}
        multiple
      />
      <Box
        paddingLeft={"5px"}
        paddingTop={"10px"}
        display={"inline-flex"}
        width={"auto"}
      >
        <Upload length={newFiles.length} onClick={onChangeFiles} />
        <Box
          sx={{
            maxWidth: "60vw",
            display: "inline-flex",
            alignItems: "center",
            overflowX: "scroll",
            marginBottom: "10px",
          }}
        >
          {newFiles &&
            newFiles?.length > 0 &&
            newFiles?.map((item, index) => (
              <UploadLabel
                key={index}
                onRemove={() => onRemoveFile(item)}
                fileName={item?.name ? item.name : ""}
              />
            ))}
          {oldFiles &&
            oldFiles?.length > 0 &&
            oldFiles?.map((item, index) => (
              <UploadLabel
                key={index}
                onRemove={() => onRemoveFile(item)}
                fileName={item?.name ? item.name : ""}
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default AttachetFiles;
