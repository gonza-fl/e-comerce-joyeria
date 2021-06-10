import React from 'react';
import styled from 'styled-components';
import { GoPrimitiveDot } from 'react-icons/go';

function NewsFlyer({images}) {
    const [flyer, setFlyer] = React.useState(0);

    setTimeout(function (){
        if(flyer === images.length-1){
            setFlyer(0);
        } else {
            setFlyer(flyer+1);
        }        
    }, 3000)

    function dots(index){
        if(flyer === index){
            return {color: 'white'};
        }        
    };

    function onClickIndex(index){
        setFlyer(index);
    }

    return (
        <div>
            {images.map((img,i)=><GoPrimitiveDot style={dots(i)} onClick={(i)=>onClickIndex(i)}/>)}
            {images
            .filter((img,i)=>i===flyer)
            .map(img=><StyledImg key={img} src={img} alt="Image not found" width='900px' height='500px'/>)}
        </div>
    );
}

const StyledImg = styled.img`
        display: block;
        box-shadow: 0px 0px 15px 2px rgb(102, 102, 102) ;
        animation: transitionIn 600ms;
        opacity: 0.8;

        &:hover {
            cursor: pointer;
            transform: Scale(1.02);
            transition: transform 300ms;
            opacity: 1;
        }

        @keyframes transitionIn {
            from {
                opacity: 0;
                transform: rotateX(-10deg);
            }

            to {
                opacity: 0.8;
                transform: rotateX(0);
            }
        }
`
export default NewsFlyer;