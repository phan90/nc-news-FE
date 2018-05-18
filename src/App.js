import React from "react";
import { Route } from "react-router-dom";
import * as API from './API';
import { Articles, Article, Users, Nav, Profile} from './components'

class App extends React.Component {
  state = {
    articles: [],
    loading: true,
    search: '',
    loggedIn: false,
    username: '',
    currentUser: {}
  }

  componentDidMount() {
    API.getArticles()
      .then(articles => this.setState({
        articles,
        loading: false
      }))
      .catch(console.error)
  }

  render() {
    const { articles, loading, search, loggedIn, username, currentUser } = this.state
    return (
      <div>
        <Nav loggedIn={loggedIn} currentUser={currentUser} search={search} handleChange={this.handleChange} />
        {loading ? <div className="loading"><div className="loader"></div> </div> :   (
          <div>
            <Route exact path="/" render={props => (
              <Articles {...props} articles={articles} search={search} />
            )} />
            <Route path="/topics/:topicId" render={props => (
              <Articles {...props} articles={articles} search={search} />
            )} />
            <Route path="/articles/:articleId" render={props => (
              <Article {...props} articles={articles} currentUser={currentUser} />
            )} />
            <Route path="/users" render={props => (
              <Users {...props} username={username} loggedIn={loggedIn} logIn={this.logIn} handleUsername={this.handleUsername} />
            )} />
            {loggedIn &&
            <Route path="/users/:username" render={props => (
              <Profile {...props} articles={articles} logOut={this.logOut} currentUser={currentUser} />
            )} />
            }
          </div>
        )}
      </div>
    );
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      currentUser: {}
    })
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  logIn = (event) => {
    event.preventDefault()
    API.getUser(this.state.username)
      .then(currentUser => {
        this.setState({
          currentUser,
          loggedIn: true
        })
      })
      .catch(console.error)
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

}

export default App;

