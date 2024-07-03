import React, {FC} from 'react';
import {Image} from "@nextui-org/react";
import {ImageProps} from "@nextui-org/image/dist/image";

interface ImgProps {
    radius?: number
}

const Img: FC<ImgProps & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (props) => {
    return (
        <img
            {...props}
            alt=""
            style={{ borderRadius: props.radius ?? 16, ...props.style }}
        />
    );
};

export default Img;