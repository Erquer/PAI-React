import React from 'react';
import './App.css';
import storyLine from './storyLine';
import Story from "./Story";
class App extends React.Component{
  constructor() {
    super();
    this.formRef = React.createRef();
    this.onTrigger = this.onTrigger.bind(this);
    this.state ={
      imageUrl:"/Wallpapers/house"
    }
  }

  onTrigger(newImageUrl){
      var prefix = "/Wallpapers/";
    this.setState({imageUrl: prefix+newImageUrl});
  }
  render() {
    return (
        <div className="app" style={{backgroundImage: 'url('+this.state.imageUrl+'.jpg)'}}>
          <header className="appHeader"><div className="gameTitle">{storyLine.title}</div></header>
          <main className="mainApp">
            <Story storyline={storyLine} ref={this.formRef} onTriger={this.onTrigger}  />
          </main>
        </div>
    );
  }


}

export default App;
