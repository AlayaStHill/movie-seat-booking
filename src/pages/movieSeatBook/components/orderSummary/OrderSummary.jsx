import styles from "./OrderSummary.module.css";

const OrderSummary = ({order}) => {
  return (

    <p className={styles.text}>
      Du har valt <span>{order.amount}</span> platser. Totalt pris
      <span>{order.totalPrice}</span> kr.
    </p>
  );
}

export default OrderSummary;