import React, { Component } from 'react';
import { notification } from 'antd';
import { connect } from 'react-redux';

import { changeLanguage } from '../../../../store/setting/action';

import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
  } from 'react-switch-lang';
import en from '../../../../public/static/data/locale/en.json';
import de from '../../../../public/static/data/locale/de.json';
import fr from '../../../../public/static/data/locale/fr.json';

setTranslations({ en, de, fr });
setDefaultLanguage('en');
setLanguageCookie();

class LanguageSwicher extends Component {
    constructor(props) {
        super(props);
    }

    handleFeatureWillUpdate(lang) {
        setLanguage(lang);
        this.props.dispatch(changeLanguage(lang));
    }

    render() {
        const lang_data = {
            text: {
                en: 'English',
                de: 'Germany',
                fr: 'France'
            },
            image: {
                en: '/static/img/flag/en.png',
                de: '/static/img/flag/germany.png',
                fr: '/static/img/flag/fr.png'
            }
        }
        const { t, lang } = this.props;

        return (
            <div className="ps-dropdown language language-contain">
                <a href="#" onClick={ e => e.preventDefault() } style={{color:"white"}}>
                    <img src={lang_data.image[lang]} alt="martfury" className="language-dropdown"/>
                    {lang_data.text[lang]}
                </a>
                <ul className="ps-dropdown-menu">
                    <li>
                        <a 
                            href="#" onClick={this.handleFeatureWillUpdate.bind(this, 'en')}>
                            <img src="/static/img/flag/en.png" alt="martfury" className="language-dropdown"/>
                            English
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={this.handleFeatureWillUpdate.bind(this, 'de')}>
                            <img src="/static/img/flag/germany.png" alt="martfury" className="language-dropdown"/>
                            Germany
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            onClick={this.handleFeatureWillUpdate.bind(this, 'fr')}>
                            <img src="/static/img/flag/fr.png" alt="martfury" className="language-dropdown" />
                            France
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.setting;
};

export default connect(mapStateToProps)(translate(LanguageSwicher));
