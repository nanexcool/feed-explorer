import React, { Component } from 'react';

class Feed extends Component {
  constructor(props) {
    super();

    this.state = {
      values: [],
    }

  }

  componentDidMount() {
    
  }

  renderValue(key, row) {
    return(
      <tr key={key}>
      </tr>
    )
  }

  render() {
    const values = [];
    for (let i=0; i<this.state.values.length; i++) {
      values.push(this.renderValue(i, this.state.values[i]));
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <h2>Values</h2>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                </tr>
              </thead>
              <tbody>
                { values }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
