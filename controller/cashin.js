import configService from "./../services/configService.js";

export const cashin = async ({ operation }) => {
    try {
        const config = await configService.getCashinConfig();
        const { percents,  max: { amount: maxCommission } } = config;
        let commission = operation.amount * percents / 100;
        commission = (commission > maxCommission) ? maxCommission : commission;

        return commission.toFixed(2);
    } catch (err) {
        console.log(`err.message (cash_in): ${err.message}`);
    }
};
