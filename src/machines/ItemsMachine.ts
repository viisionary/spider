import { httpClient } from '../utils/asyncUtils';
import {dataMachine} from "spider-vision/Form/dataMachine";
import {omit} from "lodash/fp";
import {isEmpty} from "lodash";

const items = 'meeting';
export const ItemsMachine = dataMachine('items').withConfig({
    services: {
        fetchData: async (ctx, event: any) => {
            const payload = omit('type', event);
            const resp = await httpClient.get(`/mock/api/${items}/list`, {
                params:
                    !isEmpty(payload) && event.type === 'FETCH'
                        ? payload
                        : undefined,
            });
            return resp.data;
        },
        fetchItemData: async () => {},
        deleteData: async (ctx, event: any) => {
            const payload = omit('type', event);
            const resp = await httpClient.delete(
                `/mock/api/${items}/${payload.id}`,
                payload
            );
            return resp.data;
        },
        createData: async (ctx, event: any) => {
            const payload = omit('type', event);
            const resp = await httpClient.post(`/api/${items}`, payload);
            return resp.data;
        },
        updateData: async (ctx, event: any) => {
            const payload = omit('type', event);
            const resp = await httpClient.patch(
                `/api/${items}/${payload.id}`,
                payload
            );
            return resp.data;
        },
    },
});
