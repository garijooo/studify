import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import history from '../../history';

class Test extends React.Component {
    state = { 
        title: '', 
        questions: [], 
        text:'', 
        type:'standart', 
        answer: '', 
        answers: [], 
        variants: [''],
        count: 1,
        testAnswers: [],
        userAnswers: [],
        result: null
    };
    componentDidMount() {
        if(!localStorage.getItem("auth-token")) return history.push('/auth/signin');
        this.fetchTest();
    }
    fetchTest = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }; 
        try {
            const { data } = await axios.get(
                `/api/tests/get/${this.props.match.params.id}`,
                config
            );
            const { test } = data;
            if(test.questions) this.setState({ questions: [...test.questions], title: test.title });
            test.questions.map((question, index) => {
                if(question.type === 'multiplechoice') this.setState({ testAnswers: [...this.state.testAnswers, question.answers]});
                else this.setState({ testAnswers: [...this.state.testAnswers, question.answer]});
            });
            if(this.props.role === 'student'){
                let list = []
                test.questions.map((question, index) => {
                    if(question.type === 'multiplechoice') list[index] = [];
                    else list[index] = '';
                });
                this.setState({ userAnswers: [...list] });
            }
            const id = this.props.match.params.id;
            console.log(id);
            console.log(this.props.userId);
            try {
                const { data } = await axios.post(
                    `/api/tests/result/get/${this.props.userId}`,
                    {
                        testId: id
                    },
                    config
                );
                data.gotResult && this.setState({ result: data.gotResult });
                
            }
            catch (error) {
                console.log(error);
            }

        } catch(err) {
            console.log(err);
        }
    }
    onSubmitTest = async e => {
        e.preventDefault();
        const dateFormatted = new Date();
        let date = `${dateFormatted.getDate()}.${dateFormatted.getMonth()}.${dateFormatted.getFullYear()}  ${dateFormatted.getHours()}:${dateFormatted.getMinutes()}`;
        let finalAnswers = [...this.state.userAnswers];
        this.state.questions.map((question, index) => {
            if(question.type === 'multiplechoice'){
                let answ = [...finalAnswers[index]];
                question.variants.map((variant, id) => {
                    if(answ[id]) answ[id] = variant;
                    else answ[id] = null;
                });
                finalAnswers[index] = answ;
            }
        });

        finalAnswers.map((answer, index) => {
            if(Array.isArray(answer)) {
                finalAnswers[index] = answer.filter(anws => anws !== null);
            }
        });


        let results = [];
        this.state.testAnswers.map((answer, index) => {
            if(Array.isArray(answer)) {
                if(answer.join(' ') === finalAnswers[index].join(' ')) results.push({index, status: true});
                else results.push({index, status: false});
            }
            else {
              if(answer === finalAnswers[index]) results.push({index, status: true});
              else results.push({index, status: false});
            }
        });
        const { id } = this.props.match.params;
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }; 
        try{
            const { data } = await axios.post(
                `/api/tests/submit/${this.props.userId}`,
                {
                    testId: id,
                    lastExamination: date,
                    answers: results
                },
                config
            );
            
            this.setState({ result: data.result });
        } catch(err) {
            console.log(err);
        }

    }
    renderVariants(type, variants, id) {
        return variants.map((variant, index) => {
                    if(type === 'multiplechoice'){
                        return(
                            <div key={index}>
                                <input type="checkbox" name={`${id}`} 
                                    onChange={e => {
                                        let updated = [...this.state.userAnswers];

                                        let list = [...updated[id]];
                                        list[index] = e.target.checked;
                                        updated[id] = [...list];
                                        this.setState({ userAnswers: [...updated] });

                                    }}
                                /> 
                                <span>{variant}</span>
                            </div>
                        );
                    }
                    else if(type === 'singlechoice'){
                        return(
                            <div key={index}>
                                <input type="radio" name={`${id}`} 
                                    onChange={e => {
                                        let updated = [...this.state.userAnswers];
                                        if(e.target.checked) {
                                            updated[id] = variant;
                                            this.setState({ userAnswers: [...updated]}); 
                                        }
                                    }}
                                />
                                <span>{variant}</span> 
                            </div>
                        );
                    }
                    else return;
        });
    }
    renderResult(index) {
        if(this.state.result.answers[index].status){
            return(
                <span style={{ color: "green" }}>
                    Correct
                </span>
            );
        }
        else {
            return(
                <span style={{ color: "red" }}>
                    Incorrect
                </span>
            );
        }
    }
    renderQuestions() {
        return this.state.questions.map((question, index) => {
            switch(question.type) {
                case 'standart':
                    return(
                        <div key={index} className="question">
                            {
                                this.props.role === 'teacher'
                                    ? 
                                <input type="text" value={`${index+1}) ${question.text}`} />
                                    :
                                <span>{`${index+1}) ${question.text}`}</span>
                            }
                            <textarea rows="7" onChange={e => {
                                        let updated = [...this.state.userAnswers];
                                        updated[index] = e.target.value;
                                        this.setState({ userAnswers: [...updated] });
                                    }}>

                            </textarea>
                            {this.state.result && this.renderResult(index)}
                        </div>
                    );
                case 'singlechoice':
                    return(
                        <div key={index} className="question">
                                {
                                this.props.role === 'teacher'
                                    ? 
                                <input type="text" value={`${index+1}) ${question.text}`} />
                                    :
                                <span>{`${index+1}) ${question.text}`}</span>
                            }
                            {this.renderVariants(question.type, question.variants, index)}
                            {this.state.result && this.renderResult(index)}
                        </div>
                    );
                case 'multiplechoice':
                    return(
                        <div key={index} className="question">
                            {
                                this.props.role === 'teacher'
                                    ? 
                                <input type="text" value={`${index+1}) ${question.text}`} />
                                    :
                                <span>{`${index+1}) ${question.text}`}</span>
                            }
                            {this.renderVariants(question.type, question.variants, index)}
                            {this.state.result && this.renderResult(index)}
                        </div>
                    );
                default:
                    return;
            }
        });
    }

    onChangeVariants = e => {
        e.preventDefault();

    }

    renderCounter(type) {
        return this.state.variants.map((variant, index) => {
            return (
                <div key={index}>
                    {type === 'multiplechoice' ? <input type="checkbox"  name="vars"
                        onChange={e => {
                            let updated = [...this.state.answers];
                            updated[index] = e.target.checked;
                            this.setState({ answers: [...updated] });
                        }}    
                    /> 
                    : 
                    <input type="radio" name="vars" 
                        onChange={e => {
                            this.setState({ answer: this.state.variants[index]})
                        }} 
                     /> }
                    <input type="text" value={variant} 
                        onChange={
                            e => {
                                let updated = [...this.state.variants];
                                updated[index] = e.target.value;
                                this.setState({ variants: [...updated] });
                            }
                        }
                    />
                </div>
            );
        });
    }
    addVariant = e => {
        e.preventDefault();
        this.setState({ count: this.state.count + 1});
        this.setState({ variants: [...this.state.variants, ''] });
        this.setState({ answers: [...this.state.answers, false] });
    }
    addQuestion = e => {
        e.preventDefault();

    }
    renderFormInputs() {
        switch(this.state.type) {
            case 'standart':
                return(
                    <>
                        <label for="answer">Answer:</label>
                        <input type="text" value={this.state.answer} className="form__input-text" 
                            onChange={e => this.setState({ answer: e.target.value })} id="answer" />
                    </>
                );
            case 'multiplechoice':
                return(
                    <>  
                        <form onSubmit={this.addQuestion}>
                            {this.renderCounter(this.state.type)}
                            <button onClick={this.addVariant}>Add variant</button>
                        </form>
                    </>
                );
            case 'singlechoice':
                return(
                    <>  
                        <form onSubmit={this.addQuestion}>
                            {this.renderCounter(this.state.type)}
                            <button onClick={this.addVariant}>Add variant</button>
                        </form>
                    </>
                );
            default:
                return
        }
    }

    onAddQuestion = async e => {
        e.preventDefault();
        let answers = [];
        this.state.variants.map((variant, index) => {
            if(this.state.answers[index] === true) answers.push(variant);
        });
        let question = {}; 
        switch(this.state.type){
            case 'standart':
                question = {
                    type: this.state.type,
                    text: this.state.text,
                    answer: this.state.answer,
                    variants: [],
                    answers: [],
                    dataRef: 0
                };
                break;
            case 'multiplechoice':
                question = {
                    type: this.state.type,
                    text: this.state.text, 
                    variants: this.state.variants,
                    answers: [...answers]
                };
                break;
            case 'singlechoice':
                question = {
                    type: this.state.type,
                    text: this.state.text, 
                    variants: this.state.variants,
                    answer: this.state.answer
                };
                break;
            default:
                break;
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        try {
            const { id } = this.props.match.params;
            const { data } = await axios.patch(
                `/api/tests/add/${id}`,
                {
                    question
                },
                config
            );
            const { test } = data;
            this.setState({ questions: [...test.questions] });

        } catch(err){
            console.log(err);
        }
    }
    countCorrect() {
            let counter = 0;
            this.state.result.answers.map(result => {
                result.status && counter++;
            });
            return(
                <>
                    {counter} out of {this.state.result.answers.length}
                </>
            );
    }
    renderAddQuestion() {
        return(
            <section className="tests__form"> 
                <form className="form" onSubmit={this.onAddQuestion}>
                    <select value={this.state.type} 
                            onChange={e => this.setState({ type: e.target.value, variants: [], answers: [], answer: ''})} className="form__list"
                        >
                        <option value="standart">Standart</option>
                        <option value="multiplechoice">Multiple choice</option>
                        <option value="singlechoice">Single choice</option>
                    </select>
                    <textarea value={this.state.text}  className="form__input-textarea" 
                            onChange={e => this.setState({ text: e.target.value })} placeholder="Text of the question" 
                            cols="10" rows="10" maxLength="1600"  
                        >
                        </textarea> 
                        {this.renderFormInputs()}
                    <input type="submit" value="ADD QUESTION" onSubmit={this.onAddQuestion}
                    className="btn__submit wide-medium" />
                </form>
            </section>
        );
    }
    render() {
        return (
            <>
            <main>
                <div className="main-heading">
                    <h1>Test: {this.state.title}</h1>
                    <section className="test__list">
                        {this.renderQuestions()}
                        {this.state.result ? <div>Last examination was in: {this.state.result.lastExamination}</div> : ''}
                        {this.state.result ? <div>Correct: {this.countCorrect()}</div> : ''}
                        {
                        this.props.role === 'student' 
                        ? 
                        <button className="btn__submit" onClick={this.onSubmitTest}>SUBMIT</button>
                        : 
                        <></>
                        }
                    </section>
                    {this.props.role === 'teacher' ? this.renderAddQuestion() : ''}
                </div>
            </main>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
        role: state.auth.role,
        userId: state.auth.id
    };
}
export default connect(mapStateToProps)(Test);