import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SubscriptionApi from "../../api/SubscriptionApi";
import {toast} from "react-toastify";
import SeriesApi from "../../api/SeriesApi";

function SubscribeModal(props) {
    const [open, setOpen] = useState(false);
    const [subscription, setSubscription] = useState({});

    Date.prototype.addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const handleClickOpen = () => {
        let dateString = new Date().addDays(1).toISOString().slice(0, 10);
        setSubscription({
            subscriberEmail: '',
            articleNum: 1,
            sendDate: dateString,
            seriesId: props.series.seriesId
        })
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSubscription({...subscription,
            [event.target.name]: event.target.value});
    }

    const handleSave = () => {
        if(validateEmail(subscription.subscriberEmail)){
            SubscriptionApi.postNewSubscription(subscription).then(() => {
                SeriesApi.incrementCounts(props.series.seriesId).then(() => {
                    toast.success("Subscribed!");
                })
            });
            handleClose();
        }
        else{
            toast.error("Email not valid");
        }
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return(
        <div>
            <button class = "text-xl mt-2 px-2 py-1 rounded-md text-slate-50 bg-orange-700 hover:bg-orange-800" onClick={handleClickOpen}>
                Subscribe
            </button>
            <Dialog class = "flex flex-col md:flex-row rounded-l-xl p-10" open={open} onClose={handleClose}>
                <DialogTitle class = "max-w-s font-sans text-xl font-small text-center mx-6 mt-6">Subscribe to Email Series</DialogTitle>
                <DialogContent class = "flex flex-col mx-5">
                        <TextField label="Email" name="subscriberEmail" autoFocus
                                   variant="standard" value={subscription.subscriberEmail}
                                   onChange={handleChange}/>
                </DialogContent>
                <DialogActions class = "text-center mb-6">
                    <button class = "text-lg my-1 mx-2 p-1 rounded-md text-zinc-800 hover:text-cyan-400"
                            onClick={handleSave}>Subscribe</button>
                    <button class = "text-lg m-2 p-1"
                        onClick={handleClose}>Cancel</button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SubscribeModal;