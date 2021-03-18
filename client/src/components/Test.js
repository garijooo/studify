import React from 'react';
//styles
import '../styles/style.scss';

import preview from '../static/preview.jpg';
import video from '../static/animation.mp4';
import anim1 from '../static/anim1.gif'; 
import anim2 from '../static/anim2.gif'; 


import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import Header from '../components/extra/Header';

class Test extends React.Component{
    render() {
        return (
            <>
                <Header />
                <main>
                    <div className="main-heading">
                        <h1>{`"${123}"`}</h1>
                    </div>
                    <article className="course-show">
                        <section className="course-show__blocks blocks">
                            <div className="blocks__text">
                                <h3>
                                    Introduction to the MERN apps   
                                </h3>
                            </div>
                            <div className="blocks__text">
                                <p>
                                    Some testing text
                                    Proident culpa nisi aute culpa et consectetur. Amet eu deserunt enim elit elit esse voluptate et ullamco ullamco esse minim aliqua voluptate. Amet ipsum est fugiat occaecat quis enim veniam consectetur cupidatat irure tempor et. Ullamco cillum eu nulla veniam Lorem ad commodo elit mollit reprehenderit. Lorem pariatur occaecat culpa magna in voluptate aliquip in aute velit magna.
                                    Proident culpa nisi aute culpa et consectetur. Amet eu deserunt enim elit elit esse voluptate et ullamco ullamco esse minim aliqua voluptate. Amet ipsum est fugiat occaecat quis enim veniam consectetur cupidatat irure tempor et. Ullamco cillum eu nulla veniam Lorem ad commodo elit mollit reprehenderit. Lorem pariatur occaecat culpa magna in voluptate aliquip in aute velit magna.
                                    Proident culpa nisi aute culpa et consectetur. Amet eu deserunt enim elit elit esse voluptate et ullamco ullamco esse minim aliqua voluptate. Amet ipsum est fugiat occaecat quis enim veniam consectetur cupidatat irure tempor et. Ullamco cillum eu nulla veniam Lorem ad commodo elit mollit reprehenderit. Lorem pariatur occaecat culpa magna in voluptate aliquip in aute velit magna.
                                </p>
                            </div>
                            <div className="blocks__text">
                                <p>
                                    Some testing text
                                    Proident culpa nisi aute culpa et consectetur. Amet eu deserunt enim elit elit esse voluptate et ullamco ullamco esse minim aliqua voluptate. Amet ipsum est fugiat occaecat quis enim veniam consectetur cupidatat irure tempor et. Ullamco cillum eu nulla veniam Lorem ad commodo elit mollit reprehenderit. Lorem pariatur occaecat culpa magna in voluptate aliquip in aute velit magna.
                                    Proident culpa nisi aute culpa et consectetur. Amet eu deserunt enim elit elit es
                                </p>
                            </div>
                            <div className="blocks__animation small">
                                <img width="600" height="300"  src={anim1} />
                            </div>
                            <div className="blocks__text">
                                <p>
                                    Adipisicing consectetur mollit adipisicing nisi aliqua irure.
                                    Elit irure voluptate reprehenderit voluptate aliquip cillum commodo sunt aute esse eiusmod. Velit aute ea mollit incididunt qui aliquip minim commodo amet nostrud proident id veniam. Cupidatat non dolor excepteur deserunt laborum nisi excepteur sint do ex non amet laborum commodo. Occaecat cupidatat quis nostrud officia sit non nulla. Tempor culpa consectetur deserunt ea eiusmod dolor voluptate do ad.    
                                </p>
                            </div>
                            <div className="blocks__animation medium">
                                <img width="600" height="300"  src={anim2} />
                            </div>
                            <div className="blocks__text">
                                <p>
                                    Cillum labore sit quis minim culpa consectetur voluptate magna exercitation dolor deserunt proident ea. Ullamco fugiat sint consequat sint deserunt pariatur ad officia ut minim. Et voluptate occaecat nulla minim minim.
                                    Nulla exercitation ex pariatur cillum cupidatat laboris enim fugiat deserunt labore nisi ipsum velit dolore. Commodo ut qui ipsum consequat sint adipisicing eiusmod incididunt cupidatat ullamco consectetur nulla Lorem. Est esse commodo reprehenderit consequat deserunt culpa cupidatat nisi enim proident pariatur magna.
                                </p>
                            </div>
                            <div className="blocks__text">
                                <p>
                                    Adipisicing consectetur mollit adipisicing nisi aliqua irure.
                                    Elit irure voluptate reprehenderit voluptate aliquip cillum commodo uptate do ad.    
                                </p>
                            </div>
                            <div className="blocks__image small">
                                <img src={preview} />
                            </div>
                            <div className="blocks__text">
                                <h3>
                                    Vladimir Putin eating
                                </h3>
                            </div>
                            <div className="blocks__text">
                                <p>
                                    Some testing text
                                    Proident culpa nisi aute culpa et consectetur. Amet eu deserunt enim elit elit esse voluptate et ullamco ullamco esse minim aliqua voluptate. Amet ipsum est fugiat occaecat quis enim veniam consectetur cupidatat irure tempor et. Ullamco cillum eu nulla veniam Lorem ad commodo elit mollit reprehenderit. Lorem pariatur occaecat culpa magna in voluptate aliquip in aute velit magna.
                                    </p>
                            </div>
                            <div className="blocks__video big">
                                <video controls>
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </section>

                        <section className="course-show__form form">
                            <form className="form">

                            </form>                    
                        </section>
                    </article>
                </main>
            </>
        )
    }
}

export default Test;