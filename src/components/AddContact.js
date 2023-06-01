import React from "react";

class AddContact extends React.Component {
  state = {
    name: "",
    mobno: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.mobno === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", mobno: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Mobile Number</label>
            <input
              type="number"
              name="mobno"
              placeholder="Mobile Number"
              value={this.state.mobno}
              onChange={(e) => this.setState({mobno: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddContact;
