import { httpClient } from '../utils/asyncUtils';
import {dataMachine} from "spider-vision/Form/dataMachine";
import {omit,first,isEmpty} from "lodash";

const items = 'meetings';
export const ItemDetailsMachine = dataMachine('ItemDetails').withConfig({
    services: {
        fetchData: async (ctx, event: any) => {
            const payload = omit(event,'type');
            // @ts-ignore
            const contextTransactionId = !isEmpty(ctx.results) && first(ctx.results)['id'];
            const itemId = contextTransactionId || payload.itemId;
            const resp = await httpClient.get(`/api/${items}/${itemId}`);
            return { results: [resp.data.transaction] };
        },
        updateData: async (ctx, event: any) => {
            const payload = omit(event,'type');
            const resp = await httpClient.patch(
                `/api/${items}/${payload.id}`,
                payload
            );
            return resp.data;
        },
    },
});
