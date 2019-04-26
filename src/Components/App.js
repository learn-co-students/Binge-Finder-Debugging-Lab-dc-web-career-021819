import React, { Component } from "react";
import Adapter from "../Adapter.js";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";
import { Grid } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      shows: [],
      searchTerm: "",
      selectedShow: "",
      episodes: [],
      filterByRating: "",
    };
  }

  componentDidMount = async () => {
    const shows = await Adapter.getShows();
    this.setState({ shows: shows });
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() });
  };

  handleFilter = e => {
    e.target.value === "No Filter" ? this.setState({ filterByRating: "" }) : this.setState({ filterByRating: e.target.value });
  };

  selectShow = show => {
    this.setState({
      selectedShow: show,
    });
  };

  displayShows = () => {
    if (this.state.filterByRating) {
      return this.state.shows.filter(s => {
        return s.rating.average >= this.state.filterByRating;
      });
    } else {
      return this.state.shows;
    }
  };

  render() {
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm} />
        <Grid celled>
          <Grid.Column width={5}>{!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes} /> : <div />}</Grid.Column>
          <Grid.Column width={11}>
            <TVShowList shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm} />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
