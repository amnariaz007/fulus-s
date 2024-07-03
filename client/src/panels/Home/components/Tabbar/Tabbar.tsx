import React, {FC, ReactNode} from 'react';
import './Tabbar.css';
import Tab from "../Tab/Tab";

interface TabbarProps {
    children: ReactNode
}

const Tabbar: FC<TabbarProps> = ({ children }) => {
    return (
        <div className="Tabbar--container">
            <div className="Tabbar--content">
                {children}
            </div>
        </div>
    );
};

export default Tabbar;