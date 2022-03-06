import React from 'react';
import COLORS from '../constants/colors';
import { useState } from 'react';
import { Typography, Switch, Box, Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MYAREALIST from '../constants/myAreaList';
import { deleteArea } from '../reducers/actions/area';

interface AreaBoxProps { mpos: number, pos: number, title: string, description: string, display: boolean }

const AreaBox = (props: AreaBoxProps) => {
    const [stateSwitch, setStateSwitch] = useState({
        box: true,
    });

    const handleChangeSwitch = (event: React.ChangeEvent<any>) => {
    setStateSwitch({
        ...stateSwitch,
        [event.target.name]: event.target.checked,
    });
    };

    const disableArea = async () => {
        let p = 0;
        for (let i = 0; i < MYAREALIST.length; i++)
            p = (MYAREALIST[i].pos === props.pos) ? MYAREALIST[i].mpos : p;
        MYAREALIST[p].display = false;
        MYAREALIST.splice(p, 1);
        await deleteArea(p);
        for (let i = 0; i < MYAREALIST.length; i++)
            MYAREALIST[i].mpos = (i === 0) ? 0 : MYAREALIST[i-1].mpos + 1;
    };

    let colorState = stateSwitch.box ? COLORS.GREEN : COLORS.RED;

    return (
    <Grid container>
        <Box sx={{ marginLeft: '1.5em', width: '0.9em', height: '7.2em', backgroundColor: colorState }} >
        </Box>
        <Box sx={{ marginBottom: '1.5em', width: '30em', height: '7.2em', backgroundColor: COLORS.MYGRAY, justifyContent: "center" }} >
            <Grid container>
                <Typography variant='subtitle1' color={COLORS.WHITE} sx={{ ml: 2, fontWeight: 'light', fontStyle: 'italic' }}>
                    Title : {props.title}
                </Typography>
                <IconButton onClick={disableArea} aria-label="delete" sx={{ height: '1em', marginLeft: '5.5em', marginTop: '0.2em' }}>
                    <DeleteIcon/>
                </IconButton>
                <Switch checked={stateSwitch.box} onChange={handleChangeSwitch} name="box" inputProps={{ 'aria-label': 'controlled' }}/>
            </Grid>
            <Grid container>
            <TextField id="areadescription" multiline maxRows={2} label="Description" defaultValue={props.description} InputProps={{ readOnly: true, }} sx={{ width: '30em', fontWeight: 'light' }}/>
            </Grid>
        </Box>
    </Grid>

    );
}

export default AreaBox;
