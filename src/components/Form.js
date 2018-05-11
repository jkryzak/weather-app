import React from 'react';

class Form extends React.Component {

  state = {
    location: '',
  }

  getWeather = async (e) => {
    e.preventDefault();
    const location = e.target.elements.location.value;
    const api_call = await fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20location%2C%20item.condition%2C%20weather.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${location}%22)&format=json`);
    const weatherData = await api_call.json(); // everything that comes back will be saved as 'data'
    this.props.onSubmit(weatherData); // let a parent element have this data
    this.setState({ location: '' });
  }

  // getLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(showPosition);
  //     } else {
  //       console.log('aint got no support for this feature')
  //     }
  // }
  
  // showPosition(position) {
  //     document.log(position.coords.latitude)
  //     document.log(position.coords.longitude)
  // }

  render() {
    return (
      <div className="weather-form">
        <form onSubmit={ this.getWeather }>
          <label className="sr-only">Location</label>
          <input type="text" name="location" className="location-input" autoFocus required
            value={ this.state.location }
            onChange={(event) => this.setState({ location: event.target.value })}
            placeholder="Enter City, State or ZIP" 
          />
          <button>Submit</button>
        </form>
        {/* <span className="fake-button" onClick={(this.getLocation)}>GPS</span> */}
      </div>
    )
  }
}

export default Form;