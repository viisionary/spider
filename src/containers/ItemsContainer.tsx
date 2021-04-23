import React, {useEffect} from 'react';
import {useService} from "@xstate/react";
import {ItemsMachine} from "../machines/ItemsMachine";
import {Interpreter} from 'xstate';
import {DataContext, DataEvents} from '../machines/dataMachine';
import Cards from "../components/Cards";
import SpeedDials from "../components/SpeedDials";
import createIcon from "../svg/004-magic-wand.svg";

interface Props {
    ItemsService: Interpreter<DataContext, any, DataEvents, any>;
}
const actions = [
    {icon: <img src={createIcon} alt="12" width={20} />, name: '发起会议'},
];

const ItemsContainer: React.FC<Props> = ({ItemsService}) => {
    const [ItemsState, sendItems] = useService(ItemsService);

    console.log('---')
    console.log(ItemsState?.context.results!)
    useEffect(() => {
        sendItems("FETCH");
    }, [sendItems]);

    console.log(ItemsState)
    return (<div>
        <Cards items={ItemsState?.context.results!} />
        <SpeedDials actions={actions} />
    </div>)
}
export default ItemsContainer;
