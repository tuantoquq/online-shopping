import styles from './CSS/commentItem.module.css'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import clsx from 'clsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { addComment } from '../service/CustomerService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageUploader from '../components/imageUploader';

function CommentItem() {
    const navigate = useNavigate()
    const location = useLocation()
    let data = location?.state?.id
    const [comment, setComment] = useState({})

    const handleChange = (product_id, e) => {
        let key = e.target.name
        let content
        let ratingStar
        let value = e.target.value
        if (key === 'content') {
            ratingStar = comment[product_id]?.ratingStar === undefined ? 0 : comment[product_id]['ratingStar']
            setComment((comment) => ({
                ...comment,
                [product_id]: {
                    [key]: value,
                    ratingStar: ratingStar
                }

            }));
        }
        else {
            content = comment[product_id]?.content === undefined ? '' : comment[product_id]['content']
            setComment((comment) => ({
                ...comment,
                [product_id]: {
                    [key]: value,
                    content: content
                }

            }));
        }

    }
    const submit = () => {
        console.log(comment)
        for (var key in comment) {
            try {
                let data = comment[key]
                console.log(key, data)
                let body = {
                    productId: key,
                    content: data['content'],
                    ratingStar: data['ratingStar'],
                    files: avatarImg
                }
                var form_data = new FormData();
                for (var key in body) {
                    form_data.append(key, body[key]);
                }
                addComment(form_data)
                    .then(res => {
                        console.log('done')
                        toast.success("Thêm bình luận thành công!");
                        toast.error("Thành luận chứa từ ngữ tiêu cực!");
                        toast.error("Không đúng định dạng file ảnh!");
                    })
                    .catch(err => console.log(err))
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setTimeout(() => navigate('/user/orderManager'), 3000);
            }
        }

    }
    const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';
    const [avatarImg, setAvatarImg] = useState(defautlAvatar);




    return (
        <>
            {
                data?.map((item, index) => {
                    return (
                        <div className={styles.commentProduct} key={index}>
                            <div>
                                <div className={clsx(styles.all, styles.elm1)}>
                                    <img src={item.productImageUrl} style={{ width: '300px', height: '200px' }} />
                                    <div>
                                        <p>{item.productName}</p>
                                        <p>Giá: {item.currentPrice}</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.avatarInput, styles.col)}>
                                    <ImageUploader
                                        avatarImg={avatarImg}
                                        onAvatarChange={setAvatarImg}
                                    />
                                </div>

                                <div className={clsx(styles.all, styles.rating)}>

                                    <Stack spacing={5}>
                                        <Rating defaultValue={2} size="large"
                                            name='ratingStar' onChange={(e) => handleChange(item.productId, e)} />
                                    </Stack>
                                </div>

                                <div className={clsx(styles.all, styles.textComment)}>
                                    <textarea rows="4" cols="50" placeholder='Hãy chia sẻ trải nghiệm của bạn...' style={{ width: '100%' }}
                                        name='content' onChange={(e) => handleChange(item.productId, e)}
                                    />
                                </div>
                            </div>

                        </div>
                    )
                }

                )
            }
            <Box sx={{
                marginLeft: 65
            }}>
                <Button onClick={()=> navigate('/user/orderManager')}>Trở lại</Button>
                <Button variant="contained" onClick={submit}>Hoàn thành</Button>
            </Box>
            <ToastContainer />

        </>

    )

}

export default CommentItem