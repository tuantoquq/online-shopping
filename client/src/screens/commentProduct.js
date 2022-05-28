import CommentItem from "../components/commentItem"
import styles from './CSS/commentProduct.module.css';


function CommentProduct(){
    return(
        <div>
            <CommentItem/>
            <CommentItem/>
            <div className={styles.controlButton}>
                <button>Trở lại</button>
                <button>Hoàn thành</button>
            </div>

        </div>
    )

}

export default CommentProduct