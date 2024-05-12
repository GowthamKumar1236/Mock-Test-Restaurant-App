import {useState} from 'react'
import './index.css'

const DishesItem = props => {
  const {dish, count, onIncreaseCount, onDecreaseCount} = props
  const {
    dishName,
    dishImage,
    dishCalories,
    dishAvailability,
    dishCurrency,
    dishDescription,
    dishPrice,
    addonCat,
  } = dish
  console.log(count)

  const [dishesCount, changeCount] = useState(0)

  const onClickIncrease = () => {
    changeCount(dishesCount + 1)
    onIncreaseCount()
  }

  const onClickDecrease = () => {
    if (dishesCount === 0) {
      changeCount(0)
    } else {
      changeCount(dishesCount - 1)
      onDecreaseCount()
    }
  }

  return (
    <li className="dish-item-card">
      <div className="circle-content-card">
        <div className={`box  ${dishPrice > 10 ? 'high-rate-props' : ''}`}>
          <p className={`circle ${dishPrice > 10 ? 'high-rate-circle' : ''}`} />
        </div>
        <div className="content-div">
          <h1 className="name">{dishName}</h1>
          <p className="money">{`${dishCurrency} ${dishPrice}`}</p>
          <p className="description">{dishDescription}</p>
          {dishAvailability ? (
            <div className="qunatity-control-card">
              <button
                type="button"
                className="control"
                onClick={onClickDecrease}
              >
                -
              </button>
              <p className="qunatity">{dishesCount}</p>
              <button
                type="button"
                className="control"
                onClick={onClickIncrease}
              >
                +
              </button>
            </div>
          ) : (
            <p className="not-availble">Not available</p>
          )}

          {addonCat.length ? (
            <p className="customization-text">Customizations available</p>
          ) : (
            ''
          )}
        </div>
      </div>
      <p className="calories-num calories-num-sm">{`${dishCalories} Calories`}</p>
      <div className="cal-img-card">
        <p className="calories-num calories-num-lg">{`${dishCalories} Calories`}</p>
        <img className="dish-img" alt={dishName} src={dishImage} />
      </div>
    </li>
  )
}

export default DishesItem
