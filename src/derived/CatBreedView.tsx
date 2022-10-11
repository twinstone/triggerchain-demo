import { LinearProgress, List, ListItemText, Pagination, Stack, Typography } from "@mui/material";
import React, { useTransition } from "react";
import { useDataState, useDataValue } from "triggerchain";
import { catBreedInfoState, catBreedPageState, catBreedsCountState } from "./derivedStates";

export const CatBreedView: React.FC<{}> = (props) => {
    const [pending, startTransition] = useTransition();
    const [page, setPage] = useDataState(catBreedPageState);
    const count = useDataValue(catBreedsCountState);
    const breed = useDataValue(catBreedInfoState);
    return (
        <>
            {pending && <LinearProgress/>}
            <Stack spacing={2}>
                <List>
                    <ListItemText>Breed: <Typography component="strong">{breed.breed}</Typography></ListItemText>
                    <ListItemText>Origin: <Typography component="strong">{breed.origin}</Typography></ListItemText>
                    <ListItemText>Country: <Typography component="strong">{breed.country}</Typography></ListItemText>
                    <ListItemText>Coat: <Typography component="strong">{breed.coat}</Typography></ListItemText>
                    <ListItemText>Pattern: <Typography component="strong">{breed.pattern}</Typography></ListItemText>
                </List>
                <Pagination count={count} page={page} onChange={(e, v) => startTransition(() => setPage(v))}/>
            </Stack>
        </>
    );
}