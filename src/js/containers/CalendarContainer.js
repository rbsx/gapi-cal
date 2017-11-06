import React, { Component } from 'react'

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = ({ events: [] })
  }
  componentWillMount() {
    this.props.gapi.client.calendar.events.list({
      calendarId: 'fun5hhdfu5dscr4jfa5l98vuio@group.calendar.google.com',
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    }).then(response =>
      this.setState(
        { events: response.result.items },
        () => console.log(this.state.events)
      ))
  }
  render() {
    const eventsList = this.state.events.map((ev) => {
      const dateStart = new Date(ev.start.dateTime)
      const dateEnd = new Date(ev.end.dateTime)
      const pad = str => `00${str}`.slice(-2)

      const day = `${pad(dateStart.getDate())}.${pad(dateStart.getMonth())}`
      const timeStart = `${pad(dateStart.getHours())}:${pad(dateStart.getMinutes())}`
      const timeEnd = `${pad(dateEnd.getHours())}:${pad(dateEnd.getMinutes())}`
      return (
        <div
          key={ev.etag}
          style={{
            marginBottom: '-1px'
          }}
        >
          <span
            style={{
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              borderRight: '5px solid black',
              color: 'tomato',
              padding: '5px'
            }}
          >
            {day}
          </span>
          <span
            style={{
              display: 'inline-block',
              color: 'blue',
              padding: '5px',
              minWidth: '100px',
              textAlign: 'center'
            }}
          >
            {timeStart}—{timeEnd}
          </span>
          <span
            style={{
              borderLeft: '5px solid black',
              fontFamily: 'sans-serif',
              padding: '5px'
            }}
          >
            {ev.summary}
          </span>
        </div>
      )
    })
    return (
      <div
        style={{
          boxSizing: 'border-box',
          marginTop: '10px'
        }}
      >
        {eventsList}
      </div>
    )
  }
}

export default Calendar
