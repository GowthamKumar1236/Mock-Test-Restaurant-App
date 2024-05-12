import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {count} = props
  return (
    <div className="header-container">
      <h1 className="logo-heading">UNI Resto Cafe</h1>
      <nav className="nav-items">
        <p className="my-orders">My Orders</p>
        <div className="cart-card">
          <AiOutlineShoppingCart className="cart-icon" />
          <span className="cart-count">{count}</span>
        </div>
      </nav>
    </div>
  )
}

export default Header