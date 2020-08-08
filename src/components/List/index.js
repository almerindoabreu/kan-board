import React, { useRef, useState, useContext } from 'react'
import { useDrop } from 'react-dnd'

import BoardContext from '../Board/context';

import * as S from './styled'

import Card from '../Card'

const List = ({ data, index: listIndex }) => {
    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [, dropRef] = useDrop({
        accept: 'CARD',
        item: { type: 'CARD', listIndex},
        drop(item, monitor){
            const targetListIndex = listIndex;
            const draggedListIndex = item.listIndex;
            const draggedIndex = monitor.getItem().index;

            move(draggedListIndex, targetListIndex, draggedIndex);
  
        }
    })

    dropRef(ref);

    return (
        <S.ListContainer done={data.done}>
            <S.ListHeaderWrapper>
                <S.ListHeaderTitle>{data.title}</S.ListHeaderTitle>
                {data.creatable && (
                <S.ListheaderButton type="button">
                    
                </S.ListheaderButton>
                )}
            </S.ListHeaderWrapper>
            <ul>
                { data.cards.map((card, index) => (
                    <Card 
                        key={card.id}
                        listIndex={listIndex}
                        index={index} 
                        data={card}
                    />
                )) }
            </ul>
            <S.CardWrapper ref={ref}>  
            </S.CardWrapper>
        </S.ListContainer>
    );
}

export default List;