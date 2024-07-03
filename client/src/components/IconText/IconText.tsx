import React, {FC, ReactNode} from 'react';
import './IconText.css';
import Img from "../Img/Img";

const SIZES = {
    large: {
        imgSize: 36,
        fontSize: 42,
        fontWeight: 700, // bold
        distance: 16,
    },
    medium: {
        imgSize: 20,
        fontSize: 20,
        fontWeight: 500, // medium
        distance: 12,
    },
    small: {
        imgSize: 16,
        fontSize: 16,
        fontWeight: 400,
        distance: 8,
    },

    special: {
        imgSize: 24,
        fontSize: 18,
        fontWeight: 500,
        distance: 8,
    },

    specialTeam: {
        imgSize: 25,
        fontSize: 24,
        fontWeight: 500,
        distance: 8,
    },

    mediumLevels: {
        imgSize: 26,
        fontSize: 20,
        fontWeight: 400, // medium
        distance: 12,
    },
};

interface IconTextProps {
    size: 'large' | 'medium' | 'small' | 'special' | 'specialTeam' | 'mediumLevels'
    imgPath: string
    text: string
    textColor?: string
    after?: ReactNode
    stretched?: boolean
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const IconText: FC<IconTextProps> = ({ size, imgPath, text, after, onClick, textColor = 'var(--white_color)', stretched = false }) => {
    return (
        <div style={{ width: stretched ? '100%' : 'max-content' }}>
            <div
                className="IconText--content"
                onClick={onClick}
                style={{ cursor: onClick ? 'pointer' : 'auto' }}
            >
                <Img
                    src={imgPath}
                    width={SIZES[size].imgSize}
                    height={SIZES[size].imgSize}
                />

                <p
                    style={{
                        color: textColor,
                        fontSize: SIZES[size].fontSize,
                        fontWeight: SIZES[size].fontWeight,
                        marginLeft: SIZES[size].distance,
                    }}
                >
                    {text}
                </p>

                {after && (
                    <div style={{ marginLeft: SIZES[size].distance }}>
                        {after}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IconText;