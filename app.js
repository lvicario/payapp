import inputs from "./input.json";
import { transactionManager } from "./utils/index.js";

const runTransaction = (transactions) => {
    for (const item of transactions) {
        transactionManager(item);
    }
}

runTransaction(inputs);
