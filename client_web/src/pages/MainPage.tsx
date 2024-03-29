import { Grid, Typography, Box, Button, MenuItem, Select, TextField, Container, List, Alert } from '@mui/material';
import COLORS from '../constants/colors';
import SERVICESSTATES from '../constants/services';
import MYAREALIST from '../constants/myAreaList';
import Divider from '@mui/material/Divider';
import AreaBox from '../components/AreaBox';
import IconButton from '@mui/material/IconButton';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import { useState } from 'react';
import { createArea, deleteAllAreas } from '../reducers/actions/area';
import DeleteIcon from '@mui/icons-material/Delete';

const MyAreaCreate = () => {
    const webhooksLinks = JSON.parse(localStorage.getItem('webhooksLinks') as string);

    const [serviceAction, setServiceAction] = useState('');
    const [actions, setActions] = useState('');

    const [serviceReaction, setServiceReaction] = useState('');
    const [reactions, setReactions] = useState('');

    const [areaTitle, setAreaTitle] = useState('');

    const getPos = (value: string) => {
        let pos = (value === 'github') ? 0 : 1;
        pos = (value === 'slack') ? 1 : pos;
        pos = (value === 'discord') ? 2 : pos;
        pos = (value === 'pivotaltracker') ? 3 : pos;
        pos = (value === 'intra') ? 4 : pos;
        pos = (value === 'teams') ? 5 : pos;
        pos = (value === 'email') ? 6 : pos;
        return (pos);
    };

    const [isSuccess, setIsSuccess] = useState(true);

    const [paramAction, setParamAction] = useState('');
    const [paramReaction, setParamReaction] = useState('');

    const create = async () => {
        const paramsActions: any = {};
        for (const key of SERVICESSTATES[getPos(serviceAction)].paramsActions) {
            paramsActions[key] = paramAction.replace(/#/g,'%23');
        }
        const paramsReactions: any = {};
        for (const key of SERVICESSTATES[getPos(serviceReaction)].paramsReactions) {
            paramsReactions[key] = paramReaction.replace(/#/g,'%23');
        }
        const params = {
            area_name: areaTitle,
            action_service: serviceAction,
            action_name: actions,
            action_params: paramsActions,
            reaction_service: serviceReaction,
            reaction_name: reactions,
            reaction_params: paramsReactions
        }
        const response = await createArea(params);
        if (response === true) {
          MYAREALIST.push({mpos: MYAREALIST.length, pos: MYAREALIST.length, title: areaTitle, description: "WHEN " + actions + " in " + serviceAction + " DO " + reactions + " in " + serviceReaction, display: true});
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
    };

    return (
        <Box sx={{ width: '79em', height: '53em', backgroundColor: COLORS.DARKGRAY, borderRadius: 5}} >
            <Typography variant='h3' color={COLORS.WHITE} align='center' sx={{ mt: '0.2em' }}>
                Create an Area
            </Typography>
            <Divider variant="middle" style={{ borderBottomWidth: 5, marginTop: '1%', marginBottom: '2%' }} />
            <Grid container>
                <Box sx={{ marginLeft: '1em', marginBottom: '1em', width: '38em', maxHeight: '45em', backgroundColor: COLORS.MYGRAY, borderRadius: 5, justifyContent: "center" }} >
                    <Typography variant='h3' color={COLORS.WHITE} align='center' sx={{ mt: '0.2em' }}>
                    Set Your Action
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '4em', marginTop: '4em', marginBottom: '1em', width: '30em', height: '6.2em', backgroundColor: COLORS.GRAY, borderRadius: 5 }} >
                        <Select id='selectAService' value = {serviceAction} onChange={event => {setServiceAction(event.target.value as string)}} displayEmpty variant='standard' sx={{ fontFamily: 'Open Sans', fontSize: 35, paddingTop: '0.25em', paddingBottom: '0.25em'}}>
                            <MenuItem disabled value="">Choose a Service</MenuItem>
                            {SERVICESSTATES?.map(option => {
                                return (option.value === 'true' && option.actions.length !== 0) ? (
                                        <MenuItem key={option.label} value={option.label}>
                                        {option.label}
                                        </MenuItem>
                                ) : (<li key={0}></li>);
                            })}
                        </Select>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '4em', marginTop: '4em', marginBottom: '1em', width: '30em', height: '6.2em', backgroundColor: COLORS.GRAY, borderRadius: 5 }} >
                        <Select value = {actions} onChange={event => {setActions(event.target.value as string)}} displayEmpty variant='standard' sx={{ fontFamily: 'Open Sans', fontSize: 35, paddingTop: '0.25em', paddingBottom: '0.25em'}}>
                            <MenuItem disabled value="">Choose an Action</MenuItem>
                                {SERVICESSTATES[getPos(serviceAction)].actions?.map(option => {
                                    return (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    );
                                })}
                        </Select>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '4em', marginTop: '4em', marginBottom: '1em', width: '30em', height: '6.2em', backgroundColor: COLORS.GRAY, borderRadius: 5 }} >
                        {SERVICESSTATES[getPos(serviceAction)].paramsActions?.map(option => {
                            return (
                                <li key={option} style={{ color: COLORS.GRAY }}>
                                    <TextField id={option} onChange={event => {setParamAction(event.target.value as string)}} helperText="For this action you should enter ..." label={option} variant="standard" sx={{ml: '1em', mr: '1em', height: '6.2em'}}/>
                                </li>
                            );
                        })}
                    </Box>
                </Box>
                <Box sx={{ marginLeft: '1em', marginBottom: '1em', width: '38em', maxHeight: '45em', backgroundColor: COLORS.MYGRAY, borderRadius: 5, justifyContent: "center" }} >
                    <Typography variant='h3' color={COLORS.WHITE} align='center' sx={{ mt: '0.2em' }}>
                        Set Your REAction
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '4em', marginTop: '4em', marginBottom: '1em', width: '30em', height: '6.2em', backgroundColor: COLORS.GRAY, borderRadius: 5 }} >
                        <Select value = {serviceReaction} onChange={event => {setServiceReaction(event.target.value as string)}} displayEmpty variant='standard' sx={{ fontFamily: 'Open Sans', fontSize: 35, paddingTop: '0.25em', paddingBottom: '0.25em'}}>
                            <MenuItem disabled value="">Choose a Service</MenuItem>
                            {SERVICESSTATES?.map(option => {
                                return (option.value === 'true' && option.reactions.length !== 0) ? (
                                    <MenuItem key={option.label} value={option.label}>
                                    {option.label}
                                    </MenuItem>
                                ) : (<li key={option.label}></li>);
                            })}
                        </Select>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '4em', marginTop: '4em', marginBottom: '1em', width: '30em', height: '6.2em', backgroundColor: COLORS.GRAY, borderRadius: 5 }} >
                        <Select value = {reactions} onChange={event => {setReactions(event.target.value as string)}} displayEmpty variant='standard' sx={{ fontFamily: 'Open Sans', fontSize: 35, paddingTop: '0.25em', paddingBottom: '0.25em'}}>
                            <MenuItem disabled value="">Choose an Reaction</MenuItem>
                            {SERVICESSTATES[getPos(serviceReaction)].reactions?.map(option => {
                                return (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '4em', marginTop: '4em', marginBottom: '1em', width: '30em', height: '6.2em', backgroundColor: COLORS.GRAY, borderRadius: 5 }} >
                        {SERVICESSTATES[getPos(serviceReaction)].paramsReactions?.map(option => {
                            return (
                                <li key={option} style={{ color: COLORS.GRAY }}>
                                    <TextField id={option}  onChange={event => {setParamReaction(event.target.value as string)}} helperText="For this reaction you should enter ..." label={option} variant="standard" sx={{ml: '1em', mr: '1em', height: '6.2em'}}/>
                                </li>
                            );
                        })}
                    </Box>
                </Box>
            </Grid>
            <Grid container>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginLeft: '1em', marginTop: '1em', marginBottom: '1em', width: '30em', backgroundColor: COLORS.MYGRAY, borderRadius: 5 }} >
                    <TextField value={areaTitle} onChange={event => {setAreaTitle(event.target.value as string)}} id="areatitle" helperText="Put a good, and short name" label="Enter your AREA name" variant="standard" sx={{ width: '25em', height: '6.2em'}}/>
                </Box>
                <Box sx={{ ml: 5, mt: 4 }}>
                    {(serviceAction === 'teams' || serviceAction === 'github' || serviceAction === 'pivotaltracker') &&
                        <Typography variant="h5" color="common.white">Use this link to continue</Typography>
                    }
                    {serviceAction === 'teams' &&
                        <Typography color="common.white">{webhooksLinks.teams}</Typography>
                    }
                    {serviceAction === 'github' &&
                        <Typography color="common.white">{webhooksLinks.github}</Typography>
                    }
                    {serviceAction === 'pivotaltracker' &&
                        <Typography color="common.white">{webhooksLinks.pivotaltracker}</Typography>
                    }
                </Box>
                <Button type='submit' onClick={create} variant="contained" sx={{ marginLeft: '7em', marginTop: '3em', width: '7em', height: '4em', backgroundColor: COLORS.GREEN }}>Create</Button>
            </Grid>
            { !isSuccess && <Alert severity='error' sx={{ mb: 2 }}>Error when creating an AREA (missing fields...)</Alert> }
        </Box>
    );
};

