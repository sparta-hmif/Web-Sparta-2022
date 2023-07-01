import React from "react";
import Attachment from "./Attachment";

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
    <div className="flex flex-row w-full overflow-x-auto gap-2">
      {attachmentProps.map((attachment, index) => (
        <Attachment key={index} {...attachment} />
      ))}
    </div>
  );
};

export default AttachmentList;
