import React from 'react';

const Nav = React.forwardRef(({...props}, ref) => (
            <span {...props} ref={ref}/>
))

const WebIdeNav = props => {

    return (
        <div className='web-ide-nav'>
            <Nav>
                WebIdeNav
            </Nav>
        </div>
    )
}

export default WebIdeNav
