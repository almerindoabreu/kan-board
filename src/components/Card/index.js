import React, { useRef, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import BoardContext from '../Board/context';

import * as S from './styled'

const Card = ({ data, index, listIndex }) => {
    const ref = useRef();
    const { move } = useContext(BoardContext);

    const [{ isDragging }, dragRef] = useDrag({
        item: { type: 'CARD', index, listIndex},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    })

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor){
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            const draggedIndex = item.index;
            const targetIndex = index;

            // do nothing, if grabbed card stays in the same index list and same card index.
            if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;

            const draggedOffset = monitor.getClientOffset();
            const draggedTop = draggedOffset.y - targetSize.top;

            // do nothing, if grabbed card is dropped in the same place.
            if ((draggedIndex < targetIndex && draggedTop < targetCenter)  || 
                (draggedIndex > targetIndex && draggedTop > targetCenter)){
                return;
            }

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

            item.index = targetIndex;
            item.listIndex = targetListIndex;
        }
    })

   dragRef(dropRef(ref));

    return (
        <>
        <S.CardContainer ref={ref} isDragging={isDragging}>
            <S.CardHeader>
                {data.labels.map(label => <S.CardLabel key={label} color={label} />)}
            </S.CardHeader>
            <S.CardDescription>
                {data.content}
            </S.CardDescription>
            { data.user && <img src={data.user} alt=""/> }
        </S.CardContainer>
        </>
    );
}

export default Card;