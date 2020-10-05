import { cashin, cashoutNatural, cashoutJuridical } from "./../controller/index.js";

export const transactionManager = async ({ type, user_type: userType, ...data}) => {
    let commission = 0;

    if (type === "cash_in"){
        commission = await cashin(data);
    } else if (type === "cash_out") {
        if (userType ===  "natural") {
            commission = await cashoutNatural(data);
        }

        if (userType === "juridical") {
            commission = await cashoutJuridical(data);
        }
    }

    console.log(`commission: ${commission}`);
    return commission;
};
