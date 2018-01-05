import withAuth from './hocs/withAuth';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchArticles } from './actions';
import React, { Component } from 'react';
import { Card, Icon, Image, Header } from 'semantic-ui-react'


class Home extends Component {

  componentDidMount() {
    console.log(this.props.fetchArticles())
  }

  renderArticles() {
    console.log(this.props.user)
    if (!this.props.user.articleData){
      return(
        <div>Loading</div>
      )
    }
    return this.props.user.articleData.articles.map((article) => {
      return (
        <Card>
          <Image src={article.urlToImage}/>
          <Card.Content>
            <a href={article.url} target="_blank">
            <Card.Header>{article.title}</Card.Header>
          </a>
            <Card.Description>{article.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              Date: {article.publishedAt.slice(0, 10) } Time: { article.publishedAt.slice(11, 19)}
            </a>
          </Card.Content>
        </Card>

      )
    } )
  }

  render() {
    // if (!this.props.user){
    //   return(
    //     <div>Loading</div>
    //   )
    // }
  const articles = this.props.user.articleData
  return (
    <div>
      <Header as='h1' block textAlign='center'>
        Your News Today, {this.props.user.currentUser.username}
      </Header>
    <Card.Group itemsPerRow={2}>
        {this.renderArticles()}
    </Card.Group>
  </div>
  );
}
};

const mapStateToProps = (state) => ({
  user: state.auth
})

export default withAuth(connect(mapStateToProps, {fetchArticles}) (Home))
