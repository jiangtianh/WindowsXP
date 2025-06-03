import { useState, useEffect } from 'react';
import SolitaireCard from './SolitaireCard';
import TopCommonMenuBar from '../../util/TopCommonMenuBar';
import './Solitaire.css';

import { getDroppableBackground } from './SolitaireCard';


export const CARD_BACKGROUND_WIDTH = 72;
export const CARD_BACKGROUND_HEIGHT = 100;
export const CARD_GAP = 10;
export const CARD_TABLEAU_OFFSET = 20;
export const CARD_PILE_OFFSET = 0.2;
type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
type CardValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13'; // 1 is Ace, 11 is Jack, 12 is Queen, 13 is King
export interface Card {
    id: string;
    suit: Suit
    value: CardValue;
    faceUp: boolean;
}


const SolitaireContent: React.FC = () => {
    const [deckState, setDeckState] = useState<Card[]>([]); // top-left card deck
    const [wasteState, setWasteState] = useState<Card[]>([]); // Initial empty waste pile
    const [foundationState, setFoundationState] = useState<Card[][]>(Array(4).fill(0).map(() => [])); // Four foundation piles, one for each suit
    const [tableauState, setTableauState] = useState<Card[][]>(Array(7).fill(0).map(() => [])); // Seven tableau piles, each can hold multiple cards

    const [dragSource, setDragSource] = useState<{ type: 'tableau' | 'waste' | 'foundation', pileIndex: number, cardIndex: number } | null>(null);

    const [draggedStack, setDraggedStack] = useState<{
        pileIndex: number;
        startIndex: number;
        offset: { x: number, y: number };
    } | null>(null);


    const handleDragStart = (type: 'tableau' | 'waste' | 'foundation', pileIndex: number, cardIndex: number) => {
        setDragSource({ type, pileIndex, cardIndex });
        if (type === 'tableau' && tableauState[pileIndex][cardIndex].faceUp) {
            setDraggedStack({
                pileIndex,
                startIndex: cardIndex,
                offset: { x: 0, y: 0 }
            })
        }
    };
    const handleDrag = (deltaX: number, deltaY: number) => {
        if (draggedStack) {
            setDraggedStack(prev => ({
                ...prev!,
                offset: { x: deltaX, y: deltaY }
            }));
        }
    };

    const isValidMove = (source: { type: string, pileIndex: number, cardIndex: number }, target: { type: string, pileIndex: number }) => {
        if (!dragSource) return false;
        let sourceCard: Card | null = null;
        if (source.type === 'tableau') {
            sourceCard = tableauState[source.pileIndex][source.cardIndex];
        } else if (source.type === 'waste') {
            sourceCard = wasteState[wasteState.length - 1];
        } else if (source.type === 'foundation') {
            const foundationPile = foundationState[source.pileIndex];
            sourceCard = foundationPile[foundationPile.length - 1];
        }

        if (!sourceCard) return false;

        if (target.type === 'tableau') {
            const targetPile = tableauState[target.pileIndex];
            if (targetPile.length === 0) {
                // Empty tableau piles can only accept Kings
                return sourceCard.value === '13';
            }
            const topCard = targetPile[targetPile.length - 1];
            // For tableau: alternating colors, descending values
            const isAlternatingColor =
                ((sourceCard.suit === 'Hearts' || sourceCard.suit === 'Diamonds') &&
                    (topCard.suit === 'Clubs' || topCard.suit === 'Spades')) ||
                ((sourceCard.suit === 'Clubs' || sourceCard.suit === 'Spades') &&
                    (topCard.suit === 'Hearts' || topCard.suit === 'Diamonds'));
            return isAlternatingColor && parseInt(sourceCard.value) === parseInt(topCard.value) - 1;
        } else if (target.type === 'foundation') {
            const targetPile = foundationState[target.pileIndex];
            if (targetPile.length === 0) {
                // Empty foundation piles can only accept Aces
                return sourceCard.value === '1';
            }
            const topCard = targetPile[targetPile.length - 1];
            // For foundation: same suit, ascending values
            return sourceCard.suit === topCard.suit &&
                parseInt(sourceCard.value) === parseInt(topCard.value) + 1;
        }
        return false;
    };

    const handleDragEnd = (mouseEvent: React.MouseEvent) => {
        if (!dragSource) return;
        const dropTarget = determineDropTarget(mouseEvent.clientX, mouseEvent.clientY);
        if (dropTarget && isValidMove(dragSource, dropTarget)) {
            moveCards(dragSource, dropTarget);
        }

        setDragSource(null);
        setDraggedStack(null);
    };

    const determineDropTarget = (clientX: number, clientY: number) => {
        const containerElement = document.querySelector('.solitaire-container');
        if (!containerElement) return null;

        const containerRect = containerElement.getBoundingClientRect();
        const x = clientX - containerRect.left;
        const y = clientY - containerRect.top;

        // Check foundation piles
        const foundationStartX = 3 * (CARD_GAP + CARD_BACKGROUND_WIDTH);
        for (let i = 0; i < 4; i++) {
            const pileX = foundationStartX + (i * (CARD_BACKGROUND_WIDTH + CARD_GAP));
            if (x >= pileX && x < pileX + CARD_BACKGROUND_WIDTH &&
                y >= 0 && y < CARD_BACKGROUND_HEIGHT) {
                return { type: 'foundation', pileIndex: i };
            }
        }

        // Check tableau piles
        const tableauY = CARD_GAP + CARD_BACKGROUND_HEIGHT;
        for (let i = 0; i < 7; i++) {
            const pileX = i * (CARD_BACKGROUND_WIDTH + CARD_GAP);
            const pile = tableauState[i];
            const pileHeight = pile.length > 0 ?
                CARD_BACKGROUND_HEIGHT + (pile.length - 1) * CARD_TABLEAU_OFFSET :
                CARD_BACKGROUND_HEIGHT;

            if (x >= pileX && x < pileX + CARD_BACKGROUND_WIDTH &&
                y >= tableauY && y < tableauY + pileHeight) {
                return { type: 'tableau', pileIndex: i };
            }
        }

        return null;
    };

    const moveCards = (source: { type: string, pileIndex: number, cardIndex: number }, target: { type: string, pileIndex: number }) => {
        if (source.type === target.type && source.pileIndex === target.pileIndex) {
            return; // No move needed
        }

        if (source.type === 'tableau' && target.type === 'tableau') {
            const newTableauState = [...tableauState];
            const sourcePile = [...newTableauState[source.pileIndex]];
            const targetPile = [...newTableauState[target.pileIndex]];

            // Get the cards to move (could be a stack)
            const cardsToMove = sourcePile.splice(source.cardIndex);

            // Add to target pile
            targetPile.push(...cardsToMove);

            // If there are cards left in the source pile and the top one is face down, flip it
            if (sourcePile.length > 0 && !sourcePile[sourcePile.length - 1].faceUp) {
                sourcePile[sourcePile.length - 1].faceUp = true;
            }

            newTableauState[source.pileIndex] = sourcePile;
            newTableauState[target.pileIndex] = targetPile;
            setTableauState(newTableauState);
        }

        else if (source.type === 'waste' && target.type === 'tableau') {
            if (wasteState.length === 0) return;

            const newWasteState = [...wasteState];
            const cardToMove = newWasteState.pop()!;

            const newTableauState = [...tableauState];
            newTableauState[target.pileIndex] = [...newTableauState[target.pileIndex], cardToMove];

            setWasteState(newWasteState);
            setTableauState(newTableauState);
        }

        else if (source.type === 'foundation' && target.type === 'tableau') {
            const newFoundationState = [...foundationState];
            const sourcePile = newFoundationState[source.pileIndex];

            if (sourcePile.length === 0) return;

            const cardToMove = sourcePile.pop()!;

            const newTableauState = [...tableauState];
            newTableauState[target.pileIndex] = [...newTableauState[target.pileIndex], cardToMove];

            setFoundationState(newFoundationState);
            setTableauState(newTableauState);
        }

        else if (source.type === 'tableau' && target.type === 'foundation') {
            const newTableauState = [...tableauState];
            const sourcePile = newTableauState[source.pileIndex];

            // Can only move the last card to foundation
            if (source.cardIndex !== sourcePile.length - 1) return;

            const cardToMove = sourcePile.pop()!;

            // Flip the new top card if it's face down
            if (sourcePile.length > 0 && !sourcePile[sourcePile.length - 1].faceUp) {
                sourcePile[sourcePile.length - 1].faceUp = true;
            }

            const newFoundationState = [...foundationState];
            newFoundationState[target.pileIndex] = [...newFoundationState[target.pileIndex], cardToMove];

            setTableauState(newTableauState);
            setFoundationState(newFoundationState);

        }

        else if (source.type === 'waste' && target.type === 'foundation') {
            if (wasteState.length === 0) return;

            const newWasteState = [...wasteState];
            const cardToMove = newWasteState.pop()!;

            const newFoundationState = [...foundationState];
            newFoundationState[target.pileIndex] = [...newFoundationState[target.pileIndex], cardToMove];

            setWasteState(newWasteState);
            setFoundationState(newFoundationState);
        }

        else if (source.type === 'foundation' && target.type === 'foundation') {
            const newFoundationState = [...foundationState];
            const sourcePile = newFoundationState[source.pileIndex];

            if (sourcePile.length === 0) return;

            const cardToMove = sourcePile.pop()!;
            newFoundationState[target.pileIndex] = [...newFoundationState[target.pileIndex], cardToMove];

            setFoundationState(newFoundationState);
        }

        checkWinCondition();
    };

    const checkWinCondition = () => {
        const totalFoundationCards = foundationState.reduce((total, pile) => total + pile.length, 0);
        if (totalFoundationCards === 52) {
            console.log('You win!');
        }
    }

    const handleDeckClick = () => {
        if (deckState.length === 0) {
            setDeckState([...wasteState.reverse().map(card => ({ ...card, faceUp: false }))]);
            setWasteState([]);
        } else {
            const newDeckState = [...deckState];
            const newWasteState = [...wasteState];
            const drawnCard = newDeckState.pop();
            if (drawnCard) {
                drawnCard.faceUp = true;
                newWasteState.push(drawnCard);
            }
            setDeckState(newDeckState);
            setWasteState(newWasteState);
        }
    }

    const initializeGame = () => {
        const initialDeck = getInitialDeck();
        const { tableau, remainingDeck } = dealCards(initialDeck);
        setDeckState(remainingDeck);
        setTableauState(tableau);
    };

    useEffect(() => {
        initializeGame();
    }, []);


    return (
        <div className="flex flex-col h-full w-full overflow-hidden ">
            <TopCommonMenuBar items={['Game', 'Help']} showWindowsBadge={false} />
            <div className="solitaire-container bg-[#0a8] h-full p-4">
                <div className="relative block h-full">
                    <div
                        className="absolute border-1 rounded-sm"
                        style={{
                            width: CARD_BACKGROUND_WIDTH + deckState.length * CARD_PILE_OFFSET,
                            height: CARD_BACKGROUND_HEIGHT + deckState.length * CARD_PILE_OFFSET,
                            zIndex: 1000,
                            border: deckState.length === 0 ? '1px dotted white' : 'none'
                        }}
                        onClick={handleDeckClick}
                    />
                    {deckState.map((card, index) => (
                        <SolitaireCard
                            key={card.id}
                            card={card}
                            pileType='deck'
                            pileIndex={0}
                            cardIndex={index}
                            isDraggable={false}
                        />
                    ))}


                    {wasteState.map((card, index) => (
                        <SolitaireCard
                            key={card.id}
                            card={card}
                            pileType='waste'
                            pileIndex={0}
                            cardIndex={index}
                            isDraggable={index === wasteState.length - 1} // Only the top card in the waste is draggable
                            isBeingDragged={dragSource?.type === 'waste' && dragSource.cardIndex === index}
                            onDragStart={() => handleDragStart('waste', 0, index)}
                            onDragEnd={(x, y, event) => handleDragEnd(event)}
                        />
                    ))}

                    {foundationState.map((pile, pileIndex) =>
                        pile.map((card, cardIndex) => (
                            <SolitaireCard
                                key={card.id}
                                card={card}
                                pileType='foundation'
                                pileIndex={pileIndex}
                                cardIndex={cardIndex}
                                isDraggable={cardIndex === pile.length - 1} // Only the top card is draggable
                                onDragStart={() => handleDragStart('foundation', pileIndex, cardIndex)}
                                onDrag={(deltaX, deltaY) => handleDrag(deltaX, deltaY)}
                                onDragEnd={(x, y, event) => handleDragEnd(event)}
                            />
                        ))
                    )}



                    {tableauState.map((pile, pileIndex) =>
                        pile.map((card, cardIndex) => {
                            const isPartOfDraggedStack =
                                draggedStack?.pileIndex === pileIndex &&
                                cardIndex >= draggedStack.startIndex;

                            return (
                                <SolitaireCard
                                    key={card.id}
                                    card={card}
                                    pileType='tableau'
                                    pileIndex={pileIndex}
                                    cardIndex={cardIndex}
                                    isDraggable={card.faceUp}
                                    isBeingDragged={isPartOfDraggedStack}
                                    stackDragOffset={isPartOfDraggedStack ? draggedStack.offset : undefined}
                                    onDragStart={() => handleDragStart('tableau', pileIndex, cardIndex)}
                                    onDrag={(deltaX, deltaY) => handleDrag(deltaX, deltaY)} // Add this line
                                    onDragEnd={(x, y, event) => handleDragEnd(event)}
                                />
                            );
                        })
                    )}



                    {[0, 1, 2, 3].map((pileIndex) => {
                        const foundationStartX = 3 * (CARD_GAP + CARD_BACKGROUND_WIDTH);
                        return (
                            <div
                                key={`foundation-placeholder-${pileIndex}`}
                                className="absolute rounded-sm"
                                style={{
                                    ...getDroppableBackground(),
                                    left: foundationStartX + (pileIndex * (CARD_BACKGROUND_WIDTH + CARD_GAP)),
                                    top: 0,
                                }}
                            />
                        );
                    })}
                    {[0, 1, 2, 3, 4, 5, 6].map((pileIndex) => (
                        <div
                            key={`tableau-placeholder-${pileIndex}`}
                            className="absolute rounded-sm"
                            style={{
                                ...getDroppableBackground(),
                                left: pileIndex * (CARD_BACKGROUND_WIDTH + CARD_GAP),
                                top: CARD_GAP + CARD_BACKGROUND_HEIGHT,
                            }}
                        />
                    ))}

                </div>
            </div>
        </div >
    );
};

export default SolitaireContent;



const getInitialDeck = (): Card[] => {
    const suits: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values: CardValue[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']; // 1 is Ace, 11 is Jack, 12 is Queen, 13 is King
    const deck: Card[] = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ id: `${suit}-${value}`, suit, value, faceUp: false });
        }
    }
    // Shuffle the deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

const dealCards = (deck: Card[]) => {
    const tableau: Card[][] = Array(7).fill([]).map(() => []);
    let deckIndex = 0;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j <= i; j++) {
            tableau[i].push(deck[deckIndex]);
            deckIndex++;
        }
        tableau[i][i].faceUp = true;
    }
    return { tableau, remainingDeck: deck.slice(deckIndex) };
};

