import { isEmpty, omit } from "lodash/fp";
import { dataMachine } from "./dataMachine";
import { httpClient } from "../utils/asyncUtils";

const items ='meetings';
export const ItemsMachine = dataMachine('items').withConfig({
    services: {
        fetchData: async (ctx, event: any) => {
            const payload = omit("type", event);
            const resp = await httpClient.get(`/api/${items}`, {
                params: !isEmpty(payload) && event.type === "FETCH" ? payload : undefined,
            });
            return resp.data;
        },
        fetchItemData:async ()=>{},
        deleteData: async (ctx, event: any) => {
            const payload = omit("type", event);
            const resp = await httpClient.delete(
                `/api/${items}/${payload.id}`,
                payload
            );
            return resp.data;
        },
        createData: async (ctx, event: any) => {
            const payload = omit("type", event);
            const resp = await httpClient.post(`/api/${items}`, payload);
            return resp.data;
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
