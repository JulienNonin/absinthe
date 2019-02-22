import React, { Component } from 'react';
import CourseList from '../components/CourseList';
import { Helmet } from 'react-helmet';

export default class Courses extends Component {
  constructor (props, context) {
    super(props, context)
    if (this.props.courses) {
      this.state = {
        courses: this.props.courses,
        loading: false,
      }
    } else {
      this.state = {
        courses: null,
        loading: true,
      }
    }
  }

  componentDidMount () {
    if (this.state.loading) {
      fetch(this.props.base + '/api/cours')
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.setState({
            courses: data,
            loading: false
          })
        })
    }
  }
  render () {
    if (this.state.loading) {
      return <div>Chargement ...</div>
    } else {
      return (
        <div>
          <Helmet>
            <title>Absinthe</title>
          </Helmet>
          <CourseList
            courses={this.state.courses}
            routePrefix={this.props.base}
          />
        </div>
      )
    }
  }
}