const MyAreaList = () => {

    const [user, setUser] = useState(0);

    const handleClick = async () => {
        await deleteAllAreas();
    };

    return (
        <Box sx={{ mt: '0.5em', maxHeight: '53em', width: '37em', backgroundColor: COLORS.DARKGRAY, borderRadius: "5%"}} >
            <Typography variant='h3' color={COLORS.WHITE} align='center' sx={{ mt: '0.2em' }}>
                My AREAs
            </Typography>
            <IconButton onClick={(event) => {setUser(user+1)}} aria-label="refresh">
                <ReplayCircleFilledIcon sx={{ color: COLORS.WHITE }}/>
            </IconButton>
            <IconButton onClick={handleClick} aria-label="refresh">
                <DeleteIcon sx={{ color: COLORS.RED }}/>
            </IconButton>
            <Divider variant="middle" style={{ borderBottomWidth: 5, marginTop: '3%', marginBottom: '3%' }} />
            <List id='arealist' style={{maxHeight: '80%', overflow: 'auto'}}>
                {MYAREALIST?.map(option => {
                    return (option.display === true) ? (
                        <li key={option.title}>
                            <AreaBox title={option.title} description={option.description} pos={option.pos} mpos={option.pos} display={true}/>
                        </li>
                    ) : (<li key={option.title}></li>);
                })}
            </List>
        </Box>
    );
};

const MainPage = () => {
    return (
        <Grid container sx={{ marginTop: '5em', marginLeft: '0em'}}>
            <MyAreaList />
            <Box sx={{ ml: '1.2em', width: '0.2em', height: '53em', backgroundColor: COLORS.DARKGRAY, borderRadius: "5%"}} />
            <Container fixed sx={{ ml : '0em' }}>
                <MyAreaCreate />
            </Container>
        </Grid>
    )
}

export default MainPage;