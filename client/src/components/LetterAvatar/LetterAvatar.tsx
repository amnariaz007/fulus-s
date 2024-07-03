import React, {FC, ReactNode} from 'react';
import './LetterAvatar.css';

interface LetterAvatarProps {
    width: number
    height: number
    radius?: number | string
    children?: ReactNode
}

const LetterAvatar: FC<LetterAvatarProps> = ({ width, height, children, radius = 16 }) => {
    return (
        <div
            style={{
                width,
                height,
                borderRadius: radius,
            }}
            className="LetterAvatar--container"
        >
            {children}
        </div>
    );
};

export default LetterAvatar;