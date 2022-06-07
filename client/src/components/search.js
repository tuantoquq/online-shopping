import styles from './CSS/search.module.css';
export default function Search(){
    return (
        <input type="text" className={styles.search}
            placeholder="Tìm kiếm theo tên khác hàng, tên đơn hàng..."
        />
    )
}