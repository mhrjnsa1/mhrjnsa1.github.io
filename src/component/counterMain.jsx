import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
class Gitui extends Component {
  state = {
    userLogin: [],
    searchText: "",
    scrollActive: "normal",
    showloader: true
  };
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state.showloader = true;
    this.handleClick();
    this.hightlightheader();
  }

  handleClick() {
    axios.get("https://api.github.com/users").then(response => {
      response.data.map(list => {
        list.selected = true;
      });
      this.setState({ userLogin: response.data });
      setTimeout(() => {
        if (this.state.userLogin.length > 0) {
          this.setState({ showloader: false });
        }
      }, 1000);
    });
  }
  selectUser = () => {
    this.setState(state => {
      const userlogin = this.state.userLogin.map(list => {
        list.selected = false;
        if (list.type === "User") {
          list.selected = true;
        }
      });
      return { userlogin };
    });
  };
  selectOrg = () => {
    this.setState(state => {
      const userlogin = this.state.userLogin.map(list => {
        list.selected = false;
        if (list.type === "Organization") {
          list.selected = true;
        }
      });
      return { userlogin };
    });
  };
  selectAll = () => {
    this.setState(state => {
      const userlogin = this.state.userLogin.map(list => {
        list.selected = true;
      });
      return { userlogin };
    });
  };
  getText = event => {
    const searchText = event.target.value;
    this.setState({ searchText });
    if (searchText.length > 0) {
      this.setState(state => {
        const userlogin = this.state.userLogin.map(list => {
          list.selected = false;
          if (list.login.indexOf(searchText) >= 0) {
            list.selected = true;
          }
        });
        return { userlogin };
      });
    } else {
      this.setState(state => {
        const userlogin = this.state.userLogin.map(list => {
          list.selected = true;
        });
        return { userlogin };
      });
    }
  };
  checkuser = () => {
    let status = 0;
    this.state.userLogin.map(list => {
      if (list.selected) {
        status++;
      }
    });

    return status;
  };
  hightlightheader = () => {
    let isTop = "";
    document.addEventListener("scroll", () => {
      isTop = window.scrollY > 60 ? "activeheader" : "normale";

      this.setState({ scrollActive: isTop });
    });
  };
  render() {
    return (
      <div
        className={
          "container-fluid bodyWrapper " +
          (this.state.showloader ? "showLoader" : "showWrapper")
        }
      >
        <div className="loader_dsg">Loading....</div>
        <div className="gitWrappercontainer">
          <div className={"userSelect_dsg " + this.state.scrollActive}>
            <button
              className="btn btn-success"
              onClick={() => this.selectAll()}
            >
              All
            </button>
            <button
              className="btn btn-success"
              onClick={() => this.selectUser()}
            >
              User
            </button>
            <button
              className="btn btn-success"
              onClick={() => this.selectOrg()}
            >
              Organization
            </button>
            <input
              type="text"
              value={this.state.searchText}
              onChange={evt => this.getText(evt)}
            />
          </div>
          <h1 className="noInfo">
            {this.checkuser() ? "" : "no user available"}
          </h1>
          <div className="cardWrapper">
            {this.state.userLogin.map((list, index) =>
              list.selected ? (
                <div className="card userDesign" key={index}>
                  <h1 className="userName_dsg">{list.login}</h1>
                  <img
                    className="card-img-top"
                    src={list.avatar_url}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{list.type}</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Gitui;
