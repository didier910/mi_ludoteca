import { memo } from 'react';
import styled from 'styled-components';

export const BurgerButton = memo(({ clicked, handleClick }) => (
    <Burger>
        <button 
            type='button'
            onClick={handleClick} 
            aria-expanded={clicked}
            className={`icon nav-icon-5${clicked ? ' open' : ''}`}
        >
            <span />
            <span />
            <span />
        </button>
    </Burger>
));

const Burger = styled.div`
    .nav-icon-5 {
        width: 35px;
        height: 30px;
        margin: 10px;
        position: relative;
        cursor: pointer;
        display: inline-block;

        span {
            background-color: #fff;
            position: absolute;
            border-radius: 2px;
            width: 100%;
            height: 4px;
            transition: 0.3s cubic-bezier(0.8, 0.5, 0.2, 1.4);
            
            &:nth-child(1) {
                top: 0;
                left: 0;
                transform-origin: center;
            }
            
            &:nth-child(2) {
                top: 13px;
                left: 0;
                opacity: 1;
            }
            
            &:nth-child(3) {
                bottom: 0;
                left: 0;
                transform-origin: center;
            }
        }

        &:not(.open):hover {
            span {
                &:nth-child(1) { transform: rotate(-3deg) scaleY(1.1); }
                &:nth-child(2) { transform: rotate(3deg) scaleY(1.1); }
                &:nth-child(3) { transform: rotate(-4deg) scaleY(1.1); }
            }
        }

        &.open {
            span {
                &:nth-child(1) {
                    transform: rotate(45deg);
                    top: 13px;
                }
                
                &:nth-child(2) {
                    opacity: 0;
                }
                
                &:nth-child(3) {
                    transform: rotate(-45deg);
                    top: 13px;
                }
            }
        }
    }
`;

