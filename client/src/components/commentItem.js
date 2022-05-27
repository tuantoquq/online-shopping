import styles from './CSS/commentItem.module.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';

function CommentItem(){
    return (
        <div className={styles.commentProduct}>
            <div>
                <div className={clsx(styles.all,styles.elm1)}>
                    <img src='assets/laptop.jpg'/>
                    <div>
                        <p>Laptop Dell</p>
                        <p>Phân loại hàng: laptop Gaming</p>
                    </div>
                </div>

                <div className={clsx(styles.all,styles.rating)}>

                    <Stack spacing={5}>
                        <Rating name="size-large" defaultValue={2} size="large" />
                    </Stack>
                </div>

                <div className={clsx(styles.all,styles.textComment)}>
                    <textarea rows="4" cols="50" placeholder='Hãy chia sẻ trải nghiệm của bạn...' style={{width:'1000px'}}/>
                </div>
            </div>

        </div>
    )

}

export default CommentItem