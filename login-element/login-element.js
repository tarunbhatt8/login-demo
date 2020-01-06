import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/iron-ajax/iron-ajax.js";

class LoginElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        .login-body {
          margin: auto 10px;
          width: auto;
          height: 100%;
          font-family: sans-serif;
          background: black;
        }
        .login-box {
          width: 280px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
        }
        .login-box h1 {
          float: left;
          font-size: 40px;
          border-bottom: 6px solid #4caf50;
          margin-bottom: 50px;
          padding: 13px 0;
        }

        .textbox {
          width: 100%;
          overflow: hidden;
          font-size: 20px;
          padding: 8px 0;
          margin: 8px 0;
          border-bottom: 1px solid #4caf50;
        }
        .textbox i {
          width: 26px;
          float: left;
          text-align: center;
        }
        .textbox input {
          border: none;
          outline: none;
          background: none;
          color: white;
          font-size: 18px;
          width: 80%;
          float: left;
          margin: 0 10px;
        }
        .btn {
          width: 100%;
          background: none;
          border: 2px solid #4caf50;
          color: white;
          padding: 5px;
          font-size: 18px;
          cursor: pointer;
          margin: 12px 0;
        }
        .messagearea {
          width:50%
          background: none;
          text-align: center;
          border: 2px solid #4caf50;
          color: white;
          padding: 5px;
          font-size: 18px;
          cursor: pointer;
          margin: 12px 0;
        }
      </style>

      <iron-ajax
        auto
        url="../assets/contacts.json"
        handle-as="json"
        on-response="handleResponse"
      >
      </iron-ajax>

      <div>
        <div class="login-body">
          <div class="login-box">
            <h1>Login</h1>
            <div class="textbox">
              <input type="text" placeholder="Username" id="username" />
            </div>

            <div class="textbox">
              <input type="password" placeholder="Password" id="password" />
            </div>

            <input type="button" class="btn" value="Sign in"
            on-click="handleClick"" />
          </div>

          <div id="messagearea" class="messagearea"></div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      contacts: {
        type: Array,
        value: []
      },
      usernameEntered: {
        type: String,
        value: ""
      },
      passwordEntered: {
        type: String,
        value: ""
      },
      matches: {
        type: Number,
        value: 0
      }
    };
  }
  handleResponse(event, request) {
    var resData = request.response;
    this.contacts = resData;
  }

  handleClick() {
    console.log("Sign In Clicked");
    this.shadowRoot.querySelector("#messagearea").innerHTML = "";
    this.shadowRoot.querySelector("#messagearea").style.background = "black";
    this.matches = 0;

    this.usernameEntered = this.shadowRoot.querySelector("#username").value;
    console.log("Username Entered: " + this.usernameEntered);
    this.passwordEntered = this.shadowRoot.querySelector("#password").value;
    console.log("Password Entered: " + this.passwordEntered);

    var i = 0;
    for (i = 0; i < this.contacts.length; i++) {
      if (
        this.contacts[i].name === this.usernameEntered &&
        this.contacts[i].password === this.passwordEntered
      ) {
        console.log("Match Found");
        this.matches++;
      }
    }
    if (this.matches === 1) {
      this.shadowRoot.querySelector("#messagearea").innerHTML =
        "<h2>Login Successful</h2>";
      this.shadowRoot.querySelector("#messagearea").style.background = "green";
      this.matches = 0;
    } else {
      this.shadowRoot.querySelector("#messagearea").innerHTML =
        "<h2>Login UnSuccessful</h2>";
      this.shadowRoot.querySelector("#messagearea").style.background = "red";
      this.matches = 0;
    }
  }
}
customElements.define("login-element", LoginElement);
