import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";
import { first } from "lodash";

const items ='meetings';
export const ItemDetailsMachine = dataMachine('ItemDetails').withConfig({
    services: {
        fetchData: async (ctx, event: any) => {
            const payload = omit("type", event);
            const contextTransactionId = !isEmpty(ctx.results) && first(ctx.results)["id"];
            const itemId = contextTransactionId || payload.itemId;
            const resp = await httpClient.get(`/api/${items}/${itemId}`);
            return { results: [resp.data.transaction] };
        },
        updateData: async (ctx, event: any) => {
            const payload = omit("type", event);
            const resp = await httpClient.patch(
                `/api/${items}/${payload.id}`,
                payload
            );
            return resp.data;
        },
    },
});
