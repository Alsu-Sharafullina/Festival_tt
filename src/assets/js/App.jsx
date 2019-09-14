import React, { Component } from "react";

import $ from "jquery";

import vk from '../img/icons/vk.svg';
import instagram from '../img/icons/instagram.svg';
import facebook from '../img/icons/facebook.svg';
import paper from '../img/paper.svg';

import '../styles/sass/style.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_tab : 'idea',
            current_link : '#festival',
            users : [],
            uploaded_image : "",
            infoShowed : false,
            value : '',
        };

        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
        this.onClickButton = this.onClickButton.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
        this.chooseFile = this.chooseFile.bind(this);
        this.validateText = this.validateText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    chooseFile(){
        document.getElementById("FormInputImage").click();
    }

    validateText(event) {
        const value = event.target.value;
        let patt = new RegExp(/^[a-zа-я]+$/i);
        const message = event.target.getAttribute('name');

        if (message == "url") {
            patt = new RegExp(/^((https?|ftp)\:\/\/)?([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z]{2,6})(\/?)$/);
        }
        if (patt.test(value)) {
            $(event.target).tooltip('hide');
        } else {
            $(event.target).tooltip('show');
        }

    }


    /* Обработка клика по ссылкам шапки */
    onChangeLink(event) {
        const data = event.target.getAttribute('data-scroll');
        let current_link = data;

        this.setState({
            current_link : data,
        }, function () {

        })
    }


    /* Обработка клика по картинкам */
    onChangeTab(event) {
        const data = event.target.id;
        let current_tab = data;

        this.setState({
            current_tab : data,
        }, function () {

        })
    }


    /* Обработка кнопки "Показать еще"*/
    onClickButton() {

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://api.randomuser.me/?results=3"; // site that doesnt send Access-Control

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://api.randomuser.me/?results=3
            .then(response => response.json())
            .then(json => json)
            .then(json => {

                this.state.users = this.state.users.concat(json.results);

                this.setState({
                    users: this.state.users,
                }, function () {

                });
            })
    }


    /* Удаление пользователя */
    onDeleteUser(event) {

        for (let i = this.state.users.length - 1; i >= 0; --i) {
            if (this.state.users[i].login.salt == event.target.id) {
                this.state.users.splice(i,1);
                break;
            }
        }

        this.setState({
            users: this.state.users,
        }, function () {

        })

    }

    /* Добавление нового пользователя */
    handleSubmit(event) {

        event.preventDefault();
        const familia = event.target[0].value;
        const name = event.target[1].value;
        const prof = event.target[2].value;
        const company = event.target[3].value;
        const img = this.state.uploaded_image;
        const link = event.target[6].value;
        const element = event.target;

        let newUser = {
            name : {
                first : familia,
                last : name
            },
            picture : {
                large : img
            },
            email : link,
            login : {
                username : prof,
                salt : company
            }
        };

        this.state.users.push(newUser);

        let speakersPos = parseInt($('#speakers').offset().top);

        $('html, body').animate({
            scrollTop: speakersPos
        }, 2000);

        this.setState({
            users : this.state.users,
            infoShowed : true,
            value : "",
        }, function () {
            element.reset();
            $('#showMessage').fadeIn(1000, function () {
                setTimeout(function(){
                    $('#showMessage').slideUp(500);
                }, 3000);
            });
        }, 200);

    }


    componentDidMount(){
        const self = this;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://api.randomuser.me/?results=3"; // site that doesnt send Access-Control

        fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://api.randomuser.me/?results=3
            .then(response => response.json())
            .then(json => json)
            .then(json => {
                this.setState({
                    users : json.results
                }, function () {

                });
            })
            .catch(() => console.log("Cant access " + url + " response. Blocked by browser?"));


        $("#FormInputImage").on("change", function () {

            let inputValue = event.target.value;

            const file = this.files[0];

            /*debugger*/
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                console.log(this);
                self.setState({
                    uploaded_image : this.result,
                    value : inputValue
                });
            });
            reader.readAsDataURL(file);
        })
    }

    render() {

        return (
            <React.Fragment>

            <div className="header" id="header">
                <div className="container">
                    <nav className="navbar navbar-expand-md pb-0 navbar-light">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo03">
                                <ul className="navbar-nav">
                                    <li className={this.state.current_link == '#festival' ? 'nav-item active' : 'nav-item'}>
                                        <a className={this.state.current_link == '#festival' ? 'nav-link active' : 'nav-link'} data-scroll="#festival" href="#" onClick={this.onChangeLink}>О Фестивале</a>
                                    </li>
                                    <li className={this.state.current_link == '#speakers' ? 'nav-item active' : 'nav-item'}>
                                        <a className={this.state.current_link == '#speakers' ? 'nav-link active' : 'nav-link'} data-scroll="#speakers" href="#" onClick={this.onChangeLink}>Спикеры и жюри</a>
                                    </li>
                                    <li className={this.state.current_link == '#participants' ? 'nav-item active' : 'nav-item'}>
                                        <a className={this.state.current_link == '#participants' ? 'nav-link active' : 'nav-link'} data-scroll="#participants" href="#" onClick={this.onChangeLink}>Участникам</a>
                                    </li>
                                    <li className={this.state.current_link == '#contacts' ? 'nav-item active' : 'nav-item'}>
                                        <a className={this.state.current_link == '#contacts' ? 'nav-link active' : 'nav-link'} data-scroll="#contacts" href="#" onClick={this.onChangeLink}>Контакты</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </nav>
                </div>

            </div>

            <div className="festival" id="festival">
                <div className="container">
                    <div className="festival__items d-flex justify-content-around align-items-center">
                        <div className="festival__item">
                            <a className="item__img">
                                <img className={this.state.current_tab == "philosophy" ? "festival__img active" : "festival__img"}
                                     src ={this.state.current_tab == "philosophy" ? "./assets/img/festival/philosophy_yellow.png" : "./assets/img/festival/philosophy.png"} id="philosophy" alt=""
                                     onClick={this.onChangeTab} />
                            </a>
                            <div className={this.state.current_tab == "philosophy" ? "item__title active" : "item__title"}>Философия</div>
                        </div>
                        <div className="festival__item" >
                            <a className="item__img">
                                <img className={this.state.current_tab == "idea" ? "festival__img active" : "festival__img"}
                                     src={this.state.current_tab == "idea" ? "./assets/img/festival/idea_yellow.png" : "./assets/img/festival/idea.png"} id="idea" alt="" onClick={this.onChangeTab} />
                            </a>
                            <div className={this.state.current_tab == "idea" ? "item__title active" : "item__title"}>Идея</div>
                        </div>
                        <div className="festival__item">
                            <a className="item__img">
                                <img className={this.state.current_tab == "goals" ? "festival__img active" : "festival__img"}
                                     src={this.state.current_tab == "goals" ? "./assets/img/festival/goals_yellow.png" : "./assets/img/festival/goals.png"} id="goals" alt="" onClick={this.onChangeTab} />
                            </a>
                            <div className={this.state.current_tab == "goals" ? "item__title active" : "item__title"}>Цели</div>
                        </div>
                    </div>

                    {this.state.current_tab == "philosophy" ? <div className="festival__text">
                        On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.
                    </div> : null}

                    {this.state.current_tab == "idea" ? <div className="festival__text">
                        Фестиваль <span className="color__text">“Да Ёж”</span> версии 2.0 - это история о том, как технологии встречаются с креативом, и в этот момент рождается инновация. <br /> <span className="color__text">“Да Ёж”</span> - это выставка конкрусных работ, открытые лекции и мастер-классы ведущих специалистов в области рекламы и маркетинга, трансляция роликов-победителей "Каннских львов" и "Ночь пожирателей рекламы". <br /> <span className="color__text">“Да Ёж”</span> - это 15 номинаций в трех категориях: "Классическая реклама", "Дизайн", "Digital реклама". <br /> <span className="color__text">“Да Ёж”</span> - это 20 креативных директоров и арт-директоров, основателей креативных агенств и порталов в одном месте одномоментно. <br /> <span className="color__text">“Да Ёж”</span> - это тот творческий интенсив, который дает мощный толчок к качественным изменениям.
                    </div> : null}

                    {this.state.current_tab == "goals" ? <div className="festival__text">
                        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
                    </div> : null}

                </div>
            </div>

            <div className="speakers" id="speakers">
                <div className="container">
                    <div className="speakers__inner">
                        <div className="speakers__title">Спикеры и жюри</div>
                        <div className={this.state.infoShowed == false ? "showMessage black-block hidden" :
                            "showMessage black-block"} id="showMessage">
                            <div className="caps h2">Пользователь успешно добавлен</div>
                        </div>
                        <div className="speakers__items d-flex justify-content-center">
                            <div className="card-columns">

                                {this.state.users.map((user, index)=>
                                    <div className="card w-lg-50" key={index}>
                                        <div href="" className="close" id={user.login.salt} onClick={this.onDeleteUser}></div>
                                        <img src={user.picture.large} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{user.name.first} {user.name.last}</h5>
                                            <p className="card-text text-center">{user.login.username} {user.login.salt}</p>
                                        </div>
                                        <div className="card-footer">
                                            <a href="#" className="speakers__link">{user.email}</a>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="buttons d-flex justify-content-around">
                        <button type="button" className="col-lg-6 col-md-6 mr-3 btn" onClick={this.onClickButton}>
                            <img src="./assets/img/show_more_button.png" alt="" className="show__btn"/>
                            <span className="btn__title">Показать еще</span>
                        </button>

                        <button className="col-lg-6 col-md-6 btn" data-scroll="#form_title" onClick={this.onChangeLink}>Добавить спикера</button>

                    </div>
                </div>
            </div>

            <div className="participants" id="participants">
                <div className="container">
                    <div className="participant__inner">
                        <div className="participant__title">Участникам</div>
                        <form method="post" onSubmit={this.handleSubmit}>
                        <div className="row justify-content-around">
                            <div className="col-lg-6 col-md-6 col-sm-6 nominations">
                                <div className="nomination__title">Номинации</div>
                                <ul className="nomination__list">
                                    <span className="ul__name">Классическая реклама:</span>
                                    <li >
                                        <span data-toggle="tooltip" data-placement="right" title="&#63; Это рекламная компания">
                                            Рекламная компания</span>
                                    </li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Видео">Видео</span>
                                    </li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Радио">Радио</span>
                                    </li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Outdoor-реклама">Outdoor-реклама</span>
                                    </li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Пресса">Пресса</span>
                                    </li>
                                    <li>Nonstandart</li>
                                </ul>
                                <ul className="nomination__list">
                                    <span className="ul__name">Дизайн:</span>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Фирменный стиль">Фирменный стиль</span>
                                    </li>
                                    <li>Упаковка</li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Описание: Дизайн, представленный в виде сайта,
                                         мобильного приложения иди другого интерактивного носителя">Интерактивный дизайн</span>
                                    </li>
                                </ul>
                                <ul className="nomination__list">
                                    <span className="ul__name">Digital-реклама:</span>
                                    <li>Сайт</li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Мобильное приложение">Мобильное приложение</span>
                                    </li>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Социальные медиа">Социальные медиа</span>
                                    </li>
                                    <li>Digital out of home</li>
                                </ul>
                                <ul className="nomination__list">
                                    <span className="ul__name">Спец.номинация от ИКРЫ:</span>
                                    <li>
                                        <span data-toggle="tooltip" data-placement="right" title="Самая полезная реклама">
                                            Самая полезная реклама</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-6 speakers__add__form d-flex flex-column">
                                <div className="speakers__add__title" id="form_title">Добавить спикера</div>
                                    <input className="form-control mt-3" type="text" placeholder="Фамилия" name="fio" required
                                           data-trigger="manual" data-toggle="tooltip" data-placement="right"
                                           title="Фамилия может содержать только буквы!" onChange={this.validateText} />

                                    <input className="form-control" type="text" placeholder="Имя" name="name" required
                                           data-trigger="manual" data-toggle="tooltip" data-placement="right"
                                           title="Имя может содержать только буквы!" onChange={this.validateText} />

                                    <input className="form-control" type="text" placeholder="Должность" name="prof" required
                                           data-trigger="manual" data-toggle="tooltip" data-placement="right"
                                           title="Должность может содержать только буквы!" onChange={this.validateText} />

                                    <input className="form-control" type="text" placeholder="Компания" name="company" required
                                           data-trigger="manual" data-toggle="tooltip" data-placement="right"
                                           title="Название компании может содержать только буквы!" onChange={this.validateText} />

                                    <div className="d-flex justify-content-between">
                                        <input type="text" className="file-form form-control bg-white"
                                               placeholder="Прикрепите фото" name="Прикрепить фото"
                                               readOnly value={this.state.value} onClick={this.chooseFile} />

                                        <input type="file" accept="image/jpg,image/png" className="file-form form-control hidden"
                                               id="FormInputImage" placeholder="Прикрепите фото" />

                                        <div className="clip__item d-flex justify-content-center align-items-center">
                                            <svg className="clip__icon" data-toggle="tooltip" data-placement="right" title="Формат файлов: 1.JPG
                                             2.PNG">
                                                <use xlinkHref="#paper"></use>
                                            </svg>
                                        </div>
                                    </div>

                                    <input className="form-control" placeholder="Укажите ссылку на сайт" name="url" required data-trigger="manual" data-toggle="tooltip" data-placement="right" title="Ссылка должна начинаться с http:// или https:// или www." onChange={this.validateText} />

                            </div>
                        </div>

                        <div className="buttons d-flex justify-content-end mt-4">
                            <button type="button" className="col-lg-6 col-md-6 col-sm-6 mr-3 btn btn__detail">
                                <span className="btn__title">Подробнее</span>
                            </button>
                            <button type="submit" className="col-lg-6 col-md-6 col-sm-6 btn btn__detail" >
                                <span className="btn__title">Добавить спикера</span>
                            </button>
                        </div>
                    </form>
                    </div>
                </div>

            </div>

            <div className="contacts" id="contacts">
                <div className="container">
                    <div className="contacts__title">Контакты</div>
                    <div className="social__icons d-flex justify-content-center">
                        <div className="social__item">
                            <a href="https://vk.com/" target="_blank">
                                <svg className="vk__icon">
                                    <use xlinkHref="#vk"></use>
                                </svg>
                            </a>

                        </div>
                        <div className="inst__item">
                            <a href="https://www.instagram.com/" target="_blank">
                                <svg className="instagram__icon">
                                    <use xlinkHref="#instagram"></use>
                                </svg>
                            </a>

                        </div>

                        <div className="social__item">
                            <a href="https://www.facebook.com" target="_blank">
                                <svg className="facebook__icon">
                                    <use xlinkHref="#facebook"></use>
                                </svg>
                            </a>

                        </div>

                    </div>
                    <div className="contacts__tel">8-800-500-05-97</div>
                    <div className="contacts__email pt-3">
                        <a className="email__link" href="mailto:info@test.com">info@test.com</a>
                    </div>
                </div>

            </div>

            <footer className="footer d-flex justify-content-center align-items-center">
                <div className="footer__img mr-2">
                    <img src="../../assets/img/footer__img.png" alt=""/>
                </div>
                <div className="footer__title">Fantasy <span className="footer__sub">Data space </span> <br/>Technology</div>
            </footer>

            </React.Fragment>

        );
    }

}



export default App;
