import React, { useEffect } from 'react';
import { useService } from '@xstate/react';
import { Interpreter } from 'xstate';
import { DataContext, DataEvents } from '../machines/dataMachine';
import Cards from '../components/Cards';
import SpeedDials from '../components/SpeedDials';
import createIcon from '../svg/004-magic-wand.svg';
import { Pagination } from '@material-ui/lab';

interface Props {
    ItemsService: Interpreter<DataContext, any, DataEvents, any>;
}

const actions = [
    { icon: <img src={createIcon} alt="12" width={20} />, name: '发起会议' },
];

const ListContainer: React.FC<Props> = ({ ItemsService }) => {
    const [ItemsState, sendItems] = useService(ItemsService);
    useEffect(() => {
        sendItems('FETCH');
    }, [sendItems]);
    return (
        <div>
            {/* @ts-ignore*/}
            <Cards items={ItemsState?.context.results} />
            <SpeedDials actions={actions} />
            <Pagination count={10} variant="outlined" color="primary" />
        </div>
    );
};
export default ListContainer;
