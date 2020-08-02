import React from 'react'

import * as S from './styled'

import Card from '../Card'

const List = ({ data, index: listIndex }) => {
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
        </S.ListContainer>
    );
}

export default List;