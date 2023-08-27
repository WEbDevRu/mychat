import React, { useEffect } from 'react';

import { ParticipantsList } from 'livelists-react-sdk';
import {
    WSRoomTypes,
} from 'livelists-js-core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { useBool } from '../../../../hooks/useBool';

import styles from './Navigation.module.scss';
import { LoadingPage } from '../../../Common/LoadingPage';

const Navigation = ({
    loadParticipants,
    participants,
    isParticipantsLoaded,
    onSubscribeEvent,
    publishEvent,
    channelIdentifier,
}) => {
    const isOpen = useBool(false);

    useEffect(() => {
        if (isOpen.value) {
            loadParticipants();
        }
    }, [isOpen.value]);

    useEffect(() => {
        onSubscribeEvent({
            event: 'participants-modal',
            cb: (data) => {
                console.log(data);
            },
        });
    }, [channelIdentifier]);

    return (
        <>
            <div className={styles.cont}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={isOpen.onToggle}
                >
                    Participants list
                </Button>
            </div>
            <Dialog
                open={isOpen.value}
                onClose={isOpen.setFalse}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Participants
                </DialogTitle>
                <DialogContent
                    className={styles.modalContent}
                >
                    <Button
                        onClick={() => publishEvent({
                            roomType: WSRoomTypes.Channel,
                            roomIdentifier: channelIdentifier,
                            eventName: 'participants-modal',
                            customData: {
                                data: {
                                    f: Date.now().toString(),
                                },
                            },
                        })}
                    >
                        Send Event
                    </Button>
                    {isParticipantsLoaded ? (
                        <ParticipantsList
                            participants={participants}
                        />
                    ) : (
                        <LoadingPage />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

Navigation.propTypes = {
    loadParticipants: PropTypes.func,
    participants: PropTypes.array,
    isParticipantsLoaded: PropTypes.bool,
    onSubscribeEvent: PropTypes.func,
    publishEvent: PropTypes.func,
    channelIdentifier: PropTypes.string,
};

Navigation.defaultProps = {
    loadParticipants: () => {},
    participants: [],
    isParticipantsLoaded: false,
    onSubscribeEvent: () => {},
    publishEvent: () => {},
    channelIdentifier: '',
};

export default React.memo(Navigation);
