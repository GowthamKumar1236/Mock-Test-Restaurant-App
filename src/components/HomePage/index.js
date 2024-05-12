import React, {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DishesCategoryTab from '../DishesCategoryTab'
import DishesItem from '../DishesItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class HomePage extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeTabId: '',
    itemsData: [],
    count: {},
  }

  componentDidMount() {
    this.getRestaurantItems()
  }

  getRestaurantItems = async () => {
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
      )
      const dataResponse = await response.json()
      const {table_menu_list} = dataResponse
      const activeTabId =
        table_menu_list.length > 0 ? table_menu_list[0].menu_category_id : ''
      const count = {}
      table_menu_list.forEach(category => {
        category.category_dishes.forEach(dish => {
          count[dish.dish_id] = 0
        })
      })
      this.setState({
        itemsData: table_menu_list,
        activeTabId,
        count,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeActiveTab = id => {
    this.setState({activeTabId: id})
  }

  onIncrement = dishId => {
    this.setState(prevState => ({
      count: {
        ...prevState.count,
        [dishId]: prevState.count[dishId] + 1,
      },
    }))
  }

  onDecrement = dishId => {
    this.setState(prevState => ({
      count: {
        ...prevState.count,
        [dishId]: Math.max(prevState.count[dishId] - 1, 0),
      },
    }))
  }

  renderSuccessView = () => {
    const {itemsData, activeTabId, count} = this.state
    const activeCategory = itemsData.find(
      category => category.menu_category_id === activeTabId,
    )

    return (
      <>
        <div className="dish-item-category">
          <ul className="tabs-container">
            {itemsData.map(category => (
              <DishesCategoryTab
                key={category.menu_category_id}
                isActiveTab={category.menu_category_id === activeTabId}
                menuData={category}
                onChangeTabId={this.onChangeActiveTab}
              />
            ))}
          </ul>
        </div>
        <ul className="dish-items-container">
          {activeCategory &&
            activeCategory.category_dishes.map(dish => (
              <DishesItem
                key={dish.dish_id}
                dish={dish}
                count={count[dish.dish_id]}
                onIncreaseCount={() => this.onIncrement(dish.dish_id)}
                onDecreaseCount={() => this.onDecrement(dish.dish_id)}
              />
            ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  onClickTryAgain = () => {
    this.getRestaurantItems()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <p className="failure-description">Failed to load data.</p>
      <button
        className="try-button"
        type="button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderMenuView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header
          count={Object.values(this.state.count).reduce(
            (acc, curr) => acc + curr,
            0,
          )}
        />
        <div className="home-bg-container">{this.renderMenuView()}</div>
      </>
    )
  }
}

export default HomePage
