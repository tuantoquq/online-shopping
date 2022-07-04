import React, { useState, memo, useEffect } from 'react';
import styles from './CSS/ImageUploader.module.scss';

function Image2Uploader(props) {
  return (
    <div id="upload_widget" className={styles.avatarContainer}>
      <img className={styles.avatarImg} src={props.avatarImg} alt="logo" />
    </div>
  );
}

export default Image2Uploader;
