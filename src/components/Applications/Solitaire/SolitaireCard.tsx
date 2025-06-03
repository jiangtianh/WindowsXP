import React, { useState, useRef } from 'react';
import type { Card } from "./SolitaireContent";
import { Rnd } from 'react-rnd';
import cardSpirit from "@assets/cards.gif";

import { CARD_BACKGROUND_HEIGHT, CARD_BACKGROUND_WIDTH, CARD_GAP, CARD_TABLEAU_OFFSET, CARD_PILE_OFFSET } from './SolitaireContent';

interface SolitaireCardProps {
    card: Card;
    pileType: 'tableau' | 'foundation' | 'deck' | 'waste';
    pileIndex: number;
    cardIndex: number;
    isDraggable?: boolean;
    isBeingDragged?: boolean;
    stackDragOffset?: { x: number, y: number };
    onDragStart?: () => void;
    onDragEnd?: (x: number, y: number, event: React.MouseEvent) => void;
    onDrag?: (deltaX: number, deltaY: number) => void;
}

const getCardBackground = (card: Card) => {
    let row = 0;
    let col = 0;

    if (!card.faceUp) {
        row = 4;
        col = 1;
    } else {
        if (card.suit === 'Hearts') row = 0;
        else if (card.suit === 'Diamonds') row = 1;
        else if (card.suit === 'Clubs') row = 2;
        else if (card.suit === 'Spades') row = 3;

        col = parseInt(card.value) - 1;
    }
    return {
        backgroundImage: `url(${cardSpirit})`,
        backgroundPosition: `-${col * CARD_BACKGROUND_WIDTH}px -${row * CARD_BACKGROUND_HEIGHT}px`,
        backgroundSize: '936px 500px', // 13 columns, 5 rows
        width: `${CARD_BACKGROUND_WIDTH}px`,
        height: `${CARD_BACKGROUND_HEIGHT}px`,
    };
};

export const getDroppableBackground = () => {
    return {
        backgroundImage: `url(${cardSpirit})`,
        backgroundPosition: `-504px -400px`,
        backgroundSize: '936px 500px', // 13 columns, 5 rows
        width: `${CARD_BACKGROUND_WIDTH}px`,
        height: `${CARD_BACKGROUND_HEIGHT}px`,
    }
}

const SolitaireCard: React.FC<SolitaireCardProps> = ({
    card,
    pileType,
    pileIndex,
    cardIndex,
    isDraggable = true,
    isBeingDragged = false,
    stackDragOffset = { x: 0, y: 0 },
    onDragStart,
    onDragEnd,
    onDrag,
}) => {
    const [dragStartPos, setDragStartPos] = useState<{ x: number, y: number } | null>(null);

    const calculatePosition = () => {
        const deckPosition = { x: (cardIndex * CARD_PILE_OFFSET), y: (cardIndex * CARD_PILE_OFFSET) };
        const wastPosition = { x: CARD_GAP + CARD_BACKGROUND_WIDTH + (cardIndex * CARD_PILE_OFFSET), y: (cardIndex * CARD_PILE_OFFSET) };
        const foundationStartX = 3 * (CARD_GAP + CARD_BACKGROUND_WIDTH);
        const tableauStartY = CARD_GAP + CARD_BACKGROUND_HEIGHT;

        switch (pileType) {
            case 'deck':
                return deckPosition;
            case 'waste':
                return wastPosition;
            case 'foundation':
                return {
                    x: foundationStartX + (pileIndex * (CARD_BACKGROUND_WIDTH + CARD_GAP)),
                    y: 0,
                }
            case 'tableau':
                return {
                    x: (pileIndex * (CARD_BACKGROUND_WIDTH + CARD_GAP)),
                    y: tableauStartY + (cardIndex * CARD_TABLEAU_OFFSET),
                }
            default:
                return { x: 0, y: 0 };
        }
    };
    const basePosition = calculatePosition();

    const position = stackDragOffset
        ? { x: basePosition.x + stackDragOffset.x, y: basePosition.y + stackDragOffset.y }
        : basePosition;

    const calculateZIndex = () => {
        let baseZ = 0;
        switch (pileType) {
            case 'deck': baseZ = 100; break;
            case 'waste': baseZ = 200; break;
            case 'foundation': baseZ = 300 + pileIndex; break;
            case 'tableau': baseZ = 400 + pileIndex; break;
        }
        return baseZ + cardIndex + (isBeingDragged ? 1000 : 0);
    };

    return (
        <Rnd
            size={{ width: CARD_BACKGROUND_WIDTH, height: CARD_BACKGROUND_HEIGHT }}
            enableResizing={false}
            bounds=".solitaire-container"
            position={position}
            disableDragging={!isDraggable || !card.faceUp}
            style={{
                zIndex: calculateZIndex(),
                position: 'absolute',
            }}
            onDragStart={(e) => {
                // Handle both mouse and touch events
                const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
                const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

                setDragStartPos({
                    x: clientX,
                    y: clientY
                });
                if (onDragStart) onDragStart();
            }}
            onDrag={(e, d) => {
                if (dragStartPos && onDrag) {
                    // Handle both mouse and touch events
                    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
                    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

                    const deltaX = clientX - dragStartPos.x;
                    const deltaY = clientY - dragStartPos.y;
                    onDrag(deltaX, deltaY);
                }
            }}
            onDragStop={(e, d) => {
                setDragStartPos(null);

                // For onDragEnd, we need to check if it's a touch event and handle accordingly
                if (onDragEnd) {
                    // If it's a touch event, we need to get the position from the last touch
                    if ('changedTouches' in e && e.changedTouches.length > 0) {
                        onDragEnd(d.x, d.y, {
                            clientX: e.changedTouches[0].clientX,
                            clientY: e.changedTouches[0].clientY
                        } as unknown as React.MouseEvent);
                    } else {
                        // It's a mouse event
                        onDragEnd(d.x, d.y, e as React.MouseEvent);
                    }
                }
            }}
        >
            <div
                className="cursor-pointer"
                style={getCardBackground(card)}
            />
        </Rnd>
    )
};
export default SolitaireCard;