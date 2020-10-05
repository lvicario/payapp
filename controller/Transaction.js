import weekNumber from "current-month-week-number";
import configService from "./../services/configService.js";

export class Transaction {
    constructor(data) {
        this.data = data;
        this.weekLimit = {};
        this.discounted = {};
    }

    async cashin() {
        const { operation } = this.data;

        try {
            const config = await configService.getCashinConfig();
            const { percents,  max: { amount: maxCommission } } = config;
            this.commission = operation.amount * percents / 100;
            this.commission = (this.commission > maxCommission) ? maxCommission : this.commission;
            // console.log(`this.commission: ${this.commission.toFixed(2)} : ${operation.amount}`);
            // return this.commission.toFixed(2);
        } catch (err) {
            console.log(`err.message (cash_in): ${err.message}`);
        }
    }   

    async cashoutNatural() {
        const { operation, user_id: userId, date } = this.data;

        try {
            const config = await configService.getCashoutNaturalConfig();
            const { percents, week_limit: { amount: limitAmount }} = config;
            
            const newDate = new Date(date);
            const year = newDate.getFullYear();
            const month = newDate.getMonth() + 1; // Add 1 because weekNumber is based not on index (0 base)
            const day = newDate.getDate();
            const weekOfMonth = weekNumber.weekNumberForGivenDate(year, month, day);
            const key = `${userId}-${year}-${month}-${weekOfMonth}`;

            this.weekLimit[key] = key in this.weekLimit ? this.weekLimit[key] + operation.amount : operation.amount;
            console.log(`this.weekLimit: ${JSON.stringify(this.weekLimit)}`);

            if (!this.discounted[key] && operation.amount <= limitAmount) {
                this.commission = 0;
            }

            if (operation.amount > limitAmount && !this.discounted[key]) {
                this.commission = (operation.amount - limitAmount) * (percents / 100);
                this.discounted[key] = true;
            } else {
                this.commission = operation.amount * (percents / 100);
            }
        } catch (err) {
            console.log(`err.message (natural): ${err.message}`);
        }
    }

    async cashoutJuridical() {
        const { operation } = this.data;

        try {
            const config = await configService.getCashoutJuridicalConfig();
            const { percents, min: { amount: minAmount } } = config;
            this.commission = operation.amount * percents / 100;
            this.commission = (this.commission < minAmount) ? minAmount : this.commission;
        } catch (err) {
            console.log(`err.message (juridical): ${err.message}`);
        }
    }

    getCommission() {
        return this.commission.toFixed(2);
    }
}
