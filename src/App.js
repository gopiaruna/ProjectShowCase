import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class App extends Component {
  state = {isActiveTab: 'ALL', projectData: [], isLoading: true}

  componentDidMount() {
    this.onApiCallForProject('ALL')
  }

  onApiCallForProject = async isActiveTab => {
    const url = `https://apis.ccbp.in/ps/projects?category=${isActiveTab}`
    const response = await fetch(url)
    const data = await response.json()
    this.setState({
      projectData: data.projects,
      isLoading: false,
    })
  }

  onChangeSelect = e => {
    this.setState({isActiveTab: e.target.value})
    this.onApiCallForProject(e.target.value)
  }

  onRetry = () => {
    const {isActiveTab} = this.state
    this.onApiCallForProject(isActiveTab)
  }

  render() {
    const {isLoading, projectData} = this.state
    return (
      <>
        <nav>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="img-logo"
          />
        </nav>
        <div className="container">
          <select className="select-container" onChange={this.onChangeSelect}>
            {categoriesList.map(eachItem => (
              <option key={eachItem.id} value={eachItem.id}>
                {eachItem.displayText}
              </option>
            ))}
          </select>
          {isLoading && (
            <div testid="loader" className="loader-container">
              <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
            </div>
          )}
          {!isLoading && (
            <ul className="container-1">
              {projectData.map(eachItem => (
                <li key={eachItem.id}>
                  <img
                    src={eachItem.image_url}
                    alt={eachItem.name}
                    className="list-img"
                  />
                  <p>{eachItem.name}</p>
                </li>
              ))}
            </ul>
          )}
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={this.onRetry} type="button">
            Retry
          </button>
        </div>
      </>
    )
  }
}

export default App
