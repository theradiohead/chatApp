import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { sendChatAction } from "./store";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textValue: "",
    };

    this.changeTextValue = this.changeTextValue.bind(this);
  }

  changeTextValue(value) {
    this.setState({
      textValue: value,
    });
  }

  render() {
    return (
      <Paper>
        <Typography variant="h4" component="h4">
          Stream Chat
        </Typography>

        <div>
          <div>
            {this.props.chats.map((chat, i) => (
              <div key={i} className="row">
                <div className="col-md-6">
                  <Chip label={chat.from} />
                </div>
                <div className="col-md-6">
                  <Typography varient="p">{chat.msg}</Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Send a chat"
            variant="outlined"
            value={this.state.textValue}
            onChange={(e) => this.changeTextValue(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sendChatAction(this.state.textValue);
              this.changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  chats: state.chats,
});
export default connect(mapStateToProps)(Dashboard);
