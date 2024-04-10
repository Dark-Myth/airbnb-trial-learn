"use client";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {DateRange} from 'react-date-range';
import { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

export function SelectCalender({
    reservation,
  }: {
    reservation:
      | {
          startDate: Date;
          endDate: Date;
        }[]
      | undefined;
  }) {

    //we need to disable the dates that are already reserved

    
    let disabledDates: Date[] = [];
    reservation?.forEach((reservationItem) => {
        const dateRange = eachDayOfInterval({
            start: new Date(reservationItem.startDate),
            end: new Date(reservationItem.endDate),
        });
        disabledDates = [...disabledDates,...dateRange];
    });
    //the above code is to get the dates that are already reserved iterating throught the reservation array

        //we need state to select the date
        const [state, setState] = useState([
            {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
        ]);
    return(
        <>
            <input type='hidden' name='startDate' value={state[0].startDate.toISOString()} />
            <input type='hidden' name='endDate' value={state[0].endDate.toISOString()} />
            
            <DateRange
                date={new Date()}
                showDateDisplay={false}
                rangeColors={["#FF5A5F"]}
                ranges={state}
                onChange={(item) => setState([item.selection] as any)}
                minDate={new Date()}
                direction="vertical"
                disabledDates={disabledDates}
                // those we select from the array that is already reserved
            />
        </>
    );
};
