import React, { Component } from 'react';
import Link from 'next/link';

import Router from 'next/router'

class MenuDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPathName: null
        }
    }
    componentDidMount() {
        // if( this.state.currentPathName === null ) return;
        this.setState({
             currentPathName: Router.router.pathname.split('/')[1]
         });
     }
                // menuData.subMenu ? 'menu-item-has-children dropdown' : ''

     render() {
        const { menuData } = this.props;
        let addclass = '';

        if(menuData.subMenu && menuData.url !== '' && this.state.currentPathName !== null)
             if( 'home'=== this.state.currentPathName )
                    addclass = 'active'
        return (
            <li className={`                     ${menuData.subMenu
                        ? 'menu-item-has-children dropdown'
                        : ''
                    } ${this.state.currentPathName === '/' 
                        ? 'active '
                        : ''    
                    } ${addclass}
                `}>
               {/* <Link href={menuData.url} as={menuData.url}>
                    <a>{menuData.text}</a>
                </Link>*/}
                {menuData.type === 'dynamic' ? (
                    <Link href={`${menuData.url}/[pid]`} as={`${menuData.url}/${menuData.endPoint}`}>
                        <a>{menuData.text}</a>
                    </Link>
                ) : (
                    <Link href={menuData.url} as={menuData.alias}>
                        <a>{menuData.text}</a>
                    </Link>
                )}
                {menuData.subMenu ? (
                    <ul className={menuData.subClass}>
                        {menuData.subMenu.map((subMenuItem, index) => (
                            <MenuDropdown menuData={subMenuItem} key={index} />
                        ))}
                    </ul>
                ) : (
                    ''
                )}
            </li>
        );
    }
}

export default MenuDropdown;
