import { useState, useEffect } from 'react';

import {
    Typography,
    CircularProgress,
    Fade,
    Button
} from '@material-ui/core';
import styles from '../Css/progress.module.css';

import LoadableImage from './LoadableImage.js';
import EditUpdateDialog from './EditUpdateDialog';

function Progressbar({
    data,
    status,
    edit = false
}) {
    const [editTarget, setEditTarget] = useState(null);
    const [open, setOpen] = useState(false);

    const render = () => {
        if (!data) {
            return (
                <div>
                    <CircularProgress />
                </div>
            );
        }

        if (!data.length) {
            return (
                <div>
                    <p>Nothing yet...</p>
                </div>
            );
        }

        return data.map((progressData, i) => {
            const date = new Date(progressData.created_at);
            const dateString = date.toLocaleDateString();
            const timeString = date.toLocaleString(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
            return (
                <>
                    <div key={i} className={`${styles.progressItem} ${i === 0 && status !== 'Finished' ? styles.focused : ''}`}>
                        <div className={styles.stepper}>
                            <div className={styles.ballAndDate}>
                                <div className={styles.date}>
                                    {dateString}
                                    <br />
                                    {timeString}
                                </div>
                                <div className={`${styles.circle}`} />
                            </div>
                            <div className={styles.line} />
                        </div>
                        <div className={styles.content}>
                            <div className={`${styles.responsiveDate}`}>
                                {dateString} • {timeString}
                            </div>
                            <span className={styles.title}>{progressData.title}</span>
                            <Typography className={styles.description}>{progressData.description}</Typography>
                            {
                                edit
                                    ? (
                                        <>
                                            <Button
                                                color='primary'
                                                variant='outlined'
                                                size='small'
                                                onClick={e => {
                                                    setEditTarget(progressData)
                                                    setOpen(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                color='secondary'
                                                variant='outlined'
                                                size='small'
                                            >
                                                Delete
                                            </Button>
                                        </>
                                    )
                                    : null
                            }
                            {
                                progressData.images.length
                                    ? <LoadableImage images={progressData.images} />
                                    : null
                            }
                        </div>
                    </div>
                </>

            );
        });
    };

    return (
        <Fade in={true} mountOnEnter unmountOnExit>
            <div className={`${styles.progressBar} ${['Cancelled', 'Paused', 'Finished'].includes(status) ? styles.finished : ''}`}>
                {render()}
                {
                    edit && editTarget
                        ? (
                            <EditUpdateDialog
                                updateId={editTarget.id}
                                initialTitle={editTarget.title}
                                initialDescription={editTarget.description}
                                open={open}
                                setOpen={setOpen}
                                onClose={() => {
                                    setEditTarget(null);
                                }}
                            />
                        )
                        : null
                }
            </div>
        </Fade>
    );
}

export default Progressbar;