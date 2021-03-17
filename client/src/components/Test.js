import React from 'react';
//styles
import '../styles/style.scss';

import logo from '../static/logo.png';
 
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class Test extends React.Component{
    render() {
        return (
            <>
            <header className="header">
                <nav className="header__nav">
                    <a className="header__link">
                        <img className="header__link_logo" alt="logo" src={logo} />
                    </a>
                    <ul className="header__list">
                        <li className="header__list_item"><a>Main</a></li>
                        <li className="header__list_item"><a>My courses</a></li>
                        <li className="header__list_item"><a>My results</a></li>
                        <li className="header__list_item"><a>Profile</a></li>
                    </ul>
                    <a className="header__link">
                        Sign Out
                    </a>
                </nav>
            </header>
            <main>
                <div className="main-heading">
                    <h1>Available courses</h1>
                </div>
                <article className="courses-list">
                    <section className="courses-list__item item">
                        <div className="item__link-conrolls">
                            <a className="item__link-conrolls__edit">
                                <EditIcon className="edit-icon" fontSize="medium">                        
                                </EditIcon>
                            </a>
                            <a className="item__link-conrolls__delete">
                                <DeleteIcon className="delete-icon" fontSize="medium">                        
                                </DeleteIcon>
                            </a>
                        </div>
                        <a className="item__link editable">
                            <div className="item__image">
                                <img src={logo} alt="Course preview" />
                            </div>
                            <div className="item__title">
                                <h2>
                                    Introduction to the creation of MERN applications
                                </h2>
                            </div>
                            <p className="item__description">
                                Main concepts of MERN applications
                            </p>
                            <p className="item__author">
                                Author: <span>Matveyas Yegor</span>
                            </p>  
                        </a>
                    </section>
                    <section className="courses-list__item item">
                        <a className="item__link">
                            <div className="item__image">
                             <img src={logo} alt="Course preview" />
                            </div>
                            <div className="item__title">
                                <h2>
                                    TypeScript Crash Course
                                </h2>
                            </div>
                            <p className="item__description">
                                This course will introduce you to world of Typescript
                            </p>
                            <p className="item__author">
                                Author: <span>Salimullina Polina</span>
                            </p>  
                        </a>
                    </section>
                    <section className="courses-list__item item">
                        <a className="item__link">
                            <div className="item__image">
                                <img src={logo} alt="Course preview" />
                            </div>
                            <div className="item__title">
                                <h2>
                                    Основы HTML и CSS
                                </h2>
                            </div>
                            <p className="item__description">
                                В данном курсе вы познакомитесь с основами HTML и CSS
                            </p>
                            <p className="item__author">
                                Author: <span>Габдулхакова Диляра</span>
                            </p>  
                        </a>
                    </section>
                </article>
            </main>
            <footer>

            </footer>
            </>
        )
    }
}

export default Test;