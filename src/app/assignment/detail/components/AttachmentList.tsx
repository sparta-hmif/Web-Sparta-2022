import React from "react";
import Attachment from "./Attachment";
import styles from "./AttachmentList.module.css";

interface AttachmentProps {
  link: string;
  title?: string;
  type?: string;
}

interface AttachmentListProps {
  attachmentProps: AttachmentProps[];
}

const AttachmentList = ({ attachmentProps }: AttachmentListProps) => {
  return (
    <div className={styles.custom}>
      {attachmentProps.map((attachment, index) => (
        <Attachment key={index} {...attachment} />
      ))}
    </div>
  );
};

export default AttachmentList;
