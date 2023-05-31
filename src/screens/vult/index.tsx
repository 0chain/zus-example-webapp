import React, { useMemo, useState } from "react";
import styles from './Vult.module.scss'
import { ContentBox } from "@/components/ContentBox";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { ProgressBar } from "@/components/ProgressBar";
import { IconUpload } from "@/components/IconUpload";

export default function Vult() {
  const [imageFile, setImageFile] = useState<File>();
  const [docFile, setDocFile] = useState<File>();

  const onImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) setImageFile(e.target.files[0]);
  }

  const onDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length) setImageFile(e.target.files[0]);
  }

  const totalFileSize = useMemo(() => {
    return (imageFile?.size || 0) + (docFile?.size || 0);
  }, [imageFile, docFile]);

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.wrapper}>
          <h1>
            <b>Allocation</b>
          </h1>
          <small>25/04/2023, 4:01 PM</small>

          <ProgressBar 
            value="50%" 
            labelLeft="0 KB used of 250mb" 
            theme="vult"></ProgressBar>
        </div>
      </ContentBox>

      <div className={styles.container}>
        <div className={styles.halfCol}>
          <IconUpload type="image" label="Upload image" changeFunc={onImageFileChange} />
        </div>

        <div className={styles.halfCol}>
          <IconUpload type="document" label="Upload document" changeFunc={onDocFileChange} />
        </div>
      </div>
    </LayoutDashboard>
  );
}