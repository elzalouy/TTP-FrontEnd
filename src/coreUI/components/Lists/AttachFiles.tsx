import * as React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import IMAGES from "../../../assets/img/Images";
import { attachedFilesStyle } from "./styles";
import { AttachetFilesProps } from "../../../types/views/BoardView";
import { formatFileName } from "../../../helpers/equations";

const AttachetFiles: React.FC<AttachetFilesProps> = ({
  register,
  files,
  onSetFiles,
  onChangeFiles,
  state,
  onRemoveFile,
}) => {
  const styles = attachedFilesStyle()();
  return (
    <>
      <input
        {...register("file")}
        onChange={onSetFiles}
        ref={files}
        type="file"
        style={{ display: "none" }}
        multiple
      />
      <Box className={styles.attachedFilesBox}>
        <ButtonBase onClick={onChangeFiles} className={styles.newfiles}>
          <img src={IMAGES.fileicon} alt="Upload" />
          <span className={styles.newfilesIcon}>
            {state.task?.attachedFiles
              ? state.newFiles?.length + state.task?.attachedFiles?.length
              : state.newFiles.length}
          </span>
        </ButtonBase>
        <>
          {state?.newFiles &&
            state.newFiles.length > 0 &&
            state.newFiles?.map((item: any, index: number) => (
              <Typography
                key={index}
                marginX={0.5}
                bgcolor={"#F1F1F5"}
                padding={0.5}
                borderRadius={1}
                color="#92929D"
                className={styles.attachedfiles}
                onClick={() => onRemoveFile(item)}
              >
                {formatFileName(item?.name)}
                <CloseIcon
                  sx={{ fontSize: "14px", marginLeft: 0.5 }}
                  htmlColor="#92929D"
                />
              </Typography>
            ))}
        </>
        <>
          {state?.task?.attachedFiles &&
            state.task?.attachedFiles.length > 0 &&
            state.task.attachedFiles?.map((item: any, index: number) => (
              <Typography
                key={index}
                marginX={0.5}
                bgcolor={"#F1F1F5"}
                padding={0.5}
                borderRadius={1}
                className={styles.attachedfiles}
                onClick={() => onRemoveFile(item)}
              >
                {item?.name}
                <CloseIcon
                  sx={{ fontSize: "14px", marginLeft: 0.5 }}
                  htmlColor="#92929D"
                />
              </Typography>
            ))}
        </>
      </Box>
    </>
  );
};

export default AttachetFiles;
