import React from 'react';
import './App.css';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ImagePreview from './components/ImagePreviewArea/ImagePreview'
import Checkout from './components/CheckoutArea/Checkout'

class Overlay extends React.Component {
 render() {
   return (
    <div className="Overlay" style={{'backgroundImage':'url(' + this.props.image + ')'}}>
      Something
    </div>
    );
  } 
}; 

class Container extends React.Component {
  render() {
    return (
      <div className='Container'>
        {this.props.children}
      </div>
    )
  }
}; 

class Header extends React.Component {
  render() {
    return(
      <header>
        <input onChange={this.props.onChange} type='range' max='100' min='1' step='1' />
      </header>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false, 
      people: 1, 
      price: 320.00, 
      tax: 20, 
      duration: 5, 
      discount: 5
    }; 
  }

  componentDidMount() {
    this.setState({
      mount: true
    })
  }


  handleSubmit(e) {
    e.preventDefault(); 
    console.log('handle ajax submission here'); 
    
  }

  handleChange(e) {
    this.setState({
      duration: e.target.value
    }); 
  }

  render() {
    var overlay, container; 
    if(this.state.mounted) {
      overlay = (
        <Overlay image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg" />
      ); 
      container = (
        <Container>
          <ImagePreview price={this.state.price} duration={this.state.duration} 
          people={this.state.people} image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/jj-2.jpg"/>
          <Checkout duration={this.state.duration} discount={this.state.discount} tax={this.state.tax} price={this.state.price} onSubmit={this.handleSubmit}/>
        </Container>
      ); 
    }
  
    return(
      <div className='App'>
        <CSSTransitionGroup transitionName='overlay' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
          {overlay}
        </CSSTransitionGroup>
        <CSSTransitionGroup transitionName='container' transitionEnterTimeout={500} transitionLevelTimeout={300}>
          {container}
        </CSSTransitionGroup>
        <Header onChange={this.handleChange} />  
      </div>
      );
  }
}


  export default App

