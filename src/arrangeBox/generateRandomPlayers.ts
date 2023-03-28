import { footballers } from "./footballers";

export const generateRandomPlayers = () => {
    const count = Math.floor(Math.random() * (footballers.length - 1));
    const arr: number[] = [];
    while (arr.length < count && arr.length < footballers.length) {
        const randomNum = Math.floor(Math.random() * (footballers.length - 1));
        if (!arr.includes(randomNum)) {
            arr.push(randomNum);
        }
    }
    return arr.map((number) => ({ ...footballers[number] }));
}