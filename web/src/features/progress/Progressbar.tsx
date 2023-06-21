import React from 'react';
import { Box, Text, createStyles } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import ScaleFade from '../../transitions/ScaleFade';
import type { ProgressbarProps } from '../../typings';
import { motion } from 'framer-motion';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.dark[5],
    overflow: 'hidden'
  },
  wrapper: {
    width: '100%',
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    position: 'absolute',
  },
  bar: {
    height: '100%',
  },
  labelWrapper: {
    position: 'absolute',
    display: 'flex',
    width: 300,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    maxWidth: 300,
    padding: 8,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: 14,
    color: 'white',
    textShadow: '1px 1px 1px black',
    zIndex: 2,
  },
  motionBar: {
    height: '100%',
  },
}));

const Progressbar: React.FC = () => {
  const { classes } = useStyles();
  const [visible, setVisible] = React.useState(false);
  const [label, setLabel] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  const transition = {
    duration: duration/1000,
    ease: "linear"
  };

  const variants = {
    enter: {
      x: -300,
      backgroundColor: "rgb(255, 0, 0)"
    },
    animate: {
      x: [-300, 0],
      transition,
      backgroundColor: "rgb(0, 255, 0)",
    }
  };

  useNuiEvent('progressCancel', () => setVisible(false));

  useNuiEvent<ProgressbarProps>('progress', (data) => {
    setVisible(true);
    setLabel(data.label);
    setDuration(data.duration);
  });

  return (
    <>
      <Box className={classes.wrapper}>
        <ScaleFade visible={visible} onExitComplete={() => fetchNui('progressComplete')}>
          <Box className={classes.container}>
          <Box className={classes.labelWrapper}>
            <Text className={classes.label}>{label}</Text>
          </Box>
            <motion.div
            variants={variants}
            initial="enter"
            exit="enter"
            animate={"animate"}
            onAnimationComplete={() => setVisible(false)}
            className={classes.motionBar}>
            </motion.div>
          </Box>
        </ScaleFade>
      </Box>
    </>
  );
};

export default Progressbar;
