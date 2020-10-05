import configService from "./../services/configService.js";

export const cashoutJuridical = async ({ operation }) => {
    try {
        const config = await configService.getCashoutJuridicalConfig();
        const { percents, min: { amount: minAmount } } = config;
        let commission = operation.amount * percents / 100;
        commission = (commission < minAmount) ? minAmount : commission;

        return commission.toFixed(2);
    } catch (err) {
        console.log(err.messsage);
    }
};
