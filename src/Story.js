import React from "react";

import './Story.css';


class Story extends React.Component{
    constructor(props) {
        super(props);
        this.getQuestionbyId = this.getQuestionbyId.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.wantAction = this.wantAction.bind(this);
        this.state={
            current: this.getQuestionbyId(this.props.storyline.quests,this.props.storyline.storyStart)
        };
    }


    //Funkcja zwracająca pytanie o danym ID
    getQuestionbyId(questions,id){
        const res = questions.find(el =>{
            return el.id === id;
        });
        return res;
    }

    //Funkcja zwracająca ID nowego wydarzenia.
    nextQuestion(pathChoice){
        if(pathChoice.hasOwnProperty("chance")){
            const chance = pathChoice.chance;
            let random = Math.random();
            console.log(chance,random);
            return (random < chance) ? pathChoice.success : pathChoice.failure;
        }else{
            return pathChoice.success;
        }

    }

    wantAction(nUrl){
        this.props.onTriger(nUrl);
    }

    render() {
        let that = this;
        const question = this.state.current;
        console.log(this.state.current);
        //mapowanie odpowiedzi ze ścieżkami postępu na przyciski.
        const choices = question.paths.map(e=>
            <button
                key={e.text}
                onClick={function() {
                    console.log('Changing state');
                    that.setState({
                            current:
                                that.getQuestionbyId(that.props.storyline.quests,
                                    that.nextQuestion(e))
                        }
                    );
                    console.log('sending new url ' + question.backImage);
                    that.wantAction(that.state.current.backImage);
                }
                }
            >
                {e.text}
            </button>
        );
        return (
          <div className="story">
              <p>{question.text}</p>
              <div className="questionChoices">
                  {choices}
              </div>
          </div>
        );
    }
}

export default Story;