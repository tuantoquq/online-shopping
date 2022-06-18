import React, { useState, memo, useEffect } from 'react';
import styles from './CSS/ImageUploader.module.scss';

function ImageUploader(props) {
  const [myWidget] = useState(() => {
    return window.cloudinary.createUploadWidget(
      {
        cloudName: 'trinhvanthoai',
        uploadPreset: 'trinhvanthoai20184635hust',
        cropping: true, //add a cropping step
        croppingAspectRatio: 1,
        showAdvancedOptions: true, //add advanced options (public_id and tag)
        sources: ['local'], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        folder: 'thoaiUploads', //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        //context: { alt: 'user_uploaded' }, //add the given context data to the uploaded files
        //clientAllowedFormats: ['images'], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
      },
      (error, result) => {
        console.log(error);
        if (!error && result && result.event === 'success') {
          //console.log('Done! Here is the image info: ', result.info);
          props.onAvatarChange(result.info.url);
        }
      }
    );
  });

  useEffect(() => {
    document.getElementById('upload_widget').addEventListener(
      'click',
      function () {
        myWidget.open();
      },
      false
    );
    // return () => {
    //   document.getElementById('upload_widget').removeEventListener(
    //     'click',
    //     function () {
    //       myWidget.open();
    //     },
    //     false
    //   );
    // };
  }, []);

  // console.log(props.avatarImg);

  return (
    <div id="upload_widget" className={styles.avatarContainer}>
      <img className={styles.avatarImg} src={props.avatarImg} alt="logo" />
    </div>
  );
}

export default memo(ImageUploader);
