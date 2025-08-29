import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { resizeWindow } from "../../../services/Windows/windowsSlice";
import type { AppDispatch } from "../../../services/store";
import './Minesweeper.css';

import TopCommonMenuBar from "../../util/TopCommonMenuBar";

interface Cell {
    uncovered: boolean;
    mine: boolean;
    isClickedMine: boolean;
    flagged: boolean;
    questioned: boolean;
    neighborMines: number;
}

interface Difficulty {
    name: string;
    rows: number;
    cols: number;
    mines: number;
}

const difficulties: Difficulty[] = [
    { name: 'Beginner', rows: 9, cols: 9, mines: 10 },
    { name: 'Intermediate', rows: 16, cols: 16, mines: 40 },
    { name: 'Expert', rows: 16, cols: 30, mines: 99 },
    { name: 'Alex Hu', rows: 30, cols: 50, mines: 300 }
]


const digitSrc = (n: number) => `/img/icons/minesweeper/digit${n}.webp`;
const emojiSrc = (emoji: string) => `/img/icons/minesweeper/${emoji}.webp`;



const MinesweeperContent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(difficulties[0]);

    const rows = currentDifficulty.rows;
    const cols = currentDifficulty.cols;
    const mineCount = currentDifficulty.mines;

    const calculateWindowSize = useCallback((rows: number, cols: number) => {
        const cellSize = 20;
        const titleBarHeight = 28;
        const toolbarHeight = 40;
        const menuBarHeight = 24;
        const windowBorder = 3;
        const containerPaddingX = 4;
        const containerPaddingY = 6;
        const containerBoarder = 3;
        const gameBoardBorder = 8;

        const boardWidth = cols * cellSize;
        const boardHeight = rows * cellSize;

        return {
            width: boardWidth + windowBorder * 2 + containerBoarder + containerPaddingX * 2 + gameBoardBorder,
            height: titleBarHeight + menuBarHeight + boardHeight + toolbarHeight + containerPaddingY * 2 + containerBoarder + gameBoardBorder * 2 + windowBorder
        };
    }, [])

    useEffect(() => {
        const { width, height } = calculateWindowSize(rows, cols);
        dispatch(resizeWindow({
            key: 'Minesweeper',
            width,
            height
        }));
    }, [rows, cols, calculateWindowSize, dispatch]);


    const getNeighbors = useCallback((index: number): number[] => {
        const result: number[] = [];
        const row = Math.floor(index / cols);
        const col = index % cols;

        for (let r = row - 1; r <= row + 1; r++) {
            for (let c = col - 1; c <= col + 1; c++) {
                if (r >= 0 && r < rows && c >= 0 && c < cols && (r !== row || c !== col)) {
                    result.push(r * cols + c);
                }
            }
        }
        return result;
    }, [rows, cols]);

    const createCells = useCallback((): Cell[] => {
        const cells: Cell[] = Array(rows * cols).fill(null).map(() => ({
            uncovered: false,
            mine: false,
            isClickedMine: false,
            flagged: false,
            questioned: false,
            neighborMines: 0,
        }));

        const mineIndices = new Set<number>();
        while (mineIndices.size < mineCount) {
            mineIndices.add(Math.floor(Math.random() * rows * cols));
        }
        mineIndices.forEach((index) => {
            cells[index].mine = true;
        });

        cells.forEach((cell, index) => {
            if (cell.mine) return;
            let mineCounter = 0;
            getNeighbors(index).forEach((i) => {
                if (cells[i].mine) mineCounter++;
            });
            cell.neighborMines = mineCounter;
        });

        return cells;
    }, [rows, cols, mineCount, getNeighbors]);



    const [cells, setCells] = useState<Cell[]>(createCells());
    const [emoji, setEmoji] = useState('smile');
    const [gameRunning, setGameRunning] = useState(false);
    const [firstClick, setFirstClick] = useState(true);
    const [minesLeft, setMinesLeft] = useState(mineCount);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);


    useEffect(() => {
        if (gameRunning) {
            timerRef.current = setInterval(() => {
                setTimer((t) => t + 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameRunning]);

    const resetGame = useCallback(() => {
        setGameRunning(false);
        setFirstClick(true);
        setTimer(0);
        setEmoji('smile');
        setMinesLeft(mineCount);
        setCells(createCells());
    }, [mineCount, createCells]);

    useEffect(() => {
        resetGame();
    }, [resetGame]);

    const uncoverCell = (index: number) => {
        const newCells = [...cells];
        const cell = newCells[index];

        if (!gameRunning || cell.uncovered || cell.flagged || cell.questioned) return;

        if (cell.mine) {
            cell.uncovered = true;
            cell.isClickedMine = true;
            revealMines(newCells);
            setEmoji('dead');
            setGameRunning(false);
            setCells(newCells);
            return;
        }

        const floodFill = (i: number) => {
            const c = newCells[i];
            if (c.uncovered || c.flagged || c.questioned) return;
            c.uncovered = true;
            if (c.neighborMines === 0) {
                getNeighbors(i).forEach(floodFill);
            }
        };

        floodFill(index);

        if (checkWin(newCells)) {
            setEmoji('win');
            revealMines(newCells);
            setGameRunning(false);
        }

        setCells(newCells);
    };

    const revealMines = (newCells: Cell[]) => {
        newCells.forEach((cell) => {
            if (cell.mine) cell.uncovered = true;
        });
    };

    const checkWin = (cells: Cell[]) => {
        return cells.every((cell) => cell.mine || cell.uncovered);
    };

    const toggleFlag = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        const newCells = [...cells];
        const cell = newCells[index];
        if (cell.uncovered) return;
        if (!cell.flagged && !cell.questioned) {
            cell.flagged = true;
            setMinesLeft((n) => n - 1);
        } else if (cell.flagged) {
            cell.flagged = false;
            cell.questioned = true;
            setMinesLeft((n) => n + 1);
        } else if (cell.questioned) {
            cell.questioned = false;
        }
        setCells(newCells);
    };

    return (
        <div className="flex flex-col h-full w-full overflow-hidden select-none">
            <TopCommonMenuBar
                items={[
                    {
                        label: 'Game',
                        submenu: [
                            { label: 'New', onClick: resetGame },
                            { label: '---' }, // Separator
                            {
                                label: 'Beginner',
                                onClick: () => setCurrentDifficulty(difficulties[0]),
                                checked: currentDifficulty.name === 'Beginner'
                            },
                            {
                                label: 'Intermediate',
                                onClick: () => setCurrentDifficulty(difficulties[1]),
                                checked: currentDifficulty.name === 'Intermediate'
                            },
                            {
                                label: 'Expert',
                                onClick: () => setCurrentDifficulty(difficulties[2]),
                                checked: currentDifficulty.name === 'Expert'
                            },
                            {
                                label: 'Alex Hu',
                                onClick: () => setCurrentDifficulty(difficulties[3]),
                                checked: currentDifficulty.name === 'Alex Hu'
                            }
                        ]
                    },
                    {
                        label: 'Help',
                        submenu: [
                            { label: 'Ask Dr. Hu' },
                        ]
                    }
                ]}
                showWindowsBadge={false}
            />

            <div className="w-full minesweeper-container border-white border-l-3 border-t-3 py-1.5 px-1">
                <div className="minesweeper-toolbar flex items-center mb-2 justify-between h-10 p-1">
                    <div className="minesweeper-counter flex h-full">
                        {String(minesLeft).padStart(3, '0').split('').map((n, i) => (
                            <img key={i} src={digitSrc(+n)} alt={n} />
                        ))}
                    </div>
                    <div className="minesweeper-button-wrapper cursor-pointer border-l border-t border-gray-128 active:rounded-xxs active:border-l-2 active:border-t-2 active:border-b active:border-r">
                        <div
                            onClick={resetGame}
                            className="minesweeper-button w-7 h-7 flex items-center justify-center rounded-xs outline-none"
                        >
                            <img src={emojiSrc(emoji)} alt={`${emoji} emoji`}
                                className="w-5 h-5 active:translate-x-px active:translate-y-px"
                            />
                        </div>
                    </div>
                    <div className="minesweeper-counter flex h-full">
                        {String(timer).padStart(3, '0').split('').map((n, i) => (
                            <img key={i} src={digitSrc(+n)} alt={n} />
                        ))}
                    </div>
                </div>
                <div className="grid minesweeper-board"
                    style={{
                        gridTemplateColumns: `repeat(${cols}, 20px)`,
                        gridTemplateRows: `repeat(${rows}, 20px)`,
                        width: `${cols * 20 + 8}px`,
                        height: `${rows * 20 + 8}px`
                    }}
                >
                    {cells.map((cell, index) => (
                        <div
                            key={index}
                            className="relative w-full h-full"
                            onClick={() => {
                                if (firstClick) {
                                    setFirstClick(false);
                                    setGameRunning(true);
                                }
                                uncoverCell(index);
                            }}
                            onContextMenu={(e) => toggleFlag(e, index)}
                        >
                            {!cell.uncovered && cell.flagged &&
                                <div className="minesweeper-cell-cover absolute w-full h-full">
                                    <img src="/img/icons/minesweeper/flag.webp" alt="flag" />
                                </div>
                            }
                            {!cell.uncovered && cell.questioned &&
                                <div className="minesweeper-cell-cover absolute w-full h-full">
                                    <img src="/img/icons/minesweeper/question.webp" alt="question" />
                                </div>
                            }
                            {!cell.uncovered && !cell.flagged && !cell.questioned &&
                                <div className="minesweeper-cell-cover absolute w-full h-full"></div>
                            }
                            {cell.uncovered && !cell.mine && (<>
                                <div className="minesweeper-cell-open absolute w-full h-full"></div>
                                <img className="w-full h-full p-0.5" src={`/img/icons/minesweeper/open${cell.neighborMines}.webp`} alt="open" />
                            </>)}
                            {cell.uncovered && cell.mine && cell.isClickedMine && (<>
                                <div className="minesweeper-cell-open absolute w-full h-full"></div>
                                <img className="w-full h-full p-0.5 minesweeper-mine-clicked" src="/img/icons/minesweeper/mine-death.webp" alt="mine" />
                            </>)}
                            {cell.uncovered && cell.mine && !cell.isClickedMine && (<>
                                <div className="minesweeper-cell-open absolute w-full h-full"></div>
                                <img className="w-full h-full p-0.5" src="/img/icons/minesweeper/mine-ceil.webp" alt="mine" />
                            </>)}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};
export default MinesweeperContent;