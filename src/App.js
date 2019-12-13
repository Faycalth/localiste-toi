import React, { Component } from 'react';
import { geolocated } from "react-geolocated";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://download.data.grandlyon.com/ws/rdata/sit_sitra.sittourisme/all.json?maxfeatures=100&start=1")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result['values'])
          this.setState({
            isLoaded: true,
            items: result['values']
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    /*
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.commune}>
              {item.commune} : {item.nom} ({item.adresse})  
            </li>
          ))}
        </ul>
      );
    }
}}
*/
return !this.props.isGeolocationAvailable ? (
  <div>Il est impossible de vous géolocaliser</div>
) : !this.props.isGeolocationEnabled ? (
  <div>La géolocalisation n'est pas activée</div>
) : this.props.coords ? (
      <div><a rel="noopener noreferrer" href={'https://www.google.com/maps?q=loc:'+this.props.coords.latitude+','+this.props.coords.longitude} target="_blank">Clique ici pour connaitre ta localisation</a></div>
) : (
  <div>Chargement de votre localisation&hellip; </div>
);
}
}
export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);
