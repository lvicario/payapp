import configService from "./../services/configService.js";
import { generatePropKey } from "./../utils/index.js";

const weekLimit = {};
const discounted = {};

export const cashoutNatural = async ({ operation, user_id: userId, date }) => {
    try {
        const config = await configService.getCashoutNaturalConfig();
        const { percents, week_limit: { amount: limitAmount }} = config;
        
        const key = generatePropKey(userId, date);

        weekLimit[key] = key in weekLimit ? weekLimit[key] + operation.amount : operation.amount;

        let commission = 0;

        if (discounted[key]) {
            commission = operation.amount * (percents / 100);
        } else if (operation.amount < limitAmount) {
            commission = 0;
        } else if (operation.amount > limitAmount) {
            commission = (operation.amount - limitAmount) * (percents / 100);
            discounted[key] = true;
        }

        return commission.toFixed(2);
    } catch (err) {
        console.log(err.message);
    }
};
