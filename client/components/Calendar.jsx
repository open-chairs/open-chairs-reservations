import React from 'react';
import * as Styles from './styled.js';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currMonth: this.props.selected,
    }
    this.renderMonth = this.renderMonth.bind(this);
    this.lastMonth = this.lastMonth.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.renderDaysOfWeek = this.renderDaysOfWeek.bind(this);
    this.renderAllDays = this.renderAllDays.bind(this);
  }

  renderMonth(){
    // renders header section month & buttons
    return(
      <Styles.calHeader>
        {moment(this.state.currMonth).isSame(moment(), 'month') ? (
          <Styles.headerLeftPresent></Styles.headerLeftPresent>
        ) : (
          <Styles.headerLeft onClick={() => this.lastMonth()}></Styles.headerLeft>
        )}
        <Styles.monthFont>{moment(this.state.currMonth).format("MMMM YYYY")}</Styles.monthFont>
        <Styles.headerRight onClick={() => {this.nextMonth()}}></Styles.headerRight>
      </Styles.calHeader>
    )
  }

  renderDaysOfWeek(){
    return(
      <Styles.weekContainer>
        <Styles.weekDay>Sun</Styles.weekDay>
        <Styles.weekDay>Mon</Styles.weekDay>
        <Styles.weekDay>Tue</Styles.weekDay>
        <Styles.weekDay>Wed</Styles.weekDay>
        <Styles.weekDay>Thu</Styles.weekDay>
        <Styles.weekDay>Fri</Styles.weekDay>
        <Styles.weekDay>Sat</Styles.weekDay>
      </Styles.weekContainer>
    )
  }

  renderAllDays(){
    let currMonthStart = moment(this.state.currMonth).startOf('month')
    let currMonthEnd = moment(this.state.currMonth).endOf('month')
    let calStart = moment(currMonthStart).startOf('week')
    let calEnd = moment(currMonthEnd).endOf('week')

    // OpenTable has 6 rows of dates - account to ensure calEnd is on a 6th row
    // if there's less than 34 days or 5 weeks between the start and end date
    // then increment the end date forward a week
    if (calEnd.diff(calStart, 'days') <= 34){
      calEnd = moment(currMonthEnd).endOf('week').add(1, 'week')
    }

    let weeks = [];
    let days = [];
    // iterate from start to end date
    // push each array of 7 days into the weeks array
    // empty the days array after each iteration
    while(calStart < calEnd){
      for (let i = 0; i < 7; i++){
        // save each date for click event - otherwise the scope of reference defers to calStart
        // which will be the end of the calendar
        let dateForClick = moment(calStart);
          // each present & future day will need click and hover functionality
          // conditionals for css - check if date is in the past and in the same month
          if (moment(dateForClick).isSame(currMonthStart, 'month')){
            if(moment(dateForClick).isBefore(moment(), 'day')){
              days.push(
                <Styles.uniqDaySameMonthPast>
                  {calStart.format('D')}
                </Styles.uniqDaySameMonthPast>
              )
            } else {
              days.push(
                // TESTING FOR SAME DAY HIGHLIGHTING
                <Styles.uniqDaySameMonth selected={moment(dateForClick).isSame(this.props.selected, 'day') ? true : false} 
                  key={i} onClick={() => {this.props.dateRender(dateForClick)}}>
                    {calStart.format('D')}
                </Styles.uniqDaySameMonth>
              )
            }
          } else {
            if(moment(dateForClick).isBefore(moment(), 'day')){
              days.push(
                <Styles.uniqDayPast>
                  {calStart.format('D')}
                </Styles.uniqDayPast>
              )
            } else {
              days.push( 
              <Styles.uniqDay selected={moment(dateForClick).isSame(this.props.selected, 'day') ? true : false}
                key={i} onClick={() => {this.props.dateRender(dateForClick)}}>
                  {calStart.format('D')}
              </Styles.uniqDay>
              )
            }
          }
        calStart.add(1, 'day');
      }
      weeks.push(<Styles.weeks>{days}</Styles.weeks>);
      // empty for the next cycle
      days = [];
    }

    return(
      <Styles.cellHolder>{weeks}</Styles.cellHolder>
    )
  }

  lastMonth(){
    // TODO
    const newMonth = moment(this.state.currMonth).subtract(1, 'month').format("MMMM YYYY");
    this.setState({
      currMonth: newMonth
    })
  }

  nextMonth(){
    const newMonth = moment(this.state.currMonth).add(1, 'month').format("MMMM YYYY");
    this.setState({
      currMonth: newMonth
    })
  }

  render(){
    return(
      <Styles.calContainer>
        <div>{this.renderMonth()}</div>
        <div>{this.renderDaysOfWeek()}</div>
        <div>{this.renderAllDays()}</div>
      </Styles.calContainer>
    )
  }
}

export default Calendar;