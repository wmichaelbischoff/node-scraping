import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component{
  constructor(){
    super()
    this.state = {
      imdbUrl: '',
      title: '',
      rating: '',
      poster: '',
    }
  }
  componentDidMount(){
    
  }
  sendUrl(){
    var url = {
    
    url: this.state.imdbUrl
    }
    axios.put('/scrape', url).then(res => {
      this.setState({
        title: res.data.title,
        rating: res.data.rating,
        poster: res.data.poster

      })
    })
  }
  handleUrl(val){
    this.setState({
      imdbUrl: val
    })
  }
  render(){
  return (
    <div className="App">
      <h1>Input imdb url</h1>
      <input value={this.state.imgUrl} placeholder='url' onChange={(e) => this.handleUrl(e.target.value)}></input>
      <button onClick={() => {this.sendUrl()}}>Send</button>
      <h1>{this.state.title}</h1>
      <h3>{this.state.rating}</h3>
      <img src={this.state.poster} alt='sry'/>
    </div>
  );
}
}

export default App;
