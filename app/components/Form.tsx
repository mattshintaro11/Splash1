import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Grid,
    Slider,
    Button,
    Alert,
    TextField,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Event } from "./types";



type Props = {
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type ArrayEventKey = 'locations' | 'symptomes' | 'medications';

export default function Form({ setEvents, setOpen }: Props) {
    const [state, setState] = useState<{ loading: boolean; error?: string }>({
        loading: false,
        error: undefined,
    });

    const [event, setEvent] = useState<Event>({
        date: null,
        duration: 1,
        locations: [],
        symptomes: [],
        medications: [],
        count: 0,
    });

    const handleChange = (index: number, key: ArrayEventKey) => {
        setEvent((prevEvent) => {
            const updatedArray = prevEvent[key].includes(index)
                ? prevEvent[key].filter((x) => x !== index)
                : [...prevEvent[key], index];
            return {
                ...prevEvent,
                [key]: updatedArray,
            };
        });
    };

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            date: date,
        }));
    };

    const handleDurationChange = (event: any, newValue: number | number[]) => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            duration: newValue as number,
        }));
    };

    const saveEvent = () => {
        setState({ ...state, error: undefined });
        if (!event.date) {
            setState({ ...state, error: "You must provide a date" });
            return;
        }
        try {
            setState({ ...state, loading: true });
            setEvents((prevEvents) => [...prevEvents, event]);
            setOpen(false);
            console.log("send event");
            console.log(event);
        } catch (error) {
            console.log(error);
        } finally {
            setState({ ...state, loading: false });
        }
    };

    useEffect(() => {
        // Handle any side effects when the event state changes
    }, [event]);

    return (
        <Card
            variant="outlined"
            sx={{ minWidth: 275, maxWidth: 600, mx: "auto", px: 2, py: 1, my: 2 }}
        >
            <CardContent>
                <Grid sx={{ mb: 3 }}>
                    <h2>Add a new crisis</h2>
                </Grid>
                {state.error && <Alert severity="error">{state.error}</Alert>}
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <DateTimePicker
                            label="Date"
                            value={event.date}
                            onChange={handleDateChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Slider
                            value={event.duration}
                            onChange={handleDurationChange}
                            aria-labelledby="duration-slider"
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            max={24}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* Your checkboxes for locations, symptoms, medications */}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={saveEvent}
                            disabled={state.loading}
                        >
                            Save Event
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
