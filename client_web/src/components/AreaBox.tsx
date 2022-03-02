import React from 'react';
import COLORS from '../constants/colors';
import { useState } from 'react';
import { Typography, Switch, Box, Grid, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface AreaBoxProps {
    title: string;
    description: string;
}

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
    let colorState = stateSwitch.box ? COLORS.GREEN : COLORS.RED;

    return (
    <Grid container>
        <Box sx={{ marginLeft: '1.5em', width: '0.9em', height: '6.2em', backgroundColor: colorState }} >
        </Box>
        <Box sx={{ marginBottom: '1.5em', width: '30em', height: '6.2em', backgroundColor: COLORS.MYGRAY, justifyContent: "center" }} >
            <Grid container>
                <Typography variant='subtitle1' color={COLORS.WHITE} sx={{ ml: 2, fontWeight: 'light', fontStyle: 'italic' }}>
                    Title : {props.title}
                </Typography>
                <IconButton aria-label="delete" sx={{ height: '1em', marginLeft: '5.5em', marginTop: '0.2em' }}>
                    <DeleteIcon/>
                </IconButton>
                <Switch checked={stateSwitch.box} onChange={handleChangeSwitch} name="box" inputProps={{ 'aria-label': 'controlled' }}/>
            </Grid>
            <Grid container>
            <TextField id="areadescription" multiline maxRows={1} label="Description" defaultValue={props.description} InputProps={{ readOnly: true, }} sx={{ width: '30em', ml: 3, fontWeight: 'light' }}/>
            </Grid>
        </Box>
    </Grid>

    );
}

export default AreaBox;
