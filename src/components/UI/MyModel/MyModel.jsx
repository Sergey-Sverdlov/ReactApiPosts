import React from 'react';
import classes from './MyModel.module.css'
const MyModel = ({children, visible, setVisible}) => {
    const rootClasses = [classes.myModel]
    if (visible) {
        rootClasses.push(classes.myModel_active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
            <div className={classes.myModelContent} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModel;
