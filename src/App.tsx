import { AppBar, Box, Button, Container, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { FutureValue, InitDataStore } from 'triggerchain';
import './App.css';
import { BasicPanel } from './basic/BasicPanel';
import { DerivedPanel } from './derived/DerivedPanel';
import { FutureValuePanel } from './FutureValuePanel';
import { Panel1 } from './Panel1';
import { SvgCanvas } from './SvgCanvas';

function App() {
  const [value, setValue] = useState("one");

  function handleChange(event: React.SyntheticEvent, value: string) {
    setValue(value);
  }

  return (
  <InitDataStore>
    <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Router" value="one"/>
          <Tab label="Simple State" value="two"/>
          <Tab label="Derived State" value="three"/>
          <Tab label="Async Derived" value="four"/>
          <Tab label="Reducer" value="five"/>
          <Tab label="Effects" value="six"/>
          <Tab label="Future Value" value="seven"/>
          <Tab label="Dynamic states" value="eight"/>
        </Tabs>
      </AppBar>
      <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: '90vh',
            overflow: 'auto',
          }}
        >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {value==="two" && <BasicPanel/>}
          {value==="three" && <DerivedPanel/>}
          {value==="seven" && <FutureValuePanel/>}
          {value==="eight" && <SvgCanvas/>}
        </Container>
      </Box>
    </InitDataStore>
  );
}

export default App
